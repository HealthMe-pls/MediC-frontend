import axios from "axios";

export interface Mail {
  id: number;
  problem: string; //Subject
  from_username: string; // contactedFrom
  detail: string; //details
  contact_to_en: string; //contactAt
}

export async function createMail(
  entrepreneur: Omit<Mail, "id">
): Promise<Mail> {
  try {
    console.log("Data being sent to API:", entrepreneur);
    const response = await axios.post<Mail>(`/api/contacts`, entrepreneur, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Mail created: ", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating Mail:", error.response?.data || error);
    throw error;
  }
}
