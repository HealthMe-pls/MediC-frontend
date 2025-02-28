
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Login request body:", body); // Log the incoming data

    // Send the login request to Go backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/login`, // Your Go backend URL
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    // Handle the response from Go backend
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response from Go:", errorText);
      throw new Error("Login failed");
    }

    // Parse the successful response
    const data = await response.json();

    // Forward the response to the frontend
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("POST Request Error:", error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
