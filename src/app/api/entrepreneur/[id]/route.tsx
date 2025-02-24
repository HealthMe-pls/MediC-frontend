import { setCorsHeaders } from "@/utility/corsUtils";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch entrepreneur by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/entrepreneur/${id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch entrepreneur with ID ${id}`);
    }

    const entrepreneur = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);

    return NextResponse.json(entrepreneur, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch entrepreneur" },
      { status: 500 }
    );
  }
}

// PUT - Update entrepreneur by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/entrepreneur/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update entrepreneur with ID ${id}`);
    }

    const updatedEntrepreneur = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);

    return NextResponse.json(updatedEntrepreneur, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update entrepreneur" },
      { status: 500 }
    );
  }
}

// DELETE - Remove entrepreneur by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/entrepreneur/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete entrepreneur with ID ${id}`);
    }

    const headers = new Headers();
    setCorsHeaders(headers);

    return NextResponse.json(
      { message: `Entrepreneur with ID ${id} deleted successfully` },
      { status: 200, headers }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete entrepreneur" },
      { status: 500 }
    );
  }
}
