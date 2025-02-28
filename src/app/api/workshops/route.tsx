import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

// // GET - Fetch all workshops
export async function GET() {
  // console.log("Fetching workshops from backend...");
  // console.log(
  //   "Backend URL:",
  //   `${process.env.NEXT_PUBLIC_GO_API_URL}/workshops`
  // );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/workshops`
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

export async function POST(req: Request) {
  try {
    const workshopData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/workshops`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workshopData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create workshop (in route)");
    }

    const newWorkshop = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(newWorkshop, { status: 201, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create workshop (in route)" },
      { status: 500 }
    );
  }
}
