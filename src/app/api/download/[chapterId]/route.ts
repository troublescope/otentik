import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const sanitizeFilename = (filename: string): string => {
  return filename.replace(/[<>:"/\|?*\x00-\x1f]/g, "_").trim();
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const { chapterId } = await params;
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const title = searchParams.get("title") || `episode-${chapterId}`;

  if (!url) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch from CDN: ${response.statusText}`);
    }

    const sanitizedTitle = sanitizeFilename(title);
    const contentType = response.headers.get("Content-Type") || "video/mp4";

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `attachment; filename="${sanitizedTitle}.mp4"`
    );

    // Stream the body directly
    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download error:", error);
    return new NextResponse("Download failed", { status: 500 });
  }
}
