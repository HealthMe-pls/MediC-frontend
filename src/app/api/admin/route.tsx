import { NextResponse } from "next/server";

// GET - Fetch all admins
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch admins");
    }

    const admins = await response.json();

    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

// POST - Create new admin
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create admin");
    }

    const newAdmin = await response.json();

    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create admin" },
      { status: 500 }
    );
  }
}
