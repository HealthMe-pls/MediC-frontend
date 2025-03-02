import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const socialData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/socials/admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(socialData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create social (in route)");
    }

    const newSocial = await response.json();
    console.log(newSocial);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(newSocial, { status: 201, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create social (in route)" },
      { status: 500 }
    );
  }
}
