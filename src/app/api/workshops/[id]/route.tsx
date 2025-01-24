import { NextResponse } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: workshopId } = params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/workshops/${workshopId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch workshop in api route");
    }

    const workshop = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(workshop, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch workshop id in api route" },
      { status: 500 }
    );
  }
}
