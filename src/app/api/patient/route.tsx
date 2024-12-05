import { NextResponse } from "next/server";

// GET - Fetch all patients
export async function GET() {
  try {
    // Call your Go API to fetch patients
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/patient`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch patients");
    }

    const patients = await response.json();

    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

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

    // Use absolute URL for redirection
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // Default to localhost if not set
    return NextResponse.redirect(`${siteUrl}/`, { status: 303 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create patient" },
      { status: 500 }
    );
  }
}
