"use client";

import React from "react";
import { format } from "date-fns";
import Link from "next/link";
// Define Workshop interface for type safety
interface Workshop {
  id: number;
  name: string | null;
  description: string | null;
  instructor: string | null;
  language: string | null;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  price: number | null;
  photos: { photo_id: number; pathfile: string }[] | null;
}

// Utility function for formatting date
const formatFullDate = (isoString: string | null): string => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return format(date, "EEEE dd MMMM yyyy");
};

const formatTime = (isoString: string | null): string => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return format(date, "HH:mm");
};

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  return (
    <div
      key={workshop.id}
      className="bg-white rounded shadow-md p-4 hover:shadow-lg transition"
    >
      <h2 className="text-xl font-semibold">{workshop.name || "No Title"}</h2>
      <p className="text-gray-700 mt-2">
        {workshop.description || "No description available."}
      </p>
      <p className="text-gray-500 mt-2">
        Instructor: {workshop.instructor || "N/A"}
      </p>
      <p className="text-gray-500 mt-1">
        Language: {workshop.language || "N/A"}
      </p>
      <p className="text-gray-500 mt-1">
        Date: {formatFullDate(workshop.date)} ({formatTime(workshop.start_time)}{" "}
        - {formatTime(workshop.end_time)})
      </p>
      <p className="text-blue-600 font-bold mt-2">
        {workshop.price !== null
          ? `$${workshop.price.toFixed(2)}`
          : "Price not available"}
      </p>
      <div className="mt-4">
        {workshop.photos?.length ? (
          workshop.photos.map((photo) => (
            <img
              key={photo.photo_id}
              src={photo.pathfile}
              alt={`Workshop ${workshop.name || "Image"}`}
              className="w-full h-32 object-cover rounded mb-2"
            />
          ))
        ) : (
          <div className="w-full h-32 object-cover rounded bg-gray-200 flex items-center justify-center">
            <span>No Images Available</span>
          </div>
        )}
      </div>

      <Link href={`/workshop/${workshop.id}`}>
        <div className="mt-4 flex justify-center pb-2">
          <button className="w-[100%] h-[30px] rounded-[15px] bg-[#F0F0F0] font-light text-[14px]">
            See More
          </button>
        </div>
      </Link>
    </div>
  );
};

export default WorkshopCard;
