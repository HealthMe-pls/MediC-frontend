import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // Correct structure for the second argument
) {
  try {
    const patientId = (await context.params).id; // Access the dynamic parameter from context

    // Forward the request to the backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/patient/${patientId}/images`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch images for patient ID: ${patientId}`);
    }

    const images = await response.json(); // Array of image objects
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch patient images" },
      { status: 500 }
    );
  }
}
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const patientId = (await context.params).id;

    // Get the uploaded file
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { message: "No image file uploaded" },
        { status: 400 }
      );
    }

    // Prepare the form data to forward to the backend
    const backendFormData = new FormData();
    backendFormData.append("image", image);

    // Send the image to the backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/patient/${patientId}/images`,
      {
        method: "POST",
        body: backendFormData,
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Backend error: ${errorData}`);
    }

    // Extract the response data from the backend
    const responseData = await response.text(); // Assuming the backend sends the filename as plain text

    // Successfully uploaded image, redirect back to the calling page

    return NextResponse.json(
      { message: "Image uploaded successfully", filename: responseData },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 500 }
    );
  }
}
