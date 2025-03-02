import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const menuData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/menus/admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create menu (in route)");
    }

    const newMenu = await response.json();
    console.log(newMenu);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(newMenu, { status: 201, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create menu (in route)" },
      { status: 500 }
    );
  }
}
