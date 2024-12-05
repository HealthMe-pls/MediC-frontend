const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"; // Fallback for local development

export const uploadImage = async (file: File, id: number): Promise<string> => {
  if (!file) throw new Error("File is required to upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/patient/${id}/images`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return response.text(); // Assuming the API returns the file path or a success message
};

export const fetchPatientImages = async (
  id: number
): Promise<Array<{ ID: number; PatientID: number; ImagePath: string }>> => {
  const response = await fetch(`${API_BASE_URL}/patient/${id}/images`);

  if (!response.ok) {
    throw new Error("Failed to fetch patient images");
  }

  const data = await response.json();
  console.log(data);
  return data; // This will be an array of image objects
};
