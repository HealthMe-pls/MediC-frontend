import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

// GET - Fetch all map
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.GO_API_URL}/shopdetail`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch shop in api route");
    }

    const shops = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(shops, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch shop" },
      { status: 500 }
    );
  }
}
