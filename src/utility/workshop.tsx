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

    const workshops = await response.json(); // Read JSON directly
    console.log("Backend Response:", workshops); // Log parsed response
    return workshops;
  } catch (error) {
    console.error("Error fetching workshops:", error);
    throw error;
  }
}


// export async function fetchWorkshops(): Promise<Workshop[]> {
//   try {
//     const response = await fetch(`${NEXT_API}/api/workshops`); // Fetch from your route
//     console.log("Backend Response:", await response.text());

//     if (!response.ok) {
//       throw new Error("Failed to fetch workshops from the route");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching workshops:", error);
//     throw error;
//   }
// }

// export async function fetchWorkshops(): Promise<Workshop[]> {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workshops`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch workshops");
//       }
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching workshops:", error);
//       throw error;
//     }
//   }
