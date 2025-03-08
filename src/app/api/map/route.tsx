import { setCorsHeaders } from "@/utility/corsUtils";
import axios from "axios";
import { NextResponse } from "next/server";

// GET - Fetch all map
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/mapdetail`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch maps in api route");
    }

    const maps = await response.json();
    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(maps, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch maps" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const mapData = await req.json();
    // console.log("mapData: ", mapData);

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/Allmap`,
      mapData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to update map (in route)");
    }

    const headers = new Headers();
    setCorsHeaders(headers);
    return NextResponse.json(response.data, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update map (in route)" },
      { status: 500 }
    );
  }
}
