export interface User {
  ID: number;
  Name: string;
  Email: string;
  Password: string;
}
// All users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("http://localhost:8080/user", {
    cache: "no-store", // Ensures fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

// Fetch user by ID
export const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`http://localhost:8080/user/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID: ${id}`);
  }

  return response.json();
};

// Delete user by ID
export const deleteUserById = async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/user/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user with ID: ${id}`);
  }
};
