"use client";

import { useState } from "react";
import { Photo } from "@/utility/photo"; // Adjust import path if needed
import {
  uploadPhotoWorkshops,
  uploadPhotoShopByAdmin,
  uploadPhotoShopByEntrepreneur,
  uploadPhotoMenuByAdmin,
  uploadPhotoMenuByEntrepreneur,
} from "@/utility/photo"; // Adjust import path if needed

const uploadFunctions: Record<
  string,
  (file: File, id: number) => Promise<Photo>
> = {
  workshop: uploadPhotoWorkshops,
  shopadmin: uploadPhotoShopByAdmin,
  shopen: uploadPhotoShopByEntrepreneur,
  menuadmin: uploadPhotoMenuByAdmin,
  menuen: uploadPhotoMenuByEntrepreneur,
};

const allowedUploadTypes = Object.keys(uploadFunctions); // ["workshop", "shopadmin", "shopen", "menuadmin", "menuen"]

interface UploadImageProps {
  uploadType: string;
  uploadID: number;
}

export default function UploadImage({
  uploadType,
  uploadID,
}: UploadImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file.");
      return;
    }

    if (!allowedUploadTypes.includes(uploadType)) {
      setMessage("❌ Invalid upload type.");
      return;
    }

    try {
      setUploading(true);
      const uploadFunction = uploadFunctions[uploadType]; // Get the correct function
      const uploadedPhoto = await uploadFunction(file, uploadID);
      setMessage(
        `✅ Image uploaded successfully! Path: ${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${uploadedPhoto.path_file}`
      );
    } catch (error) {
      console.error(error);
      setMessage("❌ Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Upload Image</h2>

      {/* Show the validated type */}
      <p
        className={`mb-2 ${
          allowedUploadTypes.includes(uploadType)
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        Upload Type: {uploadType}{" "}
        {allowedUploadTypes.includes(uploadType) ? "✅" : "❌"}
      </p>

      {/* File input */}
      <label className="block mb-2">
        Select Image:
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-md"
        />
      </label>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>

      {/* Message */}
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
