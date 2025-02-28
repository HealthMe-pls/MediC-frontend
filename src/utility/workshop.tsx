import axios from "axios";
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

export async function fetchWorkshops(): Promise<Workshop[]> {
  try {
    const url = `/api/workshops`;
    // console.log("Fetching workshops from URL:", url);

    const response = await axios.get<Workshop[]>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("fetchWorkshops at workshop: ", response);
    return response.data as Workshop[];
  } catch (error) {
    // console.error("Error fetching workshops:", error);
    throw error;
  }
}
export const fetchWorkshopsById = async (
  id: number
): Promise<Workshop | null> => {
  try {
    const url = `/api/workshops/${id}`;
    // console.log("Fetching workshops from URL:", url);

    const response = await axios.get<Workshop>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("fetchWorkshops at workshop: ", response);
    return response.data as Workshop;
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_NEXT_URL}/api/workshops/${id}`
    // );
    // if (!response.ok) {
    //   console.error(`Failed to fetch workshop: ${response.status}`);
    //   return null; // Return null for non-200 status codes
    // }

    // const data = await response.json();
    // return data || null; // Return null if the response is empty
  } catch (error) {
    // console.error("Error fetching workshop:", error);
    throw error; // Return null on network errors or exceptions
  }
};

export const deleteWorkshop = async (id: number): Promise<void> => {
  try {
    const url = `/api/workshops/${id}`;
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

export const updateWorkshop = async (
  id: number,
  workshopData: Partial<Workshop>
): Promise<Workshop> => {
  try {
    const url = `/api/workshops/${id}`;
    const response = await axios.put<Workshop>(url, workshopData, {
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

export const createWorkshop = async (
  workshopData: Partial<Omit<Workshop, "id">>  
): Promise<Workshop> => {
  try {
    const url = `/api/workshops`;
    const response = await axios.post<Workshop>(url, workshopData, {
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