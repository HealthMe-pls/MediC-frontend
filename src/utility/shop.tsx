export interface AdminShopDetail{
    id: number;
    name: string;
    shop_catagory_id: number;
    status: number;
    full_description: string;
    brief_description: string;
    entrepreneur_id: number;
  }

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
  category_id: number;
  entrepreneur: string;
  entrepreneur_id: number;
  full_description: string;
  menus: Menu[]; // เปลี่ยนเป็น array ของเมนู
  name: string;
  photos: Photo[];
  shop_id: number;
  shop_open_dates: ShopOpenDates; // ใช้ interface ของเวลาเปิด-ปิด
  social_media: SocialMedia; // ใช้ interface ของ Social Media
  status: boolean;
}

export interface CategoryName{
  name : string
}

export interface ShopIdName{
  shop_id: number;
  shop_name:string;
}


export interface ShopCategory {
  id: number;
  name: string;
  shops: ShopDetail[];
}
  
export async function fetchAdminShopDetail(): Promise<AdminShopDetail[]> {
  try {
    const response = await fetch(`api/shop`);
    // console.log("fetch admin response" + response.json());
    if (!response.ok) {
      throw new Error("Failed to fetch shop");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching shop:", error);
    throw error;
  }
}

export async function fetchShopDetail(): Promise<ShopDetail[]> {
  try {
    const response = await fetch(`/api/shop`);
    if (!response.ok) {
      throw new Error("Failed to fetch shop");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching shop:", error);
    throw error;
  }
}

export async function fetchShopCategory(): Promise<ShopCategory[]> {
  try {
    const response = await fetch(`/api/shopcate`);
    // console.log("fetchMapdetal: " + response.json());
    if (!response.ok) {
      throw new Error("Failed to fetch Shop Category");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Shop Category", error);
    throw error;
  }
}

export const DeleteCatagory = async (id:number): Promise<void> => {
  if (!id) {
    throw new Error("Account data is required");
  }

  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);

  const response = await fetch(`api/shopcategory/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  console.log({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to edit: ${errorData.message || response.statusText}`
    );
  }
}

export const createCategory = async (shopCategory: CategoryName): Promise<void> => {
    if (!shopCategory) {
      throw new Error("Account data is required");
    }
  
    console.log(`api`);
  
    const response = await fetch(`api/shopcategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopCategory),
    });
  
    console.log({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopCategory),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create account: ${errorData.message || response.statusText}`
      );
    }
  };

export async function fetchShopById(shopId: number): Promise<ShopDetail> {
  try {
    const response = await fetch(`/api/shop/${shopId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shop with ID: ${shopId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching shop with ID ${shopId}:`, error);
    throw error;
  }
}


