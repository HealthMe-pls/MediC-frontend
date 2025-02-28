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

// Register a new entrepreneur
export async function registerEntrepreneur(
  entrepreneur: Omit<Entrepreneur, "id">
): Promise<AuthResponse> {
  try {
    const response = await axios.post<AuthResponse>("/api/register", entrepreneur, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data?.error || "Registration failed" };
  }
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
  } catch (error: any) {
    return { error: error.response?.data?.error || "Login failed" };
  }
}
