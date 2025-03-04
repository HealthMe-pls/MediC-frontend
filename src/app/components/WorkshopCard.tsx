"use client";

import React from "react";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";

import { Tag, Globe } from "lucide-react";
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

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  const router = useRouter();

  // Function to store the last page and navigate
  const handleNavigation = () => {
    sessionStorage.setItem("previousPage", window.location.pathname); // Save previous page
    router.push(`/workshops/${workshop.id}`);
  };

  return (
    <div
      key={workshop.id}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition w-[300px] h-[400px]"
    >
      {/* Image Section */}
      <div className="mt-4">
        {workshop.photos?.length ? (
          (() => {
            // const imageUrl = `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${workshop.photos[0]?.pathfile}`;
            // console.log(imageUrl); // Console log URL ของรูปภาพ
            return (
              <div className="max-w-[350px] max-h-[350px] object-cover transition-all duration-500 rounded-[10px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${workshop.photos[0]?.pathfile}`}
                  alt={`workshop image`}
                  width={350}
                  height={350}
                  className="rounded-[10px]"
                />
              </div>
            );
          })()
        ) : (
          <div className="w-full h-[200px] bg-gray-300 flex items-center justify-center text-gray-600 rounded-[10px]">
            No Image Available
          </div>
        )}
      </div>
      <p className="text-[28px]">{workshop.name || "No Title"}</p>

      <p className="text-gray-500 mt-2 flex items-center">
        <Tag className="w-4 h-4 mr-2" />
        {workshop.price !== null
          ? `${workshop.price.toFixed(2)} Baht`
          : "Price not available"}
      </p>

      <p className="text-gray-500 mt-1 flex items-center">
        <Globe className="w-4 h-4 mr-2" />
        Language: {workshop.language || "N/A"}
      </p>

      <div className="mt-4 flex justify-centerx">
        <button
          onClick={handleNavigation}
          className="w-[100%] h-[30px] rounded-[15px] bg-[#F0F0F0] font-light text-[14px]"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default WorkshopCard;
