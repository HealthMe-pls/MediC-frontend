import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

// GET - Fetch all shop
export async function GET() {
  try {
    const headers = new Headers();
    setCorsHeaders(headers);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/shopdetail`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch shop");
    }

    const shops = await response.json();

    return NextResponse.json(shops, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch shop" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const shopData = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_GO_API_URL}/shop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopData),
    });

    if (!response.ok) {
      throw new Error("Failed to create shop (in route)");
    }

    const newWorkshop = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(newWorkshop, { status: 201, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create shop (in route)" },
      { status: 500 }
    );
  }
}
