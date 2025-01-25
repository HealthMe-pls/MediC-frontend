export interface MapDetail {
  block_id: number;
  block_name: string;
  block_zone: string;
  category_id: number;
  shop_id: number;
  shop_name: string;
}

const NEXT_API = "http://127.0.0.1:3000";

export async function fetchMapDetail(): Promise<MapDetail[]> {
  try {
    const response = await fetch(`${NEXT_API}/api/map`);
    // console.log("fetchMapdetal: " + response.json());
    if (!response.ok) {
      throw new Error("Failed to fetch admins");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
}
