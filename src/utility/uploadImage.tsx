const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export const uploadImage = async (file: File): Promise<string> => {
  if (!file) throw new Error("File is required to upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return response.text(); // Assuming the API returns the file path or a success message
};

// `${process.env.API_BASE_URL}/patient/${id}/upload`, // อันนี้น่าจะได้ใช้จริง

// export const uploadImage = async (id: number, file: File): Promise<string> => {
//   if (!id) throw new Error("Patient ID is required to upload an image.");

//   const formData = new FormData();
//   formData.append("image", file);

//   //test upload image
//   const response = await fetch(`${process.env.API_BASE_URL}/upload`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error("Failed to upload image");
//   }

//   return response.text(); // Assuming the API returns a success message
// };
