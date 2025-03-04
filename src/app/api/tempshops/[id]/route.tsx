import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";
import axios from "axios";

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id: temp_id } = context.params;

  const headers = new Headers();
  setCorsHeaders(headers);

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/notApprove/${temp_id}`,
      {},
      {
        headers: Object.fromEntries(headers.entries()),
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to non-approve tempshop");
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id: temp_id } = context.params;

  const headers = new Headers();
  setCorsHeaders(headers);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/approve/${temp_id}`,
      {
        headers: Object.fromEntries(headers.entries()),
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to approve tempshop");
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
