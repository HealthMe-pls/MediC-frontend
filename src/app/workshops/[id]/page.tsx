"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchWorkshopsById, Workshop } from "@/utility/workshop";
import { format } from "date-fns";
import Footer from "@/app/layouts/Footer";
import BackButton from "@/app/components/BackButton";
import ImageBanner from "@/app/components/ImageBanner";
const formatDate = (isoString: string | null): string => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return format(date, "EEEE dd MMMM yyyy");
};

const formatTime = (isoString: string | null): string => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return format(date, "HH:mm");
};

const WorkshopDetail = () => {
  const { id } = useParams();
  const [workshopDetail, setWorkshopDetail] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await fetchWorkshopsById(Number(id));
          setWorkshopDetail(data);
        } catch (error) {
          setError("Failed to fetch workshop details");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="font-lexend text-[#4C4343] bg-[#FFF7EB] min-h-screen flex flex-col justify-between">
      <BackButton href="./" />
      <div className="">
        {workshopDetail ? (
          <div className=" font-lexend text-[#4C4343]  ">
            <div className="p-4 mt-[55px]">
              {workshopDetail.photos?.length > 0 && (
                <div className="">
                  <ImageBanner
                    photos={workshopDetail.photos}
                    basePath="http://127.0.0.1:3000/"
                  />
                </div>
              )}
            </div>
            <div className="mx-5">
              <h1 className="text-[21px] font-bold">{workshopDetail?.name}</h1>
              <p className="font-light">{workshopDetail?.language}</p>

              <p className="mt-4 font-light text-[14px]">
                &emsp;&emsp;{workshopDetail?.description}
              </p>

              <div className="text-[18px] font-regular flex items-center mt-5 mb-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8"
                    stroke="#4C4343"
                    strokeWidth="2"
                  />
                </svg>
                <p>Schedule</p>
              </div>
              <h2 className="text-xl font-semibold">
                {workshopDetail?.name || "No Title"}
              </h2>
              <p className="text-gray-700 mt-2">
                {workshopDetail?.description || "No description available."}
              </p>
              <p className="text-gray-500 mt-2">
                Instructor: {workshopDetail?.instructor || "N/A"}
              </p>
              <p className="text-gray-500 mt-1">
                Language: {workshopDetail?.language || "N/A"}
              </p>

              <ul className="text-[14px] font-light">
                <li>Date: {formatDate(workshopDetail?.date || "")}</li>
                <li>
                  Time: {formatTime(workshopDetail?.start_time || "")} -{" "}
                  {formatTime(workshopDetail?.end_time || "")}
                </li>
              </ul>

              <div className="text-[18px] font-regular flex items-center mt-5 mb-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <rect x="4" y="4" width="10" height="10" fill="#4C4343" />
                </svg>
                <p>Price</p>
              </div>
              <p className="text-[14px] font-light">
                {workshopDetail?.price} THB
              </p>
            </div>
          </div>
        ) : (
          <p> No shop details found</p>
        )}
      </div>
      <div className="flex flex-col justify-end ">
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetail;
