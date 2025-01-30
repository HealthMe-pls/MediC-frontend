"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchMapDetail, MapDetail } from "../utility/maps";
import Header from "./layouts/Header";
import Shoplist from "./components/ShopList";
import HighlightBanner from "./components/HighlightBanner";
import Footer from "./layouts/Footer";
import Map from "./components/ShopMap";
import "../styles/global.css";
import "./globals.css";
import { fetchShopCategory, ShopCategory } from "@/utility/shopcate";


export default function Home() {
  const [marketMaps, setMarketMaps] = useState<MapDetail[]>([]); // State for market maps
  const [shopCategory, setCategory] = useState<ShopCategory[]>([]);
  const [selectedCate, setSelectedCate] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [tempCate, setTempCate] = useState(selectedCate);

  // Fetch market map data on component mount
  useEffect(() => {
    fetchMapDetail()
      .then((data) => setMarketMaps(data))
      .catch((error) => console.error("Error fetching market maps:", error));
  }, []);

  useEffect(() => {
    fetchShopCategory()
      .then((data) => setCategory(data))
      .catch((error) => console.error("Error fetching shopcate:", error));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCate = Number(event.target.value); // Convert value to a number
    setSelectedCate(selectedCate);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    console.log("Selected Category:", selectedCate);
    setModalOpen(false);
  };
  const handleCategoryClick = (id: number) => {
    setSelectedCate(id);
  };

  return (
    <div className="h-screen flex flex-col font-lexend">
      <Header />

      {/* Content Section */}

      <main className="flex-1 overflow-auto p-6 bg-[#FFF7EB]">
        {/* Filter Button */}
        <div className="mb-6 mt-2">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Search..."
            />
          </div>

          {/* Filter Button */}
          <div className="flex justify-end">
            <button
              className="bg-[#FFFFFF] w-[89px] h-[35px] px-4 text-[#929292] text-light rounded-[30px] flex items-center"
              onClick={toggleModal}
            >
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 mr-[54x]"
              >
                <path
                  d="M17.0156 0.869521C16.9194 0.647264 16.76 0.45819 16.5572 0.325814C16.3544 0.193438 16.1172 0.123601 15.875 0.12499H2.12498C1.88305 0.125466 1.64646 0.196138 1.4439 0.328432C1.24135 0.460726 1.08154 0.648957 0.98386 0.87029C0.886179 1.09162 0.854826 1.33655 0.893604 1.57535C0.932382 1.81415 1.03963 2.03656 1.20232 2.21561L1.20857 2.22265L6.49998 7.87265V13.875C6.49993 14.1012 6.56127 14.3232 6.67747 14.5173C6.79368 14.7114 6.96038 14.8704 7.15981 14.9772C7.35924 15.084 7.58392 15.1347 7.8099 15.1238C8.03587 15.113 8.25466 15.041 8.44295 14.9156L10.9429 13.2484C11.1143 13.1343 11.2548 12.9795 11.352 12.798C11.4492 12.6165 11.5 12.4137 11.5 12.2078V7.87265L16.7922 2.22265L16.7984 2.21561C16.9628 2.03738 17.0711 1.81467 17.1097 1.57528C17.1484 1.33589 17.1156 1.09042 17.0156 0.869521ZM10.4203 7.20155C10.3122 7.31618 10.2513 7.46742 10.25 7.62499V12.2078L7.74998 13.875V7.62499C7.75003 7.46628 7.6897 7.3135 7.58123 7.19765L2.12498 1.37499H15.875L10.4203 7.20155Z"
                  fill="#929292"
                />
              </svg>
              <p className="text-[18px] font-light flex items-center">Filter</p>
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
              <h2 className="text-[18px]-[#4C4343] mb-4">
                Select your preferred category
              </h2>

              {/* ตัวเลือกแบบปุ่ม */}
              <div className="space-y-4 mb-6">
                {/* ตัวเลือก All */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    className="form-radio h-5 w-5 checked:bg-[#4C4343] checked:ring-[#4C4343] focus:ring-[#4C4343]"
                    checked={tempCate === 0}
                    onChange={() => setTempCate(0)} // เปลี่ยนค่า tempCate แทน
                  />
                  <span className="text-gray-800">All</span>
                </label>

                {/* ตัวเลือกจาก shopCategory */}
                {shopCategory.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      className="form-radio h-5 w-5 checked:bg-[#4C4343] checked:ring-[#4C4343] focus:ring-[#4C4343]"
                      checked={tempCate === category.id}
                      onChange={() => setTempCate(category.id)} // เปลี่ยนค่า tempCate แทน
                    />
                    <span className="text-gray-800">{category.name}</span>
                  </label>
                ))}
              </div>
              {/* ปุ่มยืนยันและปิด Modal */}
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={closeModal} // ไม่อัปเดต selectedCate
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    setSelectedCate(tempCate); // อัปเดตค่าหลักเมื่อกด Submit
                    closeModal();
                  }}
                  disabled={tempCate === null}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="sm:hidden">
          <Map selectedCate={selectedCate}></Map>
        </div>
        <div>
          <HighlightBanner />
        </div>
        {/*ShopList*/}
        <div className="mt-6 sm:hidden">
          <Shoplist label="" onChange={handleChange} id={selectedCate} />
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
