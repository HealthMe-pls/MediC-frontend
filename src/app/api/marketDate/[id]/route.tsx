import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_GO_API_URL}/marketDate/`;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await axios.get(`${BASE_URL}${params.id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Market open date not found" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const response = await axios.put(`${BASE_URL}${params.id}`, body);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update market open date" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await axios.delete(`${BASE_URL}${params.id}`);
    return NextResponse.json({ message: "Market open date deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete market open date" }, { status: 500 });
  }
}
