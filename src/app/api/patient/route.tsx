import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let body: { Name: string; Email: string; Age: number };

    if (contentType.includes("application/json")) {
      // Handle JSON payloads
      body = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      // Handle form-encoded payloads
      const formData = await request.formData();
      body = {
        Name: formData.get("Name") as string,
        Email: formData.get("Email") as string,
        Age: Number(formData.get("Age")),
      };
    } else {
      return NextResponse.json(
        { message: "Unsupported Content-Type" },
        { status: 415 }
      );
    }

    const { Name, Email, Age } = body;

    if (!Name || !Email || typeof Age !== "number") {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Send data to your backend (Go API)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/patient`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name, Email, Age }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create patient");
    }

    return NextResponse.json(
      { message: "Patient created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create patient" },
      { status: 500 }
    );
  }
}
