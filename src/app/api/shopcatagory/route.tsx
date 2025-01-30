import { NextResponse } from "next/server"; 

// GET - Fetch all shop catogory
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shopcategory`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch shop");
    }

    const shopcategory = await response.json();

    return NextResponse.json(shopcategory, { status: 200 });
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
    const body = await req.json();
    console.log(body);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shopcategory`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create admin frontend1");
    }

    const newAdmin = await response.json();

    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create admin frontend2" },
      { status: 500 }
    );
  }
}