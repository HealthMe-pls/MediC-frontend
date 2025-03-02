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
  link: string;
  platform: string;
  is_public: boolean;
}

// Interface สำหรับข้อมูลเวลาเปิด-ปิดร้าน 
// เนื่องจาก controller ส่ง object ของ array มา
export interface ShopOpenResponse {
  shop_open_dates: ShopOpenDates[];
}

export interface ShopOpenDates {
  id: number;
  start_time: string;
  end_time: string;
  shop: ShopDetail;
  margetOpenDate: string;
}

// Interface สำหรับข้อมูลเมนูร้านค้า (กรณีที่ต้องการรายละเอียดเมนู)
export interface Menu {
  id: string;
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
  social_media: SocialMedia; // ใช้ interface ของ Social Media
  open_status: boolean;
}


// const NEXT_API = "http://127.0.0.1:3000";

// ฟังก์ชันดึงข้อมูลร้านค้าทั้งหมด
export async function fetchShopDetail(): Promise<ShopOpenResponse[]> {
  try {
    const url = `/api/shop`;
    // console.log("Fetching Shop detail from URL:", url);

    const response = await axios.get<ShopOpenResponse[]>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as ShopOpenResponse[];
  } catch (error) {
    // console.error("Error fetching shop:", error);
    throw error;
  }
}

// ฟังก์ชันดึงข้อมูลร้านค้าตาม shopId
// export async function fetchShopById(shopId: number): Promise<ShopDetail> {
//   try {
//     const response = await fetch(`http://127.0.0.1:8080/shop/${shopId}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch shop with ID: ${shopId}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(`Error fetching shop with ID ${shopId}:`, error);
//     throw error;
//   }
// }
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

export async function fetchShopOpenDates(): Promise<ShopOpenDates[]> {
  try {
    const url = `/api/shopOpenDates`;
    // console.log("Fetching entrepreneur from URL:", url);

    const response = await axios.get<ShopOpenDates[]>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("entrepreneur response: ", response);

    if (response.status !== 200) {
      throw new Error("Failed to fetch entrepreneur");
    }
    // console.log("entrepreneur response data: ", response.data);
    return response.data as ShopOpenDates[];
  } catch (error) {
    // console.error("Error entrepreneur:", error);
    throw error;
  }
}