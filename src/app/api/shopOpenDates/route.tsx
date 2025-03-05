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
      throw new Error("Failed to fetch shop open dates in utility");
    }

    const shops = await response.json();

    return NextResponse.json(shops, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch shop open dates in utility" },
      { status: 500 }
    );
  }
}

// PUT - Update a shop open date by ID
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const headers = new Headers();
    setCorsHeaders(headers);
    const id = await (await context.params).id;
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/shoptime/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update shop open date in utility");
    }

    const updatedData = await response.json();
    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update shop open date in utility" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a shop open date by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const headers = new Headers();
    setCorsHeaders(headers);
    const id = (await context.params).id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/shoptime/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete shop open date in utility");
    }

    return NextResponse.json(
      { message: "Shop open date deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete shop open date in utility" },
      { status: 500 }
    );
  }
}
