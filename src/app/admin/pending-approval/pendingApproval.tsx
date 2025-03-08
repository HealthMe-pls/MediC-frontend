import { ShopOpenDates } from "@/utility/shopDetail";
import axios from "axios";
import { format } from "date-fns";

export interface Social {
  id: number;
  is_public: boolean;
  link: string;
  name: string;
  platform: string;
  shop_id: number;
}

export interface DeletePhoto {
  id: number;
  TempID: number;
  PhotoID: number;
}

export interface TempSocial {
  id: number;
  name: string;
  platform: string;
  link: string;
  shop_id: number;
  is_public: boolean;
}

export interface TempMenu {
  id: number;
  product_name: string;
  product_description: string;
  price: number;
  shop_id: number;
  is_public: boolean;
  photos: Photo[];
}

export interface Photo {
  id: number;
  path_file: string;
  shop_id: number;
  menu_id: number;
  is_public: boolean;
}

export interface Time {
  id: number;
  start_time: string;
  end_time: string;
  shop_id: number;
  market_open_date_id: number;
}

export interface TempShop {
  id: number;
  name: string;
  description: string;
  category_id: number;
  shop_id: number;
  deleteSocials?: Social[];
  socials: Social[];
  menus: TempMenu[]; // Include menus in the response
  photos_shop: Photo[]; // Photos directly related to the shop
  photos_menu: Photo[]; // Photos linked to menus
  addTime: Time[]; // Include added times
  editTime: Time[]; // Include edited times
  deleteTime: Time[]; // Include deleted times
  time: ShopOpenDates[]; // Include shop open dates
}

export interface Response {
  temp_shops: TempShop[];
}

export const fetchTempShop = async (): Promise<Response> => {
  try {
    const url = `/api/waitingShops`;

    const response = await axios.get<Response>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("response", response.data.temp_shops);
    return response.data as Response;
  } catch (error) {
    console.error("Error fetching TempShop:", error);
    throw error;
  }
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString); // ใช้ new Date() แทน parseISO
  return format(date, "dd/MM/yyyy EEEE");
};
export const formatTime = (isoString: string): string => {
  const date = new Date(isoString); // ใช้ new Date() แทน parseISO
  return format(date, "HH:mm");
};
