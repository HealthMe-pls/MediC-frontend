import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");

    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/shopid?shopidkeyword=${encodeURIComponent(
        keyword
      )}`
    );

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch data from backend");
    }

    const data = await apiResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching shop data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
