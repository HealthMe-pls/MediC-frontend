// import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";
import axios from "axios";
// import { ShopCategory } from "../../../utility/shopcate";

// GET - Fetch all map
export async function GET() {
  try {
    const url = `${process.env.NEXT_PUBLIC_GO_API_URL}/shopcategory`;
    console.log("Fetching Shop Category from URL:", url);

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch Shop Category");
    }
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch shopcate" },
      { status: 500 }
    );
  }
}
