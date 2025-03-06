import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Define the response type
interface OAuthLoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json(); // รับ email และ password จาก frontend

  try {
    // ส่ง email และ password ไปที่ Infomaniak OAuth เพื่อขอ authorization code
    const response = await axios.post<OAuthLoginResponse>(`${process.env.BACKEND_URL}/login`, {
      email,
      password,
    });

    // ส่งผลลัพธ์กลับไปยัง frontend
    if (response.data.success && response.data.token) {
      return NextResponse.json({
        success: true,
        token: response.data.token,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error during login redirect:", error);
    return NextResponse.json(
      { success: false, error: "Failed to login" },
      { status: 500 }
    );
  }
}
