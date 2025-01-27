"use client";

import { useState, useEffect, useRef } from "react";
import { fetchWorkshops, Workshop } from "../../utility/workshop";
import Link from "next/link";

const HighlightBanner = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Tracks the first visible workshop index

  const autoSlideInterval = 3000; // Auto-slide every 3 seconds
  const visibleWorkshops = 3; // Number of workshops to show in the viewport
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchWorkshops()
      .then((data) => {
        setWorkshops(data || []); // Fallback to an empty array if no data
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Auto-slide functionality
    if (workshops.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === workshops.length - 1 ? 0 : prevIndex + 1
        );
      }, autoSlideInterval);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [workshops]);

  useEffect(() => {
    // Update carousel position when currentIndex changes
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth / visibleWorkshops; // Adjust for 3 cards
      carouselRef.current.scrollTo({
        left: currentIndex * slideWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  if (loading) return <div>Loading workshops...</div>;
  if (error) return <div>Error loading workshops: {error}</div>;

  return (
    <div className="font-lexend bg-[#FFF7EB] border-[1px] rounded-lg border-black py-4 text-center text-black mb-6">
      <h2 className="text-xl md:text-2xl">Highlight Workshop and Events</h2>
      <div className="relative w-full mt-4">
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex overflow-hidden "
          style={{
            scrollBehavior: "smooth",
            display: "flex",
            gap: "1rem", // Add space between slides
          }}
        >
          {workshops.map((workshop, index) => (
            <div
              key={workshop.id}
              className="flex-shrink-0 w-1/3 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Workshop Card */}
              <div className="relative">
                <div className="block aspect-w-2 aspect-h-3 md:aspect-w-20 md:aspect-h-30">
                  {workshop.photos?.length ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/${workshop.photos[0]?.pathfile}`}
                      alt={workshop.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      No Image Available
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg truncate">{workshop.name}</h3>
                <Link href={`/workshop/${workshop.id}`}>
                  <button className="mt-2 px-4 py-2 bg-[#52A794] text-white rounded-md hover:bg-blue-600">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          {workshops.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-[#52A794]"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to workshop ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightBanner;
