import { NextRequest, NextResponse } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

// GET All TempShops
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/tempshops`
    );
    if (!response.ok) throw new Error("Failed to fetch temp shops");

    const data = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(data, { status: 200, headers });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch temp shops", error },
      { status: 500 }
    );
  }
}

// Create TempShop
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/tempshops`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) throw new Error("Failed to create temp shop");

    const data = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(data, { status: 201, headers });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create temp shop", error },
      { status: 500 }
    );
  }
}
