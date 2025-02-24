export interface Mail {
  id: number;
  problem: string;
  from_username: string;
  detail: string;
  contact_to_en: string;
}

export async function createMail(
  entrepreneur: Omit<Mail, "id">
): Promise<Mail> {
  try {
    const response = await axios.post<Mail>(`/api/contacts`, entrepreneur, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Mail created: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating Mail:", error);
    throw error;
  }
}
