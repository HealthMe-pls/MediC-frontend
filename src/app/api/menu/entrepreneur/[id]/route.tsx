import { NextResponse } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const menuId = (await context.params).id;
    const menuData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/updatemenu/${menuId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update temp menu in API route");
    }

    const updatedMenu = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(updatedMenu, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update temp menu in API route" },
      { status: 500 }
    );
  }
}
