import { setCorsHeaders } from "@/utility/corsUtils";
import { NextRequest, NextResponse } from "next/server";

// PUT - Update a shop open date by ID
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const headers = new Headers();
    setCorsHeaders(headers);

    const id = (await context.params).id;
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
      throw new Error(
        `Failed to update shop open date - ${response.status} ${response.statusText}`
      );
    }

    const updatedData = await response.json();
    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.error(`PUT /shoptime/${(await context.params).id} error:`, error);
    return NextResponse.json(
      { message: "Failed to update shop open date" },
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
      throw new Error(
        `Failed to delete shop open date - ${response.status} ${response.statusText}`
      );
    }

    return NextResponse.json(
      { message: "Shop open date deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `DELETE /shoptime/${(await context.params).id} error:`,
      error
    );
    return NextResponse.json(
      { message: "Failed to delete shop open date" },
      { status: 500 }
    );
  }
}
