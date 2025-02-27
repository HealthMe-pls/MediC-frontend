import { setCorsHeaders } from "@/utility/corsUtils";
import { NextRequest, NextResponse } from "next/server";

// DELETE - Remove entrepreneur by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await context.params).id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/contacts/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete notification with ID ${id}`);
    }

    const headers = new Headers();
    setCorsHeaders(headers);

    return NextResponse.json(
      { message: `notification with ID ${id} deleted successfully` },
      { status: 200, headers }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete notification" },
      { status: 500 }
    );
  }
}
