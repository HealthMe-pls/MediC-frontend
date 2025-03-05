import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const socialData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/socialbin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(socialData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to post social to bin (in route)");
    }

    const newsocial = await response.json();
    console.log(newsocial);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(newsocial, { status: 201, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to post social to bin (in route)" },
      { status: 500 }
    );
  }
}
