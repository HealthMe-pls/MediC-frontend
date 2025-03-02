"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadPhotoWorkshops } from "@/utility/photoWorkshops";
export default function UploadImage() {
    const [file, setFile] = useState<File | null>(null);
    const [workshopID, setWorkshopID] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [photo, setPhoto] = useState<{ path_file: string; photo_id: number; is_public: boolean } | null>(null);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setFile(event.target.files[0]);
      }
    };
  
    const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWorkshopID(Number(event.target.value));
    };
  
    const handleUpload = async () => {
      if (!file) {
        setMessage("Please select a file.");
        return;
      }
      if (!workshopID) {
        setMessage("Please enter a valid Workshop ID.");
        return;
      }
  
      try {
        setUploading(true);
        const uploadedPhoto = await uploadPhotoWorkshops(file, workshopID); // Send Workshop ID
        setPhoto(uploadedPhoto);
        setMessage("Image uploaded successfully!");
      } catch (error) {
        setMessage("Error uploading image.");
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <div className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Upload Workshop Image</h2>
        
        <label className="block mb-2">
          Workshop ID:
          <input
            type="number"
            value={workshopID || ""}
            onChange={handleIDChange}
            placeholder="Enter Workshop ID"
            className="w-full p-2 border rounded-md"
          />
        </label>
  
        <label className="block mb-2">
          Select Image:
          <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
        </label>
  
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
  
        {message && <p className="mt-2 text-red-500">{message}</p>}
  
        {photo && (
          <div className="mt-4">
            <p>Uploaded Image:</p>
            <img src={`/uploads/${photo.path_file}`} alt="Uploaded" className="max-w-[100px] h-auto" />
          </div>
        )}
      </div>
    );
  } 