import { NextResponse } from "next/server";

// GET - Fetch all shop
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shopdetail`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch shops");
    }

    const maps = await response.json();

    return NextResponse.json(maps, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch shops" },
      { status: 500 }
    );
  }
}
