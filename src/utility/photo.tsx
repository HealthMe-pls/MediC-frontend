import axios from "axios";

export interface Photo {
  path_file: string;
  photo_id: number;
  is_public: boolean;
}

export const uploadPhotoWorkshops = async (file: File, id: number): Promise<Photo> => {
  if (!file) throw new Error("File is required to upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post<Photo>(
      `/api/photo/workshop/${id}`, // Adjust the API endpoint as needed
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};


export const uploadPhotoShopByEntrepreneur = async (file: File, id: number): Promise<Photo> => {
  if (!file) throw new Error("File is required to upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post<Photo>(
      `/api/photo/shop/entrepreneur/${id}`, // Adjust the API endpoint as needed
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

export const uploadPhotoShopByAdmin = async (file: File, id: number): Promise<Photo> => {
  if (!file) throw new Error("File is required to upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post<Photo>(
      `/api/photo/shop/admin/${id}`, // Adjust the API endpoint as needed
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

export const uploadPhotoMenuByEntrepreneur = async (file: File, id: number): Promise<Photo> => {
  if (!file) throw new Error("File is required to upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post<Photo>(
      `/api/photo/menu/entrepreneur/${id}`, // Adjust the API endpoint as needed
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

export const uploadPhotoMenuByAdmin = async (file: File, id: number): Promise<Photo> => {
  if (!file) throw new Error("File is required to upload an image.");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post<Photo>(
      `/api/photo/menu/admin/${id}`, // Adjust the API endpoint as needed
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

export const deletePhoto = async (photoId: number): Promise<void> => {
  if (!photoId) throw new Error("Photo ID is required to delete an image.");

  try {
    await axios.delete(`/api/photo/${photoId}`); // Adjust API endpoint as needed
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
};
