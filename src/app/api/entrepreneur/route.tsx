import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";
// import { NextApiRequest, NextApiResponse } from "next";
// GET - Fetch all map
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/entrepreneur`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch entrepreneur in api route");
    }

    const entrepreneur = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    // console.log("maps: ", maps);
    return NextResponse.json(entrepreneur, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch entrepreneur" },
      { status: 500 }
    );
  }
}
