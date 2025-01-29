export interface ShopDetail{
    id: number;
    name: string;
    shop_catagory_id: number;
    status: number;
    full_description: string;
    brief_description: string;
    entrepreneur_id: number;
  }

export interface ShopIdName{
  shop_id: number;
  shop_name:string;
}
  
export async function fetchShopDetail(): Promise<ShopDetail[]> {
  try {
    const response = await fetch(`http://127.0.0.1:8080/shop`);
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