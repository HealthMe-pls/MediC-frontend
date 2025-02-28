
export const uploadImage = async (file: File, id: number): Promise<string> => {
  if (!file) throw new Error("File is required to upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/patient/${id}/images`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return file.name;
};

