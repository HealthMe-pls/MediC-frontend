import { ShopOpenDates } from "./shopDetail";
import axios from "axios";

export const deleteShopTime = async (id: number): Promise<void> => {
  try {
    const url = `/api/shoptime/${id}`;
    await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`Error deleting shop time with id ${id}:`, error);
    throw error;
  }
};

export const updateShopTime = async (
  id: number,
  timeData: Partial<ShopOpenDates>
): Promise<ShopOpenDates> => {
  try {
    const url = `/api/shoptime/${id}`;
    const response = await axios.put<ShopOpenDates>(url, timeData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating shop time with id ${id}:`, error);
    throw error;
  }
};

export const createShopTime = async (
  timeData: Partial<Omit<ShopOpenDates, "id">>
): Promise<ShopOpenDates> => {
  try {
    const url = `/api/shoptime`;
    const response = await axios.post<ShopOpenDates>(url, timeData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating shop time:", error);
    throw error;
  }
};
