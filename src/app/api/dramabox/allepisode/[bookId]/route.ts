import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const UPSTREAM_API = process.env.UPSTREAM_API || "https://api.megawe.net";
const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || "in";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await params;
  const headersList = await headers();
  const accept = headersList.get("accept") || "";
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get("lang") || DEFAULT_LANGUAGE;

  // If browser navigation -> redirect to detail/watch page
  if (accept.includes("text/html")) {
    return NextResponse.redirect(new URL(`/detail/${bookId}`, request.url));
  }

  // If API fetch -> proxy to upstream
  try {
    const response = await fetch(`${UPSTREAM_API}/api/dramabox/allepisode?bookId=${bookId}&lang=${lang}`, {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
