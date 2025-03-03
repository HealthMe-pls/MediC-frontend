import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { setCorsHeaders } from "@/utility/corsUtils";

// const BASE_URL = "http://127.0.0.1:8080/marketDate/";

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/marketDate`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Failed to fetch market open dates:", error);
    return NextResponse.json(
      { error: "Failed to fetch market open dates" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/marketDate`,
      body
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Failed to create market open date:", error);
    return NextResponse.json(
      { error: "Failed to create market open date" },
      { status: 500 }
    );
  }
}
