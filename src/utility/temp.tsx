// import { headers } from "next/headers";
import axios from "axios";
import {
  // TempMenu,
  // TempSocial,
  // Photo,
} from "@/app/admin/pending-approval/pendingApproval";

export interface TempShopForm {
  id?: number;
  name: string;
  shop_id?: number;
  status: string;
  description: string;
  shop_category_id?: number;
}

export interface TempShopOpenDate {
  id?: number;
  start_time: string;
  end_time: string;
  shop_id: number;
  market_open_date_id: number;
  temp_id?: number;
  operation?: string;
}

export interface TempMenu {
  id?: number;
  temp_id?: number;
  menu_id?: number;
  product_description: string;
  price: number;
  product_name: string;
}

export interface TempSocial {
  id?: number;
  temp_id?: number;
  social_id?: number;
  name: string;
  platform: string;
  link: string;
}

export interface Photo {
  id?: number;
  path_file: string;
  menu_id?: number;
  shop_id?: number;
  workshop_id?: number;
  eventact_id?: number;
  temp_id?: number;
  is_public?: boolean;
}

export interface BinMenu {
  id?: number;
  menu_id: number;
  temp_id: number;
}

export interface BinSocial {
  id?: number;
  social_id: number;
  temp_id: number;
}

export interface BinPhoto {
  id?: number;
  photo_id: number;
  temp_id: number;
}

export const getAllTempShops = async (): Promise<TempShopForm[]> => {
  try {
    const response = await axios.get<TempShopForm[]>('/api/tempshops');
    return response.data;
  } catch (error) {
    console.error('Error fetching temp shops:', error);
    throw error;
  }
};

export const getTempShopById = async (id: number): Promise<TempShopForm> => {
  try {
    const response = await axios.get<TempShopForm>(`/api/tempshops/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching temp shop with id ${id}:`, error);
    throw error;
  }
};

export const createTempShop = async (tempShopData: Partial<TempShopForm>): Promise<TempShopForm> => {
  try {
    const response = await axios.post<TempShopForm>('/api/tempshops', tempShopData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating temp shop:', error);
    throw error;
  }
};

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

// export const updateTempShop = async (
//   id: number,
//   tempShopData: Partial<TempShopForm>
// ): Promise<TempShopForm> => {
//   try {
//     const response = await axios.put<TempShopForm>(`/api/tempshops/${id}`, tempShopData, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating temp shop with id ${id}:`, error);
//     throw error;
//   }
// };

export const deleteTempShop = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/tempshops/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(`Error deleting temp shop with id ${id}:`, error);
    throw error;
  }
};

export const createMenuEnt = async (
  menuData: Partial<Omit<TempMenu, "id">>
): Promise<TempMenu> => {
  try {
    const url = `/api/menus/entrepreneur`;
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

export const updateTempMenuByMenuID = async (
  menuId: number,
  menuData: Partial<TempMenu>
): Promise<TempMenu> => {
  const url = `/api/updatemenu/${menuId}`;
  const response = await axios.put<TempMenu>(url, menuData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const updateTempShopByShopId = async (
  shopId: number,
  tempShopData: Partial<TempShopForm>
): Promise<TempShopForm> => {
  try {
    const response = await axios.put<TempShopForm>(`/api/shop/${shopId}`, tempShopData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating shop with id ${shopId} via temp shop:`, error);
    throw error;
  }
};

export const getAllTempShopOpenDates = async (): Promise<TempShopOpenDate[]> => {
  try {
    const response = await axios.get<TempShopOpenDate[]>('/api/tempshopopendates');
    return response.data;
  } catch (error) {
    console.error('Error fetching temp shop open dates:', error);
    throw error;
  }
};

export const getTempShopOpenDateById = async (id: number): Promise<TempShopOpenDate> => {
  try {
    const response = await axios.get<TempShopOpenDate>(`/api/tempshopopendates/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching temp shop open date with id ${id}:`, error);
    throw error;
  }
};

export const createTempShopOpenDate = async (
  tempShopOpenDateData: Partial<TempShopOpenDate>
): Promise<TempShopOpenDate> => {
  try {
    const response = await axios.post<TempShopOpenDate>('/api/tempshopopendates', tempShopOpenDateData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating temp shop open date:', error);
    throw error;
  }
};

export const updateTempShopOpenDate = async (
  id: number,
  tempShopOpenDateData: Partial<TempShopOpenDate>
): Promise<TempShopOpenDate> => {
  try {
    const response = await axios.put<TempShopOpenDate>(
      `/api/tempshopopendates/${id}`,
      tempShopOpenDateData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating temp shop open date with id ${id}:`, error);
    throw error;
  }
};

export const deleteTempShopOpenDate = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/tempshopopendates/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(`Error deleting temp shop open date with id ${id}:`, error);
    throw error;
  }
};

export const updateTempMenu = async (
  id: number,
  menuData: Partial<TempMenu>
): Promise<TempMenu> => {
  try {
    const url = `/api/menus/entrepreneur/${id}`;
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

export const createSocialEnt = async (
  socialData: Partial<Omit<TempSocial, "id">>
): Promise<TempSocial> => {
  try {
    const url = `/api/socials/entrepreneur`;
    const response = await axios.post<TempSocial>(url, socialData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating social media:", error);
    throw error;
  }
};

export const updateSocialEnt = async (
  socialId: number,
  socialData: Partial<TempSocial>
): Promise<TempSocial> => {
  try {
    const url = `/api/updatesocial/${socialId}`;
    const response = await axios.put<TempSocial>(url, socialData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating social media with id ${socialId}:`, error);
    throw error;
  }
};

export const createPhotoByMenuId = async (
  menuId: number, 
  file: File
): Promise<Photo> => {
  if (!file) throw new Error("File is required to upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post<Photo>(
      `/api/photosmenu/${menuId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading menu photo:", error);
    throw new Error("Failed to upload menu photo");
  }
};

export const createPhotoByShopId = async (
  shopId: number, 
  file: File
): Promise<Photo> => {
  if (!file) throw new Error("File is required to upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post<Photo>(
      `/api/photosshop/${shopId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading shop photo:", error);
    throw new Error("Failed to upload shop photo");
  }
};

export const createBinMenu = async (
  menuData: Partial<Omit<BinMenu, "id">>
): Promise<BinMenu> => {
  try {
    const url = `/api/menubin`;
    const response = await axios.post<BinMenu>(url, menuData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding menu to bin:", error);
    throw error;
  }
};

export const createBinSocial = async (
  socialData: Partial<Omit<BinSocial, "id">>
): Promise<BinSocial> => {
  try {
    const url = `/api/socialbin`;
    const response = await axios.post<BinSocial>(url, socialData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding social media to bin:", error);
    throw error;
  }
};

export const createBinPhoto = async (
  photoData: Partial<Omit<BinPhoto, "id">>
): Promise<BinPhoto> => {
  try {
    const url = `/api/photobin`;
    const response = await axios.post<BinPhoto>(url, photoData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding photo to bin:", error);
    throw error;
  }
};