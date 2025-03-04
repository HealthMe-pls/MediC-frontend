export interface ShopFormData {
  id?: number;
  name: string;
  shop_category_id: number;
  description: string;
  entrepreneur_id: number;
}

export interface SocialFormData {
  id?: number;
  name: string;
  platform: string;
  link: string;
  shop_id: number;
}

export interface MenuFormData {
  id?: number;
  idPhoto?: number;
  img: File | string;
  product_name: string;
  product_description: string;
  price: number;
  shop_id: number;
}

export interface PhotoForm {
  cover_id: number;
  cover_img: File | string;
  sec_id: number;
  sec_img: File | string;
  thr_id: number;
  thr_img: File | string;
}
