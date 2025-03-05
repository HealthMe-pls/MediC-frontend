"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { fetchWorkshops, Workshop } from "../../utility/workshop";
import { useRouter } from "next/navigation";

const HighlightBanner = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [workshopsPerView, setWorkshopsPerView] = useState<number>(5);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const autoSlideInterval = 3000;

  // Dynamically adjust number of visible workshops based on screen size
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1600) {
        setWorkshopsPerView(6);
      } else if (window.innerWidth >= 1210) {
        setWorkshopsPerView(5);
      } else if (window.innerWidth >= 1030) {
        setWorkshopsPerView(4);
      } else if (window.innerWidth >= 768) {
        setWorkshopsPerView(3);
      } else if (window.innerWidth >= 620) {
        setWorkshopsPerView(2);
      } else {
        setWorkshopsPerView(1);
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

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

  // Auto-slide logic
  useEffect(() => {
    if (workshops.length > 0 && !isHovered) {
      const interval = setInterval(() => {
        handleNext();
      }, autoSlideInterval);
      return () => clearInterval(interval);
    }
  }, [workshops, isHovered]);

  // Update carousel scroll position
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
      const gap =
        parseInt(window.getComputedStyle(carouselRef.current).gap, 8) || 0;
      const scrollOffset = currentIndex * (cardWidth + gap);
      carouselRef.current.scrollTo({ left: scrollOffset, behavior: "smooth" });
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= workshops.length - workshopsPerView ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? workshops.length - workshopsPerView : prev - 1
    );
  };

  const handleNavigation = (id: number) => {
    sessionStorage.setItem("previousPage", window.location.pathname);
    router.push(`/workshops/${id}`);
  };

  if (loading) return <div>Loading workshops...</div>;
  if (error) return <div>Error loading workshops: {error}</div>;

  return (
    <div
      className="font-lexend bg-[#FFF7EB] rounded-lg py-4 text-center text-black mb-6 p-5 aspect-[15/4] w-full mx-auto"
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
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all ${
            currentIndex === 0 ? "hidden" : ""
          }`}
          aria-label="Previous workshop"
        >
          &lt;
        </button>

        <button
          onClick={handleNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all ${
            currentIndex >= workshops.length - workshopsPerView ? "hidden" : ""
          }`}
          aria-label="Next workshop"
        >
          &gt;
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className={`flex overflow-hidden gap-4 ${
            workshops.length < workshopsPerView
              ? "justify-start"
              : "scroll-snap-x-mandatory"
          }`}
        >
          {workshops.map((workshop, index) => (
            <div
              key={workshop.id}
              className={`relative flex-shrink-0 bg-white shadow-lg rounded-lg aspect-[21/30] max-w-[210px] max-h-[300px] hover:border hover:border-gray-300 ${
                workshops.length < workshopsPerView ? "mx-3" : "mx-auto"
              }`}
              style={{
                display:
                  index >= currentIndex &&
                  index < currentIndex + workshopsPerView
                    ? "block"
                    : "none",
              }}
            >
              <button
                onClick={() => handleNavigation(workshop.id)}
                className="mt-2 px-4 py-2 rounded-md"
              >
                <div className="relative w-full max-w-[180px] mx-auto mt-[15px] flex items-center justify-center">
                  <div className="w-full aspect-[10/10] flex items-center justify-center">
                    {workshop.photos?.length ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${workshop.photos[0]?.pathfile}`}
                        alt={workshop.name}
                        width={80}
                        height={80}
                        className="object-cover rounded-md w-full h-full max-w-[180px] max-h-[180px]"
                      />
                    ) : (
                      <div className="bg-gray-300 flex items-center justify-center rounded-md min-h-[135px] min-w-[135px]">
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
          {Array.from({
            length: Math.ceil(workshops.length - workshopsPerView + 1),
          }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === Math.floor(currentIndex)
                  ? "bg-[#52A794]"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to workshop set ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightBanner;
