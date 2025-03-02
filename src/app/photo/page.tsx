"use client";

import { useState } from "react";
import UploadImage from "@/app/components/upload";

export default function UploadPage() {
  const [uploadType, setUploadType] = useState("");
  const [uploadID, setUploadID] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadType(event.target.value);
  };

  const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadID(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (!uploadType || !uploadID || uploadID <= 0) {
      alert("Please enter a valid upload type and ID.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload Image</h1>

      <label className="block mb-2">
        Upload Type (workshop, shopadmin, shopen, menuadmin, menuen):
        <input
          type="text"
          value={uploadType}
          onChange={handleTypeChange}
          placeholder="Enter upload type"
          className="w-full p-2 border rounded-md"
        />
      </label>

      <label className="block mb-2">
        Upload ID:
        <input
          type="number"
          value={uploadID || ""}
          onChange={handleIDChange}
          placeholder="Enter ID"
          className="w-full p-2 border rounded-md"
        />
      </label>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2"
      >
        Submit
      </button>

      {submitted && uploadID && (
        <div className="mt-4">
          <UploadImage uploadType={uploadType} uploadID={uploadID} />
        </div>
      )}
    </div>
  );
}
