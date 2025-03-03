import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { setCorsHeaders } from "@/utility/corsUtils";

// const BASE_URL = "http://127.0.0.1:8080/marketDate/";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await context.params).id;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/marketDate/${id}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(error, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await context.params).id;

    const body = await req.json();
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/marketDate/${id}`,
      body
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update market open date", details: error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await context.params).id;

    await axios.delete(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/marketDate/${id}`
    );
    return NextResponse.json({ message: "Market open date deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete market open date", details: error },
      { status: 500 }
    );
  }
}
