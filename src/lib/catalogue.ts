import data from "../data/places.json";

export interface Place {
  id: string;
  name: string;
  x: number;
  y: number;
  images: string[];
  audio: string | null;
}

export const places: Place[] = data;
export function getPlace(id: string): Place | undefined {
  return places.find((place) => place.id === id);
}
