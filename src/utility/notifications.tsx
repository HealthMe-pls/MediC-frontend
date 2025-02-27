import axios from "axios";

export interface Noti {
  id: number;
  problem: string;
  from_username: string;
  detail: string;
  contact_to_en: string;
}

export async function fetchNotifications(): Promise<Noti[]> {
  try {
    const response = await fetch(`/api/contacts`);
    if (!response.ok) {
      throw new Error("Failed to fetch nottification backend");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetxhing contract:", error);
    throw error;
  }
}

export async function deleteNotifications(id: number): Promise<void> {
  try {
    await axios.delete(`/api/contacts/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(`Entrepreneur with ID ${id} deleted successfully`);
  } catch (error) {
    // console.error(`Error deleting entrepreneur with ID ${id}:`, error);
    throw error;
  }
}
