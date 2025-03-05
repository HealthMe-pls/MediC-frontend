import { NextRequest, NextResponse } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/tempshops/${id}`
    );
    if (!response.ok) throw new Error("Failed to fetch temp shop");

    const data = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(data, { status: 200, headers });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch temp shop" },
      { status: 500 }
    );
  }
}

// PUT - Update TempShop
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/shop/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) throw new Error("Failed to update temp shop");

    const data = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(data, { status: 200, headers });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update temp shop" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/tempshops/${id}`,
      { method: "DELETE" }
    );

    if (!response.ok) throw new Error("Failed to delete temp shop");

    return NextResponse.json({ message: "Temp shop deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete temp shop" },
      { status: 500 }
    );
  }
}
