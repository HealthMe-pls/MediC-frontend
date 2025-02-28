import { NextResponse } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const workshopId = (await context.params).id;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/workshops/${workshopId}`
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

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const workshopId = (await context.params).id;
    const workshopData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/workshops/${workshopId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workshopData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update workshop in API route");
    }

    const updatedWorkshop = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(updatedWorkshop, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update workshop in API route" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const workshopId = (await context.params).id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/workshops/${workshopId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete workshop in API route");
    }

    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(
      { message: "Workshop deleted successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete workshop in API route" },
      { status: 500 }
    );
  }
}
