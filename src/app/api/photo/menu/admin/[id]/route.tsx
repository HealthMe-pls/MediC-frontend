import { NextResponse } from "next/server";

export async function POST(req: Request, context: { params: { id: string } }) {
  try {
    const menuId = context.params.id;

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
      `${process.env.NEXT_PUBLIC_GO_API_URL}/photos/menu/${menuId}`,
      {
        method: "POST",
        body: backendFormData,
        headers: {
          // No need to set 'Content-Type', FormData sets it automatically
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Backend error: ${errorData}`);
    }

    // Extract the response data from the backend
    const responseData = await response.json(); // Assuming the backend responds with JSON

    return NextResponse.json(
      { message: "Image uploaded successfully", photo: responseData },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to upload image",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}