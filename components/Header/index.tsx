import Link from "next/link";

export default function Header() {
  return (
    <header style={{ background: "white", padding: "20px", borderBottom: "1px solid #ccc" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/" style={{ color: "black", fontWeight: "bold", fontSize: "24px" }}>
          Receitas deliciosas
        </Link>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/" style={{ color: "black" }}>
            Início
          </Link>

          <Link href="/receitas" style={{ color: "black" }}>
            Receitas
          </Link>
        </div>
      </div>
    </header>
  );
}