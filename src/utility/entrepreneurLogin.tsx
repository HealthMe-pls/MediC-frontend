import axios from "axios";
import { Entrepreneur } from "@/utility/entrepreneur";
import { ShopOpenDates } from "@/utility/shopDetail";
import {
  Social,
  DeletePhoto,
  TempSocial,
  TempMenu,
  Photo,
  Time,
} from "@/app/admin/pending-approval/pendingApproval";
export interface TempShopEn {
  id: number;
  name: string;
  shop_id: number;
  description: string;
  category_id: number;
  deleteSocials?: Social[];
  socials: Social[];
  menus: TempMenu[]; // Include menus in the response
  photos_shop: Photo[]; // Photos directly related to the shop
  photos_menu: Photo[]; // Photos linked to menus
  addTime: Time[]; // Include added times
  editTime: Time[]; // Include edited times
  deleteTime: Time[]; // Include deleted times
  time: ShopOpenDates[]; // Include shop open dates
  entrepreneur_id: number;
}
export interface Response {
  temp_shops: TempShopEn[];
}
export const getShopDetailsByLoggedInEntrepreneur = async (): Promise<
  Response | { error: string }
> => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return { error: "No token found. Please log in." };
  }

  try {
    console.log("try to sent route");
    const url = "/api/entrepreneurLogin"; // Ensure this matches the API route
    const response = await axios.get<Response>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data as Response;
  } catch (error) {
    console.error("API Request Failed:", error); // Log request failure
    throw error;
  }
};

export async function fetchEntrepreneurLoginById(): Promise<Entrepreneur> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  try {
    const response = await axios.get<Entrepreneur>("/api/entrepreneurLogin/edit", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch entrepreneur");
    }

    return response.data as Entrepreneur;
  } catch (error) {
    throw error;
  }
}