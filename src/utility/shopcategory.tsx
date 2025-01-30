import { ShopDetail } from "./shop";

export interface ShopCategory{
    id : number
    name : string
    Shop : ShopDetail[]
}

export interface CategoryName{
  name : string
}

const NEXT_API = "http://localhost:8080";

export async function fetchShopCategory(): Promise<ShopCategory[]> {
  try {
    const response = await fetch(`http://127.0.0.1:8080/shopcategory`);
    // console.log("fetch admin response" + response.json());
    if (!response.ok) {
      throw new Error("Failed to fetch shop");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching shop:", error);
    throw error;
  }
}

export const DeleteCatagory = async (id:number): Promise<void> => {
    if (!id) {
      throw new Error("Account data is required");
    }
  
    console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);
  
    const response = await fetch(`http://127.0.0.1:8080/shopcategory/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
  
    console.log({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to edit: ${errorData.message || response.statusText}`
      );
    }
  }

  export const createCategory = async (shopCategory: CategoryName): Promise<void> => {
      if (!shopCategory) {
        throw new Error("Account data is required");
      }
    
      console.log(`${NEXT_API}`);
    
      const response = await fetch(`${NEXT_API}/shopcategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopCategory),
      });
    
      console.log({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopCategory),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to create account: ${errorData.message || response.statusText}`
        );
      }
    };
    