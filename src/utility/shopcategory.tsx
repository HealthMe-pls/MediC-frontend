import { ShopDetail } from "./shop";
import axios from "axios";

export interface ShopCategory {
  id: number;
  name: string;
  Shop: ShopDetail[];
}

export interface CategoryName {
  name: string;
}

export async function fetchShopCategory(): Promise<ShopCategory[]> {
  try {
    // Set CORS headers
    // const headers = new Headers();
    // setCorsHeaders(headers);

    const url = `/api/shopcategory`;
    // console.log("Fetching Shop Category from URL:", url);

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    // console.log("fetchShopCategory at shopcat: ", response);

    if (response.status !== 200) {
      throw new Error("Failed to fetch Shop Category");
    }
    // console.log("fetchShopCategory at shopcat: ", response.data);
    return response.data as ShopCategory[];
  } catch (error) {
    console.error("Error fetching Shop Category", error);
    throw error;
  }
}

export const DeleteCatagory = async (id: number): Promise<void> => {
  if (!id) {
    throw new Error("Account data is required");
  }

  // console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);

  const response = await fetch(`/api/shopcategory/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  // console.log({
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(id),
  // });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to edit: ${errorData.message || response.statusText}`
    );
  }
};

export const createCategory = async (
  shopCategory: CategoryName
): Promise<void> => {
  if (!shopCategory) {
    throw new Error("Account data is required");
  }

  // console.log(`${NEXT_API}`);

  const response = await fetch(`/api/shopcategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shopCategory),
  });

  // console.log({
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(shopCategory),
  // });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to create account: ${errorData.message || response.statusText}`
    );
  }
};
