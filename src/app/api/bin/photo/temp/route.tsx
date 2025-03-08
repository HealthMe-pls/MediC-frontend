import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const photoData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/photobin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photoData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to post photo to bin (in route)");
    }

    const newphoto = await response.json();
    // console.log(newphoto);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(newphoto, { status: 201, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to post photo to bin (in route)" },
      { status: 500 }
    );
  }
}
