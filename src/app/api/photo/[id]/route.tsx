import { NextResponse, NextRequest } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

// DELETE - Delete photo by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const photoId = (await context.params).id;

    // Set CORS headers
    const headers = new Headers();
    setCorsHeaders(headers);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/uploadphotos/${photoId}`, // เปลี่ยน endpoint ให้รองรับการลบรูปภาพ
      {
        method: "DELETE",
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete photo with ID: ${photoId}`);
    }

    return NextResponse.json(
      { message: `Photo with ID: ${photoId} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Failed to delete photo with ID: ${(await context.params).id}`,
      },
      { status: 500 }
    );
  }
}
