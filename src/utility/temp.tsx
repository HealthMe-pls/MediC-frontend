// import { headers } from "next/headers";
import axios from "axios";
import {
  TempMenu,
  TempSocial,
  Photo,
} from "@/app/admin/pending-approval/pendingApproval";

export interface TempShopForm {
  id: number;
  name: string;
  shop_id: number;
  status: string;
  description: string;
  shop_category_id: number;
}

export interface BinMenu {
  id: number;
  menu_id: number;
  temp_id: number;
}

export const updateTempShop = async (
  id: number,
  tempShopData: Partial<TempShopForm>
): Promise<TempShopForm> => {
  try {
    const url = `/api/tempshops/${id}`;
    const response = await axios.put<TempShopForm>(url, tempShopData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating tempshop with id ${id}:`, error);
    throw error;
  }
};

export const createMenuEnt = async (
  menuData: Partial<Omit<TempMenu, "id">>
): Promise<TempMenu> => {
  try {
    const url = `/api/menu/entrepreneur`;
    const response = await axios.post<TempMenu>(url, menuData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating temp menu:", error);
    throw error;
  }
};

export const updateTempMenu = async (
  id: number,
  menuData: Partial<TempMenu>
): Promise<TempMenu> => {
  try {
    const url = `/api/menu/entrepreneur/${id}`;
    const response = await axios.put<TempMenu>(url, menuData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating temp menu with id ${id}:`, error);
    throw error;
  }
};

export const deleteMenuEnt = async (
  menuData: Partial<Omit<BinMenu, "id">>
): Promise<BinMenu> => {
  try {
    const url = `/api/bin/menu/temp`;
    const response = await axios.post<BinMenu>(url, menuData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error post temp menu to bin:", error);
    throw error;
  }
};

// export const deleteShopByAdmin = async (id: number): Promise<void> => {
//     try {
//       const url = `/api/shop/${id}`;
//       await axios.delete(url, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     } catch (error) {
//       console.error(`Error deleting shop with id ${id}:`, error);
//       throw error;
//     }
//   };
