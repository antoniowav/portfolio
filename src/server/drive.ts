import { google } from "googleapis";
import type { Photo } from "@/data/listen-watch";

export async function listDrivePhotos(limit = 12): Promise<Photo[]> {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n",
  );
  if (!folderId || !clientEmail || !privateKey) return [];

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  const drive = google.drive({ version: "v3", auth });

  const r = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id,name,createdTime)",
    orderBy: "createdTime desc",
    pageSize: limit,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const files = r.data.files || [];
  return files.map((f) => ({
    id: `drive-${f.id}`,
    title: (f.name || "").replace(/\.[^.]+$/, "") || "Photo",
    description: "",
    imagePath: `https://drive.google.com/uc?export=view&id=${f.id}`,
    date: f.createdTime || new Date().toISOString(),
    featured: false,
  }));
}
