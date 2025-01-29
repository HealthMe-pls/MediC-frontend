"use client";

import { useState, useEffect, useRef } from "react";
import { fetchWorkshops, Workshop } from "../../utility/workshop";
import Link from "next/link";

const HighlightBanner = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Tracks the currently centered workshop index
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const autoSlideInterval = 3000; // Auto-slide every 3 seconds
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Fetch workshops
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

  // Auto-slide functionality with hover pause
  useEffect(() => {
    if (workshops.length > 0 && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === workshops.length - 1 ? 0 : prevIndex + 1
        );
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [workshops, currentIndex, isHovered]);

  // Update carousel position when currentIndex changes
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 0; // Width of a single card
      const gap =
        parseInt(
          window.getComputedStyle(carouselRef.current).gap, // Get the gap from CSS
          10
        ) || 0; // Fallback to 0 if gap is not defined
      const scrollOffset = currentIndex * (cardWidth + gap); // Scroll by one card + gap

      carouselRef.current.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === workshops.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? workshops.length - 1 : prev - 1));
  };

  if (loading) return <div>Loading workshops...</div>;
  if (error) return <div>Error loading workshops: {error}</div>;

  return (
    <div
      className="font-lexend bg-[#FFF7EB] border-[1px] rounded-lg border-black py-4 
    text-center text-black mb-6 p-5 aspect-[15/4] w-full mx-auto"
      onMouseEnter={() => {
        console.log("Mouse entered"); // Debug log
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        console.log("Mouse left"); // Debug log
        setIsHovered(false);
      }}
    >
      <h2 className="text-xl md:text-2xl">Highlight Workshop and Events</h2>
      <div className="relative w-full mt-4">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
          aria-label="Previous workshop"
        >
          -
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
          aria-label="Next workshop"
        >
          +
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex overflow-hidden scroll-snap-x-mandatory scroll-snap-align-center gap-4"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {workshops.map((workshop, index) => (
            <div
              key={workshop.id}
              className={`relative flex-shrink-0 transition-opacity duration-500
                md:w-1/3 w-full flex-shrink-0 w-full md:w-1/3 bg-white shadow-lg rounded-lg 
              aspect-[10/10] max-w-[400px] mx-auto
                ${
                  index === currentIndex
                    ? "opacity-100 scale-100" // Show full card on iPhone size
                    : "opacity-50 scale-95 -translate-x-4 md:opacity-100 md:scale-100 md:translate-x-0" // Peek effect only on small screens
                }`}
              style={{
                scrollSnapAlign: "center", // Ensure cards snap to the center
              }}
            >
              {/* Workshop Card */}
              <div className="relative">
                <div className="block aspect-w-2 aspect-h-3 md:aspect-w-20 md:aspect-h-30">
                  {workshop.photos?.length ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/${workshop.photos[0]?.pathfile}`}
                      alt={workshop.name}
                      className="w-full h-full object-cover aspect-[10/10] max-w-[200px] mx-auto"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center aspect-[10/10] max-w-[200px] mx-auto">
                      No Image Available
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg truncate">{workshop.name}</h3>
                <Link href={`/workshops/${workshop.id}`}>
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
