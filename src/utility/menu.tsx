// import { headers } from "next/headers";
import axios from "axios";

export interface Menu {
  id: number;
  product_description: string;
  price: number;
  product_name: string;
}

export const deleteMenu = async (id: number): Promise<void> => {
  try {
    const url = `/api/menu/${id}`;
    await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`Error deleting menu Data with id ${id}:`, error);
    throw error;
  }
};

export const updateMenuByAdmin = async (
  id: number,
  menuData: Partial<Menu>
): Promise<Menu> => {
  try {
    const url = `/api/menu/${id}`;
    const response = await axios.put<Menu>(url, menuData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating menu with id ${id}:`, error);
    throw error;
  }
};

export const createMenuByAdmin = async (
  menuData: Partial<Omit<Menu, "id">>
): Promise<Menu> => {
  try {
    const url = `/api/menu`;
    console.log(menuData);
    const response = await axios.post<Menu>(url, menuData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
};
