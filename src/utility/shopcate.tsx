import { ShopDetail } from "./shopDetail";

export interface ShopCategory {
  id: number;
  name: string;
  shops: ShopDetail[];
}

// const NEXT_API = "http://127.0.0.1:3000";

export async function fetchShopCategory(): Promise<ShopCategory[]> {
  try {
    const response = await fetch(`/api/shopcate`);
    // console.log("fetchMapdetal: " + response.json());
    if (!response.ok) {
      throw new Error("Failed to fetch Shop Category");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Shop Category", error);
    throw error;
  }
}
