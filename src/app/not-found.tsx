import Link from "next/link";
export default function NotFound() {
  return (
    <main className="empty">
      <h1>Место не найдено</h1>
      <Link href="/">Вернуться к карте</Link>
    </main>
  );
}
