// pages/api/auth/oauth/callback.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { code } = await req.json(); // รับ code จาก frontend

  try {
    // ส่ง code ไปที่ backend เพื่อแลกเปลี่ยนเป็น token
    const response = await axios.post(
      `${process.env.BACKEND_URL}/callback`, // ส่งไปที่ endpoint /callback ของ backend
      { code },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("POST Request Error:", error);

    return NextResponse.json(
      { message: "Failed to exchange code for token" },
      { status: 500 }
    );
  }
}
