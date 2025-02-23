import axios from "axios";
import { ShopDetail } from "./shopDetail";
export interface Entrepreneur {
  id: number;
  username: string;
  password: string;
}

export async function fetchEntrepreneur(): Promise<Entrepreneur[]> {
  try {
    const url = `/api/entrepreneur`;
    console.log("Fetching entrepreneur from URL:", url);

    const response = await axios.get<Entrepreneur[]>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("entrepreneur response: ", response);

    if (response.status !== 200) {
      throw new Error("Failed to fetch entrepreneur");
    }
    console.log("entrepreneur response data: ", response.data);
    return response.data as Entrepreneur[];
  } catch (error) {
    console.error("Error entrepreneur:", error);
    throw error;
  }
}

export async function fetchShopEntById(entId: number): Promise<ShopDetail[]> {
  try {
    const response = await axios.get<ShopDetail[]>(
      `/api/entrepreneur/shop/${entId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("fetchShopByEntID: ", response);

    if (response.status !== 200) {
      throw new Error("Failed to fetch ent'shop");
    }
    console.log("fetchShopEntById data: ", response.data);
    return response.data as ShopDetail[];
  } catch (error) {
    console.error(`Error fetching shop with entID ${entId}:`, error);
    throw error;
  }
}
