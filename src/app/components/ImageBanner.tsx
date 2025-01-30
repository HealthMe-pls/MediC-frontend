import React, { useState } from "react";

export interface Photo {
  pathfile: string;
  photo_id: number;
}

interface ImageBannerProps {
  photos: Photo[];
  basePath?: string;
}

// const NEXT_API = process.env.NEXT_URL;
// const NEXT_API = "http://127.0.0.1:3000";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImageBanner: React.FC<ImageBannerProps> = ({ photos, basePath = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // ฟังก์ชันเปลี่ยนไปยังภาพถัดไป
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  // ฟังก์ชันย้อนกลับไปยังภาพก่อนหน้า
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  // ฟังก์ชันจับการเริ่มสัมผัส
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  // ฟังก์ชันจับการเคลื่อนไหวของนิ้ว
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // ฟังก์ชันจับการสิ้นสุดการสัมผัส
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > 50) {
      // ปัดซ้าย (ไปภาพถัดไป)
      nextImage();
    } else if (distance < -50) {
      // ปัดขวา (ย้อนกลับ)
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="w-full relative">
      {/* รูปภาพ */}
      <div
        className="w-[350] h-[216px] overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {photos.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${process.env.GO_API_URL}/upload/${photos[currentIndex]?.pathfile}`}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500 rounded-[10px]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-500">No Images Available</p>
          </div>
        )}

        {/* พื้นที่กดด้านซ้าย */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full cursor-pointer"
          onClick={prevImage}
        ></div>

        {/* พื้นที่กดด้านขวา */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full cursor-pointer"
          onClick={nextImage}
        ></div>
      </div>

      {/* จุดสำหรับเปลี่ยนภาพ */}
      {photos.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`w-[10px] h-[10px] rounded-full ${
                currentIndex === index ? "bg-[#929292]" : "bg-[#D9D9D9]"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageBanner;
