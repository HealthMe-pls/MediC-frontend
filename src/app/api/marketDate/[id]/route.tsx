import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { setCorsHeaders } from "@/utility/corsUtils";

const BASE_URL = "http://127.0.0.1:8080/marketDate/";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await axios.get(`${BASE_URL}${params.id}`);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(response.data, { status: 200, headers });
  } catch (error) {
    console.error(error);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(
      { message: "Market open date not found" },
      { status: 404, headers }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const response = await axios.put(`${BASE_URL}${params.id}`, body, {
      headers: { "Content-Type": "application/json" },
    });
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(response.data, { status: 200, headers });
  } catch (error) {
    console.error(error);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(
      { message: "Failed to update market open date" },
      { status: 500, headers }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await axios.delete(`${BASE_URL}${params.id}`);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(
      { message: "Market open date deleted successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error(error);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(
      { message: "Failed to delete market open date" },
      { status: 500, headers }
    );
  }
}
