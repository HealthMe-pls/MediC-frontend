import { NextResponse, NextRequest } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const entId = (await context.params).id;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/entrepreneur/shopdetail/${entId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch shop in api route");
    }

    const shop = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(shop, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch shop" },
      { status: 500 }
    );
  }
}
