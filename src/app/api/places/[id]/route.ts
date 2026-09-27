import { getPlace } from "../../../../lib/catalogue";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const place = getPlace((await params).id);
  if (!place) return Response.json({ error: "Место не найдено" }, { status: 404 });
  return Response.json(place, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" },
  });
}
