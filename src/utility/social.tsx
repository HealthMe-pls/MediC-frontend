// import { headers } from "next/headers";
import axios from "axios";

export interface SocialMedia {
  id: number;
  name: string;
  link: string;
  platform: string;
  is_public: boolean;
}

export const deleteSocialMedia = async (id: number): Promise<void> => {
  try {
    const url = `/api/social/${id}`;
    await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`Error deleting socialmedia Data with id ${id}:`, error);
    throw error;
  }
};

export const updateSocialByAdmin = async (
  id: number,
  socialmediaData: Partial<SocialMedia>
): Promise<SocialMedia> => {
  try {
    const url = `/api/social/${id}`;
    const response = await axios.put<SocialMedia>(url, socialmediaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating socialmediaData with id ${id}:`, error);
    throw error;
  }
};

export const createSocialByAdmin = async (
  socialmediaData: Partial<Omit<SocialMedia, "id">>
): Promise<SocialMedia> => {
  try {
    const url = `/api/social`;
    // console.log(socialmediaData);
    const response = await axios.post<SocialMedia>(url, socialmediaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating socialmediaData:", error);
    throw error;
  }
};
