import axios from "axios";
import { setCorsHeaders } from "./corsUtils";
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
    // console.log("Fetching mapdetail from URL:", url);

    const response = await axios.get<MapDetail[]>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("mapdetail response: ", response);

    if (response.status !== 200) {
      throw new Error("Failed to fetch Shop Category");
    }
    // console.log("mapdetail response data: ", response.data);
    return response.data as MapDetail[];

    // const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/map`);
    // if (!response.ok) {
    //   throw new Error("Failed to fetch map");
    // }
    // return await response.json();
  } catch (error) {
    // console.error("Error fetching map:", error);
    throw error;
  }
}

export const ChangeMap = async (mapChanged: MapChanged[]): Promise<void> => {
  if (!mapChanged) {
    throw new Error("Account data is required");
  }

  console.log("mapChanged: ", mapChanged);

  const header = new Headers();
  setCorsHeaders(header);
  // console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);

  const response = await axios.put(`/api/map`, mapChanged, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log({
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(mapChanged),
  // });

  if (response.status !== 200) {
    const errorData = response.data as { message?: string };
    throw new Error(
      `Failed to edit: ${errorData.message || response.statusText}`
    );
  }
  return;
};
