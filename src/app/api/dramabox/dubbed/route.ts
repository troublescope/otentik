import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = process.env.UPSTREAM_API || "https://api.megawe.net";
const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || "in";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // Map Indonesian classify values to English
  const classifyParam = searchParams.get("classify") || "terbaru";
  const classifyMap: Record<string, string> = {
    "terbaru": "latest",
    "terpopuler": "popular",
    "latest": "latest",
    "popular": "popular"
  };
  const classify = classifyMap[classifyParam] || "latest";
  const page = searchParams.get("page") || "1";
  const lang = searchParams.get("lang") || DEFAULT_LANGUAGE;

  try {
    const response = await fetch(
      `${UPSTREAM_API}/api/dramabox/dubbed?classify=${classify}&page=${page}&lang=${lang}`,
      { next: { revalidate: 600 } } // Cache for 10 minutes
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
