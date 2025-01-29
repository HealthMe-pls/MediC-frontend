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
export const fetchWorkshopsById = async (
  id: number
): Promise<Workshop | null> => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/workshops/${id}`);
    if (!response.ok) {
      console.error(`Failed to fetch workshop: ${response.status}`);
      return null; // Return null for non-200 status codes
    }

    const data = await response.json();
    return data || null; // Return null if the response is empty
  } catch (error) {
    console.error("Error fetching workshop:", error);
    return null; // Return null on network errors or exceptions
  }
};

