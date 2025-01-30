import { NextResponse } from "next/server";

// GET - Fetch all shop
export async function GET() {
  try {
    const response = await fetch(`${process.env.GO_API_URL}/shop`);

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
