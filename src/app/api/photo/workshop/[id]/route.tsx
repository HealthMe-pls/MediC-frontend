import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const workshopId = (await context.params).id; // Ensure params exist

    if (!workshopId) {
      return NextResponse.json(
        { message: "Workshop ID is missing" },
        { status: 400 }
      );
    }

    // Get the uploaded file
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { message: "No image file uploaded" },
        { status: 400 }
      );
    }

    // Prepare form data for the backend
    const backendFormData = new FormData();
    backendFormData.append("image", image);

    // Send the image to the backend using Axios
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/photos/workshop/${workshopId}`,
      backendFormData
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
