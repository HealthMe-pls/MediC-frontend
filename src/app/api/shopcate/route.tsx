import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

// GET - Fetch all map
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shopcategory`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch shop in api route");
    }

    const shopcategory = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(shopcategory, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch shopcate" },
      { status: 500 }
    );
  }
}
