import { NextRequest, NextResponse } from "next/server";
// import { setCorsHeaders } from "@/utility/corsUtils";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ temp_id: string }> }
) {
  const id = (await context.params).temp_id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_GO_API_URL}/menubin/temp/${id}`
  );
  const data = await response.json();
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ temp_id: string }> }
) {
  const id = (await context.params).temp_id;
  await fetch(`${process.env.NEXT_PUBLIC_GO_API_URL}/menubin/temp/${id}`, {
    method: "DELETE",
  });
  return NextResponse.json({ message: "Deleted successfully" });
}
