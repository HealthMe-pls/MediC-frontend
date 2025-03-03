import axios from "axios";

export interface Social {
  id: number;
  is_public: boolean;
  link: string;
  name: string;
  platform: string;
  shop_id: number;
}

export interface TempShop {
  id: number;
  name: string;
  shop_id: number;
  addSocials: Social[];
  deleteSocials: Social[];
  editSocials: Social[];
}

export interface Response {
  temp_shops: TempShop[];
}

export const fetchTempShop = async (): Promise<Response> => {
  try {
    const url = `/api/tempshops`;

    const response = await axios.get<Response>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response", response.data.temp_shops);
    return response.data as Response;
  } catch (error) {
    console.error("Error fetching TempShop:", error);
    throw error;
  }
};
