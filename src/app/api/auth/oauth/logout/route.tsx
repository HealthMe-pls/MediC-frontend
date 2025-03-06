// pages/api/auth/oauth/logout.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    // ส่งคำขอ logout ไปยัง backend
    await axios.post(`${process.env.BACKEND_URL}/logout`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ส่งผลลัพธ์กลับไปยัง frontend
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}
