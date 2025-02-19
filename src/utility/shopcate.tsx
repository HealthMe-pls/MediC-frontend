// import { NextResponse } from "next/server";
// import { setCorsHeaders } from "./corsUtils";
import { ShopDetail } from "./shopDetail";
import axios from "axios";

export interface ShopCategory {
  id: number;
  name: string;
  shops: ShopDetail[];
}

export async function fetchShopCategory(): Promise<ShopCategory[]> {
  try {
    // Set CORS headers
    // const headers = new Headers();
    // setCorsHeaders(headers);

    const url = `/api/shopcate`;
    console.log("Fetching Shop Category from URL:", url);

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    console.log("fetchShopCategory at shopcat: ", response);

    if (response.status !== 200) {
      throw new Error("Failed to fetch Shop Category");
    }
    console.log("fetchShopCategory at shopcat: ", response.data);
    return response.data as ShopCategory[];
  } catch (error) {
    console.error("Error fetching Shop Category", error);
    throw error;
  }
}
