import type { Photo } from "@/data/listen-watch";

function toTitle(name: string) {
  if (!name) return "Photo";
  return name.replace(/\.[^.]+$/, "");
}

export async function getDrivePhotos(apiUrl: string): Promise<Photo[]> {
  const res = await fetch(apiUrl, {
    cache: "no-store",
    next: { revalidate: 0 },
  });
  if (!res.ok) return [];
  const items = await res.json();
  const photos: Photo[] = items.map((m: any) => ({
    id: `drive-${m.id}`,
    title: toTitle(m.name || ""),
    description: "",
    imagePath: m.url,
    date: m.createdTime || new Date().toISOString(),
    featured: false,
  }));
  return photos;
}
