export interface Patient {
  ID: number;
  Name: string;
  Email: string;
  Age: number;
}

// Base URL for API
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080"; // Fallback for local development

// All patients
export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await fetch(`${API_BASE_URL}/patient`, {
    cache: "no-store", // Ensures fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  // Transform the data to match the interface example code
  return response.json();
};

// Fetch patient by ID
export const fetchPatientById = async (id: number): Promise<Patient> => {
  const response = await fetch(`${API_BASE_URL}/patient/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patient with ID: ${id}`);
  }

  return response.json();
};

// Delete patient by ID
export const deletePatientById = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/patient/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete patient with ID: ${id}`);
  }
};
