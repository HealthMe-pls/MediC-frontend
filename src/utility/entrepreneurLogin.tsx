import axios from "axios";

export interface Shop {
    shop_id: number;
    name: string;
    category: string;
    open_status: string;
    description: string;
    photos: string[];
    shop_open_dates: string[];
    menus: string[];
    social_media: string[];
  }
  export const getShopDetailsByLoggedInEntrepreneur = async (): Promise<Shop[] | { error: string }> => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      return { error: "No token found. Please log in." };
    }
  
    try {
      console.log("try to sent route")
      const url = "/api/entrepreneurLogin";  // Ensure this matches the API route
      const response = await axios.get<Shop[]>(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      return response.data as Shop[];
    } catch (error) {
      console.error("API Request Failed:", error);  // Log request failure
      throw error;
    }
  };
  