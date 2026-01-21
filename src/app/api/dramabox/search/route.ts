import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = process.env.UPSTREAM_API || "https://api.megawe.net";
const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || "in";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const lang = searchParams.get("lang") || DEFAULT_LANGUAGE;

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const response = await fetch(
      `${UPSTREAM_API}/api/dramabox/search?query=${encodeURIComponent(query)}&lang=${lang}`,
      { next: { revalidate: 240 } } // Cache for 4 minutes (search results)
    );

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
