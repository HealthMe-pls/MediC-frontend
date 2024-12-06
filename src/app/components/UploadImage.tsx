"use client";

import { useState } from "react";
import { uploadImage } from "../../utility/image";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Fallback for local development

export default function UploadImage({ patientID }: { patientID: number }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setError(null);

    try {
      // Upload image and get the returned filename (or image path)
      const uploadedFilename = await uploadImage(file, patientID);
      console.log("Uploaded filename:", uploadedFilename);

      // Create the full image URL (e.g., assuming your backend serves images from a specific endpoint)
      const fullImageUrl = `${API_BASE_URL}/upload/${uploadedFilename}`;
      console.log("Full image URL:", fullImageUrl);

      // Set the uploaded image URL to display it
      setUploadedImageUrl(fullImageUrl);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Failed to upload image.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Upload Image</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Upload
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {uploadedImageUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Uploaded Image:</h2>
          <img src={uploadedImageUrl} alt="Uploaded" className="mt-2" />
        </div>
      )}
    </div>
  );
}
