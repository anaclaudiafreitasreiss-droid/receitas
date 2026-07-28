"use client";

"use client";

import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import RecipeCard from "@/components/RecipeCard";
import RecipeFormModal from "@/components/RecipeFormModal";
import type { Recipe } from "@/lib/data";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ReceitasPage() {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );

  useEffect(() => {
    fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setSelectedRecipe(undefined);
    setIsRecipeModalOpen(true);
  };

  const handleOpenEditModal = (recipe: Recipe) => {
    setModalMode("edit");
    setSelectedRecipe(recipe);
    setIsRecipeModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsRecipeModalOpen(false);
  };

  const handleSaveRecipe = async (recipeData: Omit<Recipe, "id"> | Recipe) => {
  if (modalMode === "create") {
    const response = await fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    const newRecipe = await response.json();

    setRecipes((prev) => [...prev, newRecipe]);
  } else {
    const updatedRecipe = recipeData as Recipe;

    const response = await fetch(
      `http://localhost:3001/recipes/${updatedRecipe.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      }
    );

    const recipeUpdated = await response.json();

    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeUpdated.id ? recipeUpdated : recipe
      )
    );
  }

  handleCloseModal();
};


  const handleOpenDeleteConfirmationModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleDeleteRecipe = async () => {
  if (!selectedRecipe) return;

  await fetch(`http://localhost:3001/recipes/${selectedRecipe.id}`, {
    method: "DELETE",
  });

  setRecipes((prev) =>
    prev.filter((recipe) => recipe.id !== selectedRecipe.id)
  );

  setIsDeleteConfirmationModalOpen(false);
  setSelectedRecipe(undefined);
};

const filteredRecipes = recipes.filter((recipe) =>
  recipe.title.toLowerCase().includes(search.toLowerCase())
);

  return (
    <main className="grow py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="mt-6">
            <input
               type="text"
               placeholder="Pesquisar receitas..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <h1 className="text-3xl font-bold">Todas as receitas</h1>

          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-black hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            Nova receita
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={() => handleOpenEditModal(recipe)}
              onDelete={() => handleOpenDeleteConfirmationModal(recipe)}
            />
          ))}
        </div>
      </div>

      <RecipeFormModal
        isOpen={isRecipeModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRecipe}
        mode={modalMode}
        recipe={selectedRecipe}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        onClose={() => setIsDeleteConfirmationModalOpen(false)}
        onConfirm={handleDeleteRecipe}
        recipe={selectedRecipe}
      />
    </main>
  );
}