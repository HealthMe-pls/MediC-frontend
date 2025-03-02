import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const shopId = (await context.params).id;

    // Get the uploaded file
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { message: "No image file uploaded" },
        { status: 400 }
      );
    }

    // Prepare the form data for the backend
    const backendFormData = new FormData();
    backendFormData.append("image", image);

    // Send the image to the backend using Axios
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/photosshop/${shopId}`,
      backendFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Axios handles FormData properly
        },
      }
    );

    return NextResponse.json(
      { message: "Image uploaded successfully", photo: response.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        message: "Failed to upload image",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
