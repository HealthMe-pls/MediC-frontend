import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { setCorsHeaders } from "@/utility/corsUtils";

const BASE_URL = "http://127.0.0.1:8080/marketDate/";

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(BASE_URL);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(response.data, { status: 200, headers });
  } catch (error) {
    console.error("Failed to fetch market open dates:", error);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(
      { message: "Failed to fetch market open dates" },
      { status: 500, headers }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(BASE_URL, body, {
      headers: { "Content-Type": "application/json" },
    });
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(response.data, { status: 201, headers });
  } catch (error) {
    console.error("Failed to create market open date:", error);
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(
      { message: "Failed to create market open date" },
      { status: 500, headers }
    );
  }
}
