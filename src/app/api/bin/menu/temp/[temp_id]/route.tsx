import { NextRequest, NextResponse } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

export async function GET(
  req: NextRequest,
  { params }: { params: { temp_id: string } }
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_GO_API_URL}/menubin/temp/${params.temp_id}`
  );
  const data = await response.json();
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { temp_id: string } }
) {
  await fetch(
    `${process.env.NEXT_PUBLIC_GO_API_URL}/menubin/temp/${params.temp_id}`,
    { method: "DELETE" }
  );
  return NextResponse.json({ message: "Deleted successfully" });
}
