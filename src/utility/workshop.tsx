export interface Photo {
  photo_id: number;
  pathfile: string;
}

export interface Workshop {
  date: string;
  description: string;
  end_time: string;
  id: number;
  instructor: string;
  language: string;
  name: string;
  photos: Photo[];
  price: number;
  start_time: string;
}

const NEXT_API = "http://127.0.0.1:3000";
export async function fetchWorkshops(): Promise<Workshop[]> {
  try {
    const response = await fetch(`${NEXT_API}/api/workshops`); // Fetch from your route

    if (!response.ok) {
      throw new Error("Failed to fetch workshops from the route");
    }

  return await response.json(); 
  } catch (error) {
    console.error("Error fetching workshops:", error);
    throw error;
  }
}

export async function fetchWorkshopsById(workshopId: number): Promise<Workshop> {
  try {
    const response = await fetch(`${NEXT_API}/api/workshops/${workshopId}`); // Fetch from your route

    if (!response.ok) {
      throw new Error("Failed to fetch workshops from the route");
    }
 return await response.json();
  } catch (error) {
    console.error("Error fetching workshops with ID ${shopId}:", error);
    throw error;
  }
}