export interface SearchBarInt {
  matchWord: string;
  shop_id: number;
}

export interface ShopByname {
  name: string;
  id: number;
}

// export async function fetchShopByWord(
//   keyword: string
// ): Promise<SearchBarInt[]> {
//   try {
//     const response = await fetch(
//       `http://localhost:8080/search-shops?keyword=${keyword}`
//     );
//     if (!response.ok) {
//       throw new Error(`Failed to fetch shop with keyword: ${keyword}`);
//     }
//     const data = await response.json();

//     return Array.isArray(data) ? data.filter((shop) => shop !== null) : [];
//   } catch (error) {
//     console.error(`Error fetching shop with keyword ${keyword}:`, error);
//     return [];
//   }
// }

export async function fetchShopByWord(
  keyword: string
): Promise<SearchBarInt[]> {
  try {
    const response = await fetch(
      `/api/search/keyword?keyword=${encodeURIComponent(keyword)}` // เปลี่ยนเป็น API ใหม่
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

// export async function fetchShopByName(keyword: string): Promise<ShopByname> {
//   try {
//     const response = await fetch(
//       `http://localhost:8080/shopid?shopidkeyword=${keyword}`
//     );
//     if (!response.ok) {
//       throw new Error(`Failed to fetch shop with name: ${keyword}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(`Error fetching shop with name ${keyword}:`, error);
//     throw error;
//   }
// }

export async function fetchShopByName(keyword: string): Promise<ShopByname> {
  try {
    const response = await fetch(
      `/api/search/shopname?keyword=${encodeURIComponent(keyword)}` // เปลี่ยนเป็น API ใหม่
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch shop with name: ${keyword}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching shop with name ${keyword}:`, error);
    throw error;
  }
}
