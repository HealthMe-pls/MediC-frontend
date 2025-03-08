import axios from "axios";
import { NextResponse } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

export async function POST(req: Request) {
  try {
    const headers = new Headers();
    setCorsHeaders(headers);
    const body = await req.json();
    // console.log("Login request body:", body); // Log the incoming data

    // Send the login request to Go backend using axios
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/login`, // Your Go backend URL
      body, // Pass the request body directly
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response from Go backend
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("POST Request Error:", error);

    // You can handle specific error codes or just return a general error message
    return NextResponse.json(
      { message: "Login failed"},
      { status: 500 }
    );
  }
}
