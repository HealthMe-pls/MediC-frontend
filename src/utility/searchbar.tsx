export interface SearchBarInt {
  matchWord: string;
  shop_id: number;
}

const NEXT_API = "http://127.0.0.1:3000";
export async function fetchShopByWord(
  keyword: string
): Promise<SearchBarInt[]> {
  try {
    const response = await fetch(
      `http://localhost:8080/search-shops?keyword=${keyword}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch shop with keyword: ${keyword}`);
    }
    const data = await response.json();

    return Array.isArray(data) ? data.filter((shop) => shop !== null) : [];
  } catch (error) {
    console.error(`Error fetching shop with keyword ${keyword}:`, error);
    return [];
  }
}
