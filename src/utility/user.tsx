export interface User {
  ID: number;
  Name: string;
  Email: string;
  Password: string;
}

// Base URL for API
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080"; // Fallback for local development

// All users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    cache: "no-store", // Ensures fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

// Fetch user by ID
export const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/user/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID: ${id}`);
  }

  return response.json();
};

// Delete user by ID
export const deleteUserById = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/user/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user with ID: ${id}`);
  }
};
