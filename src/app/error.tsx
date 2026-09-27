"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="empty">
      <h1>Не удалось открыть место</h1>
      <button onClick={reset}>Попробовать снова</button>
      <Link href="/">К карте</Link>
    </main>
  );
}
