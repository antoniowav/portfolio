import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n",
  );
  if (!params.id || !clientEmail || !privateKey) {
    return NextResponse.json({ error: "Missing params/env" }, { status: 400 });
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  const drive = google.drive({ version: "v3", auth });

  const r = await drive.files.get(
    { fileId: params.id, alt: "media" },
    { responseType: "arraybuffer" },
  );
  const contentType = (r.headers["content-type"] as string) || "image/jpeg";

  return new NextResponse(r.data as ArrayBuffer, {
    status: 200,
    headers: {
      "content-type": contentType,
      "cache-control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
