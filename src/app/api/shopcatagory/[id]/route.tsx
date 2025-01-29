import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
  ) {
    try {
      const categoryId = (await context.params).id;
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/shopcategory/${categoryId}`,
        { method: "DELETE" }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to delete category with ID: ${categoryId}`);
      }
  
      return NextResponse.json(response);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          message: `Failed to delete category with ID: ${
            (await context.params).id
          }`,
        },
        { status: 500 }
      );
    }
  }