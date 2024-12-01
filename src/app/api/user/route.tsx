
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("http://localhost:8080/user");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

// Define the User interface for TypeScript
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
