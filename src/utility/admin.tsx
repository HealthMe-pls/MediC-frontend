// utilities/adminUtils.ts
export interface Admin {
  id?: number;
  username: string;
  password: string;
  title: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
}

const apiBaseUrl = "http://localhost:3000/api";

// Fetch all admins
export async function fetchAdmins(): Promise<Admin[]> {
  try {
    const response = await fetch(`http://localhost:8080/admin`);
    console.log("fetch admin response" + response.json());
    if (!response.ok) {
      throw new Error("Failed to fetch admins");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
}

// Fetch admin by username
export async function fetchAdminByUsername(
  apiBaseUrl: string,
  username: string
): Promise<Admin> {
  try {
    const response = await fetch(`${apiBaseUrl}/admin/${username}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch admin with username: ${username}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching admin (${username}):`, error);
    throw error;
  }
}

// Create a new admin
export async function createAdmin(
  apiBaseUrl: string,
  adminData: Admin
): Promise<Admin> {
  try {
    const response = await fetch(`${apiBaseUrl}/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) {
      throw new Error("Failed to create admin");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
}

// Update admin by username
export async function updateAdmin(
  apiBaseUrl: string,
  username: string,
  adminData: Admin
): Promise<Admin> {
  try {
    const response = await fetch(`${apiBaseUrl}/admin/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update admin with username: ${username}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating admin (${username}):`, error);
    throw error;
  }
}

// Delete admin by username
export async function deleteAdmin(
  apiBaseUrl: string,
  username: string
): Promise<void> {
  try {
    const response = await fetch(`${apiBaseUrl}/admin/${username}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete admin with username: ${username}`);
    }
  } catch (error) {
    console.error(`Error deleting admin (${username}):`, error);
    throw error;
  }
}
