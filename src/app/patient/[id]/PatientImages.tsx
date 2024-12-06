"use client";
import { useEffect, useState } from "react";
import { fetchPatientImages } from "../../../utility/image";
import UploadImage from "@/app/components/UploadImage";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"; // Fallback for local development

export default function PatientImages({ patientID }: { patientID: number }) {
  const [images, setImages] = useState<
    Array<{ ID: number; ImagePath: string }>
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchPatientImages(patientID);
        setImages(fetchedImages);
      } catch (err) {
        setError("Failed to fetch images");
        console.error(err);
      }
    };

    loadImages();
  }, [patientID]);

  return (
    <div>
      <UploadImage patientID={patientID} />
      <h2>Patient Images</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <img
            key={image.ID}
            src={`${API_BASE_URL}/upload/${image.ImagePath}`}
            alt={`Image ${image.ID}`}
            className="max-w-[100px] h-auto"
          />
        ))}
      </div>
    </div>
  );
}
