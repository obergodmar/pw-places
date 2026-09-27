import Link from "next/link";
import Image from "next/image";

export function GamePanel() {
  return (
    <nav className="game-panel" aria-label="Панель предметов">
      {Array.from({ length: 9 }, (_, i) => (
        <div className="game-cell" key={i}>
          {i === 8 && (
            <Link href="/" aria-label="Вернуться к карте" title="Руна переноса">
              <Image
                src="/assets/elements/items/runaPerenosa.webp"
                alt="Руна переноса"
                width={32}
                height={32}
                unoptimized
              />
            </Link>
          )}
          <span>{i + 1}</span>
        </div>
      ))}
    </nav>
  );
}
