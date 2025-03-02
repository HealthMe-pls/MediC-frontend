import { NextResponse, NextRequest } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

// DELETE - Delete menu by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const menuId = (await context.params).id;

    // Set CORS headers
    const headers = new Headers();
    setCorsHeaders(headers);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/shopmenu/${menuId}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete menu with ID: ${menuId}`);
    }

    return NextResponse.json(
      { message: `Menu with ID: ${menuId} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Failed to delete menu with ID: ${(await context.params).id}`,
      },
      { status: 500 }
    );
  }
}

// PUT - Update menu by ID
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const menuId = (await context.params).id;
    const menuData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/shopmenu/${menuId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update menu in API route");
    }

    const updatedMenu = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(updatedMenu, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update menu in API route" },
      { status: 500 }
    );
  }
}
