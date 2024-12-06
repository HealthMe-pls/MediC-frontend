import { NextResponse } from "next/server";

// GET - Fetch patient by ID
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const patientId = (await context.params).id;

    // Fetch patient by ID from external API (replace with actual API)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/patient/${patientId}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch patient with ID: ${(await context.params).id}`
      );
    }

    const patient = await response.json();

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Failed to fetch patient with ID: ${
          (await context.params).id
        }`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const patientId = (await context.params).id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/patient/${patientId}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete patient with ID: ${patientId}`);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Failed to delete patient with ID: ${
          (await context.params).id
        }`,
      },
      { status: 500 }
    );
  }
}
