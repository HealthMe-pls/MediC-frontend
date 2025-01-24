// Interface สำหรับข้อมูล Social Media
export interface Photo {
  pathfile: string;
  photo_id: number;
}

export interface SocialMedia {
  id: number;
  link: string;
  platform: string;
}

// Interface สำหรับข้อมูลเวลาเปิด-ปิดร้าน
export interface ShopOpenDates {
  end_time: string;
  id: number;
  start_time: string;
}

// Interface สำหรับข้อมูลเมนูร้านค้า (กรณีที่ต้องการรายละเอียดเมนู)
export interface Menu {
  id: string;
  photos: Photo[];
  price: number;
  product_description: string;
  product_name: string;
}

// Interface หลักของ ShopDetail
export interface ShopDetail {
  brief_description: string;
  category: string;
  entrepreneur: string;
  entrepreneur_id: number;
  full_description: string;
  menus: Menu[]; // เปลี่ยนเป็น array ของเมนู
  name: string;
  shop_id: number;
  shop_open_dates: ShopOpenDates; // ใช้ interface ของเวลาเปิด-ปิด
  social_media: SocialMedia; // ใช้ interface ของ Social Media
  status: boolean;
}

const NEXT_API = "http://127.0.0.1:3000";

// ฟังก์ชันดึงข้อมูลร้านค้าทั้งหมด
export async function fetchShopDetail(): Promise<ShopDetail[]> {
  try {
    const response = await fetch(`${NEXT_API}/api/shop`);
    if (!response.ok) {
      throw new Error("Failed to fetch shop");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching shop:", error);
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
    const response = await fetch(`${NEXT_API}/api/shop/${shopId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shop with ID: ${shopId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching shop with ID ${shopId}:`, error);
    throw error;
  }
}
