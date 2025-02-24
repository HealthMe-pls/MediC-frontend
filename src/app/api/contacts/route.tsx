import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const headers = new Headers();
    setCorsHeaders(headers);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/contacts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch notification");
    }
    const noti = await response.json();
    return NextResponse.json(noti, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch notification" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create mail");
    }

    const newMail = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);

    return NextResponse.json(newMail, { status: 201, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create mail" },
      { status: 500 }
    );
  }
}
