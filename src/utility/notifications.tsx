export interface Noti {
    id: number;
    problem: string;
    from_username: string;
    detail: string;
    contact_to_en: string;
}

export async function fetchNotifications(): Promise<Noti[]>{
    try {
        const response = await fetch(`http://127.0.0.1:8080/contacts`);
        if (!response.ok) {
            throw new Error("Failed to fetch nottification backend");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetxhing contract:", error);
        throw error;
    }
}