import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    // Extract token from headers
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    // console.log("Logout request with token:", token);

    // Send logout request to Go backend
    const goApiUrl = process.env.NEXT_PUBLIC_GO_API_URL;
    if (!goApiUrl) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const goLogoutUrl = `${goApiUrl}/logout`;
    const response = await axios.post(
      goLogoutUrl,
      {}, // No body needed
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
