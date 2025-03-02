import { NextResponse, NextRequest } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

// DELETE - Delete social by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const socialId = (await context.params).id;

    // Set CORS headers
    const headers = new Headers();
    setCorsHeaders(headers);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/social/${socialId}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete social with ID: ${socialId}`);
    }

    return NextResponse.json(
      { message: `Social with ID: ${socialId} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Failed to delete social with ID: ${
          (await context.params).id
        }`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const socialId = (await context.params).id;
    const socialData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/social/${socialId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(socialData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update social in API route");
    }

    const updatedSocial = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(updatedSocial, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update social in API route" },
      { status: 500 }
    );
  }
}
