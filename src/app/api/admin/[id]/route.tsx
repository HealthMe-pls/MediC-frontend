import { NextResponse } from "next/server";

// GET - Fetch admin by ID or username
export async function GET(
  req: Request,
  context: { params: { id: string } } // Dynamic parameter from the route
) {
  try {
    const { id } = context.params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/${id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch admin with ID or username: ${id}`);
    }

    const admin = await response.json();

    return NextResponse.json(admin, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Failed to fetch admin with ID or username: ${context.params.id}`,
      },
      { status: 500 }
    );
  }
}

// PUT - Update admin by ID or username
export async function PUT(
  req: Request,
  context: { params: { id: string } } // Dynamic parameter from the route
) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update admin with ID or username: ${id}`);
    }

    const updatedAdmin = await response.json();

    return NextResponse.json(updatedAdmin, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Failed to update admin with ID or username: ${context.params.id}`,
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete admin by ID or username
export async function DELETE(
  req: Request,
  context: { params: { id: string } } // Dynamic parameter from the route
) {
  try {
    const { id } = context.params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/${id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete admin with ID or username: ${id}`);
    }

    return NextResponse.json(
      { message: "Admin deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Failed to delete admin with ID or username: ${context.params.id}`,
      },
      { status: 500 }
    );
  }
}
