export interface Patient {
  ID?: number;
  Name: string;
  Email: string;
  Age: number;
}

const NEXT_API = "http://localhost:3000";

// All patients
export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await fetch(`${NEXT_API}/api/patient`, {
    cache: "no-store", // Ensures fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return response.json();
};

// Fetch patient by ID
export const fetchPatientById = async (id: number): Promise<Patient> => {
  const response = await fetch(`${NEXT_API}/api/patient/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patient with ID: ${id}`);
  }

  console.log("fetch patients by id ok");

  return response.json();
};

export const createPatient = async (patient: Patient): Promise<void> => {
  if (!patient) {
    throw new Error("Patient data is required");
  }
  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);

  const response = await fetch(`${NEXT_API}/api/patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });
  console.log({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to create patient: ${errorData.message || response.statusText}`
    );
  }
};

// Delete patient by ID
export const deletePatientById = async (id?: number): Promise<void> => {
  const response = await fetch(`${NEXT_API}/api/patient/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete patient with ID: ${id}`);
  }
};
