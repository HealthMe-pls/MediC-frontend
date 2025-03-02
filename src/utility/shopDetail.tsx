// import { headers } from "next/headers";
import axios from "axios";

// Interface สำหรับข้อมูล Social Media
export interface Photo {
  pathfile: string;
  photo_id: number;
  is_public: boolean;
}

export interface SocialMedia {
  id: number;
  name: string;
  link: string;
  platform: string;
  is_public: boolean;
}

// Interface สำหรับข้อมูลเวลาเปิด-ปิดร้าน
export interface ShopOpenDates {
  end_time: string;
  id: number;
  start_time: string;
}

// Interface สำหรับข้อมูลเมนูร้านค้า (กรณีที่ต้องการรายละเอียดเมนู)
export interface Menu {
  id: number;
  photos: Photo[];
  price: number;
  product_description: string;
  product_name: string;
  is_public: boolean;
}

// Interface หลักของ ShopDetail
export interface ShopDetail {
  category: string;
  category_id: number;
  entrepreneur: string;
  entrepreneur_id: number;
  description: string;
  menus: Menu[]; // เปลี่ยนเป็น array ของเมนู
  name: string;
  photos: Photo[];
  shop_id: number;
  shop_open_dates: ShopOpenDates; // ใช้ interface ของเวลาเปิด-ปิด
  social_media: SocialMedia[]; // ใช้ interface ของ Social Media
  open_status: boolean;
}

// const NEXT_API = "http://127.0.0.1:3000";

// ฟังก์ชันดึงข้อมูลร้านค้าทั้งหมด
export async function fetchShopDetail(): Promise<ShopDetail[]> {
  try {
    const url = `/api/shop`;
    // console.log("Fetching Shop detail from URL:", url);

    const response = await axios.get<ShopDetail[]>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as ShopDetail[];
  } catch (error) {
    // console.error("Error fetching shop:", error);
    throw error;
  }
}

export async function fetchShopById(shopId: number): Promise<ShopDetail> {
  try {
    const response = await axios.get<ShopDetail>(`/api/shop/${shopId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("fetchShopByID: ", response);

    if (response.status !== 200) {
      throw new Error("Failed to fetch Shop Category");
    }
    // console.log("fetchShopById data: ", response.data);
    return response.data as ShopDetail;
  } catch (error) {
    // console.error(`Error fetching shop with ID ${shopId}:`, error);
    throw error;
  }
}

export const deleteShopByAdmin = async (id: number): Promise<void> => {
  try {
    const url = `/api/shop/${id}`;
    await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`Error deleting workshop with id ${id}:`, error);
    throw error;
  }
};

export const updateShopByAdmin = async (
  id: number,
  workshopData: Partial<ShopDetail>
): Promise<ShopDetail> => {
  try {
    const url = `/api/shop/${id}`;
    const response = await axios.put<ShopDetail>(url, workshopData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating workshop with id ${id}:`, error);
    throw error;
  }
};

export const createShopByAdmin = async (
  workshopData: Partial<Omit<ShopDetail, "id">>
): Promise<ShopDetail> => {
  try {
    const url = `/api/shop`;
    const response = await axios.post<ShopDetail>(url, workshopData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating workshop:", error);
    throw error;
  }
};
