import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

// // GET - Fetch all workshops
export async function GET() {
  console.log("Fetching workshops from backend...");
  console.log(
    "Backend URL:",
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/workshops`
  );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/workshops`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch workshops (in route) ");
    }

    const workshops = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(workshops, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch workshops (in route) 2" },
      { status: 500 }
    );
  }
}

