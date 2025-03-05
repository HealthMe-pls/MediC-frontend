import { NextResponse } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";
import axios from "axios";
export async function GET() {
  try {
    const headers = new Headers();
    setCorsHeaders(headers);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/waitingshops`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch tempshop");
    }

    const shops = response.data;

    return NextResponse.json(shops, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch tempshop" },
      { status: 500 }
    );
  }
}
