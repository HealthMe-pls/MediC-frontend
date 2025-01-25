import { NextResponse, NextRequest } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: shopId } = params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shopdetail/${shopId}`
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

// DELETE - Delete shop by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: shopId } = params;

    // Set CORS headers
    const headers = new Headers();
    setCorsHeaders(headers);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/${shopId}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete shop with ID: ${shopId}`);
    }

    return NextResponse.json(
      { message: `Shop with ID: ${shopId} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Failed to delete shop with ID: ${params.id}`,
      },
      { status: 500 }
    );
  }
}
