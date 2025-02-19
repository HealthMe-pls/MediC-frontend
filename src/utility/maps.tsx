import axios from "axios";
export interface MapDetail {
  block_id: number;
  block_name: string;
  block_zone: string;
  category_id: number;
  shop_id: number;
  shop_name: string;
}

export interface MapChanged {
  block_id: number;
  block_name: string;
  shop_id: number | null;
}

export async function fetchMapDetail(): Promise<MapDetail[]> {
  try {
    const url = `/api/map`;
    console.log("Fetching mapdetail from URL:", url);

    const response = await axios.get<MapDetail[]>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("mapdetail response: ", response);

    if (response.status !== 200) {
      throw new Error("Failed to fetch Shop Category");
    }
    console.log("mapdetail response data: ", response.data);
    return response.data as MapDetail[];

    // const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/map`);
    // if (!response.ok) {
    //   throw new Error("Failed to fetch map");
    // }
    // return await response.json();
  } catch (error) {
    console.error("Error fetching map:", error);
    throw error;
  }
}

export const ChangeMap = async (mapChanged: MapChanged[]): Promise<void> => {
  if (!mapChanged) {
    throw new Error("Account data is required");
  }

  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);

  const response = await fetch(`http://127.0.0.1:8080/Allmap`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapChanged),
  });

  console.log({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapChanged),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to edit: ${errorData.message || response.statusText}`
    );
  }
};
