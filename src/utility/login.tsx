import axios from "axios";

// Define the interfaces
export interface Entrepreneur {
  id: number;
  username: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  error?: string;
}


// Login an entrepreneur
export async function loginEntrepreneur(
  entrepreneur: Omit<Entrepreneur, "id">
): Promise<AuthResponse> {
  try {
    const response = await axios.post<AuthResponse>("/api/login", entrepreneur, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logoutEntrepreneur(token: string): Promise<AuthResponse> {
  try {
    const url = `/api/logout`;

    const response = await axios.post<AuthResponse>(
      url, 
      {}, // Empty body if not required
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in the header
        },
      }
    );

    // Remove token from storage
    localStorage.removeItem("token"); 
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}
