"use client";

import { useState, useEffect, useRef } from "react";
import { fetchWorkshops, Workshop } from "../../utility/workshop";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HighlightBanner = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const autoSlideInterval = 3000;
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Fetch workshops
  useEffect(() => {
    fetchWorkshops()
      .then((data) => {
        setWorkshops(data || []);
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
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
      const gap =
        parseInt(window.getComputedStyle(carouselRef.current).gap, 10) || 0;
      const scrollOffset = currentIndex * (cardWidth + gap);

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

  // Function to store the last page and navigate
  const handleNavigation = (id: number) => {
    sessionStorage.setItem("previousPage", window.location.pathname);
    router.push(`/workshops/${id}`);
  };

  if (loading) return <div>Loading workshops...</div>;
  if (error) return <div>Error loading workshops: {error}</div>;

  return (
    <div
      className="font-lexend bg-[#FFF7EB] rounded-lg py-4 
      text-center text-black mb-6 p-5 aspect-[15/4] w-full mx-auto "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="md:text-[20px] text-left sm:text-[16px]">
        Highlight Workshop and Events
      </h2>
      <div className="relative w-full mt-4">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
          aria-label="Previous workshop"
        >
          ◀
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
          aria-label="Next workshop"
        >
          ▶
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex overflow-hidden scroll-snap-x-mandatory scroll-snap-align-center gap-4  "
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="relative flex-shrink-0 transition-opacity duration-500
              md:w-1/3 w-full flex-shrink-0 w-full md:w-1/3 bg-white shadow-lg rounded-lg 
              aspect-[21/26] max-w-[210px] max-h-[260px] mx-auto hover:border hover:border-gray-300"
              style={{
                scrollSnapAlign: "center",
              }}
            >
              {/* Workshop Card */}
              <button
                onClick={() => handleNavigation(workshop.id)}
                className="mt-2 px-4 py-2 rounded-md "
              >
                <div className="relative w-full max-w-[180px] mx-auto mt-[15px] flex items-center justify-center">
                  <div className="w-full aspect-[10/10] flex items-center justify-center">
                    {workshop.photos?.length ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/${workshop.photos[0]?.pathfile}`}
                        alt={workshop.name}
                        className="w-full h-full object-cover rounded-md"
                        onLoad={(e) => {
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.style.setProperty(
                              "min-height",
                              `${e.currentTarget.clientHeight}px`
                            );
                            parent.style.setProperty(
                              "min-width",
                              `${e.currentTarget.clientWidth}px`
                            );
                          }
                        }}
                      />
                    ) : (
                      <div className="bg-gray-300 flex items-center justify-center rounded-md min-h-[180px] min-w-[180px]">
                        No Image Available
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg truncate">{workshop.name}</h3>
                </div>
              </button>
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
