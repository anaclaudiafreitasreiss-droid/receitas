import { Recipe } from "@/lib/data";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RecipeCardProps {
  recipe: Recipe;
  onEdit?: () => void;
  onDelete?: () => void
}

export default function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onEdit?.();
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDelete?.()
  }

  return (
    <Link href={`/receitas/${recipe.id}`}>
      <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Imagem */}
        <div className="relative h-48 w-full">
          <Image src={recipe.image} fill alt={recipe.title} className="object-cover"/>
        </div>

        <div className="flex flex-col p-4 gap-6">
          {/* Titulo e descrição */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold hover:text-orange-500 transition-colors">{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>

          {/* Categoria e ações */}
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {recipe.category}
            </span>

            <div className="flex gap-2">
              {/* botão de editar */}
              <button type="button" onClick={(e) => handleEdit(e)} className="p-2 border border-gray-200 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                <Edit size={16}/>
              </button>

              {/* botão de remover */}
              <button type="button" onClick={(e) => handleDelete(e)} className="p-2 border border-gray-200 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                <Trash2 size={16}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}