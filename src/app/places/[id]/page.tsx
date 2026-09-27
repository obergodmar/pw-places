import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlace, places } from "../../../lib/catalogue";
import { Panorama } from "../../../components/panorama";
import { GamePanel } from "../../../components/game-panel";

export function generateStaticParams() {
  return places.map(({ id }) => ({ id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const place = getPlace((await params).id);
  return { title: place?.name ?? "Место не найдено" };
}
export default async function PlacePage({ params }: { params: Promise<{ id: string }> }) {
  const place = getPlace((await params).id);
  if (!place) notFound();
  return (
    <main className="place-screen" aria-label={place.name}>
      {place.images.length ? (
        <Panorama place={place} />
      ) : (
        <>
          <div className="empty" role="alert">
            Панорама недоступна.
          </div>
          <GamePanel />
        </>
      )}
    </main>
  );
}
