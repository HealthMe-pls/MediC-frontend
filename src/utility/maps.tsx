export interface MapDetail {
    block_id: number;
    shop_id: number;
    shop_name: string;
}
  
const NEXT_API = "http://localhost:3000";

export async function fetchMapDetail(): Promise<MapDetail[]> {
    try {
      const response = await fetch(`http://127.0.0.1:8080/mapdetail`);
      // console.log("fetch admin response" + response.json());
      if (!response.ok) {
        throw new Error("Failed to fetch admins");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching admins:", error);
      throw error;
    }
  }