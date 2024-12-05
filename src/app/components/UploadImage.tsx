"use client";

import { useState } from "react";
import { uploadImage } from "../../utility/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"; // Fallback for local development

export default function UploadImage({ patientID }: { patientID: number }) {
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
      const uploadedPath = await uploadImage(file, patientID);
      console.log(uploadedPath);
      const fullImageUrl = `${API_BASE_URL}/upload/${uploadedPath}`;
      console.log(fullImageUrl);
      setUploadedImageUrl(fullImageUrl);
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
