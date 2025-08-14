import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.max(
    1,
    Math.min(50, Number(searchParams.get("limit") || 18)),
  );

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n",
  );
  if (!folderId || !clientEmail || !privateKey) {
    return NextResponse.json({ error: "Missing env" }, { status: 500 });
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  const drive = google.drive({ version: "v3", auth });

  const r = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id,name,createdTime,imageMediaMetadata(width,height))",
    orderBy: "createdTime desc",
    pageSize: limit,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const files = r.data.files || [];
  const items = files.map((f) => ({
    id: `drive-${f.id}`,
    title: (f.name || "").replace(/\.[^.]+$/, "") || "Photo",
    description: "",
    imagePath: `/api/drive/image/${f.id}`,
    date: f.createdTime || new Date().toISOString(),
    featured: false,
  }));

  return NextResponse.json(items, { headers: { "cache-control": "no-store" } });
}
