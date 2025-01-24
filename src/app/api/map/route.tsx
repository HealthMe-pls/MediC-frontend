import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";
// import { NextApiRequest, NextApiResponse } from "next";
// GET - Fetch all map
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/mapdetail`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch maps in api route");
    }

    const maps = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(maps, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch maps" },
      { status: 500 }
    );
  }
}

