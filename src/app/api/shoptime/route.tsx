import { setCorsHeaders } from "@/utility/corsUtils";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all shop open dates
export async function GET() {
  try {
    const headers = new Headers();
    setCorsHeaders(headers);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/shoptime`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch shop open dates - ${response.status} ${response.statusText}`);
    }

    const shops = await response.json();

    return NextResponse.json(shops, { status: 200 });
  } catch (error) {
    console.error("GET /shoptime error:", error);
    return NextResponse.json(
      { message: "Failed to fetch shop open dates" },
      { status: 500 }
    );
  }
}

// POST - Create a new shop open date
export async function POST(req: NextRequest) {
  try {
    const headers = new Headers();
    setCorsHeaders(headers);

    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/shoptime`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create shop open date - ${response.status} ${response.statusText}`);
    }

    const createdData = await response.json();
    return NextResponse.json(createdData, { status: 201 });
  } catch (error) {
    console.error("POST /shoptime error:", error);
    return NextResponse.json(
      { message: "Failed to create shop open date" },
      { status: 500 }
    );
  }
}
