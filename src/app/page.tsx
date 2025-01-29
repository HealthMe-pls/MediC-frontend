"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { fetchMapDetail, MapDetail } from "../utility/maps";
import Header from "./layouts/Header";
import Shoplist from "./components/ShopList";
import HighlightBanner from "./components/HighlightBanner";
import Footer from "./layouts/Footer";
import Map from "./components/ShopMap";
import SearchBar from "./components/SearchBar";
import "../styles/global.css";
import "./globals.css";
import Mapguide from "../../public/assets/MapGuide.gif";
import { fetchShopCategory, ShopCategory } from "@/utility/shopcate";
import Filter from "./components/Filter";
import Shopside from "./components/ShopSide";

export default function Home() {
  const [marketMaps, setMarketMaps] = useState<MapDetail[]>([]); // State for market maps
  const [shopCategory, setCategory] = useState<ShopCategory[]>([]);
  const [selectedCate, setSelectedCate] = useState<number>(0);
  const [matchShopID, setMatchShopID] = useState<number>(0);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  const shopListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchShopID !== 0) {
      setTimeout(() => {
        // Smooth scroll to the element referenced by shopListRef
        shopListRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest", // optional: adjust the horizontal alignment if needed
        });

        // Scroll to the position 500px above the bottom
        window.scrollTo({
          top: 850,
          behavior: "smooth", // Use smooth scrolling for window scroll as well
        });
      }, 300); // Increased delay for smoother transition
    }
  }, [matchShopID]);

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

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCate(categoryId); // อัปเดต selectedCate
  };

  return (
    <div className="flex flex-col font-lexend">
      <Header />

      {/* Content Section */}

      <main className="flex-1 overflow-auto p-6 bg-[#FFF7EB]">
        {/* Filter Button */}

        <h2 className="text-[25px] text-[#4C4343] mb-4 text-center sm:hidden">
          Market Map
        </h2>
        <div className="mb-6 mt-2 sm:hidden">
          {/* Search Bar */}
          <div>
            <SearchBar
              setSelectedCate={setSelectedCate}
              setMatchShopID={setMatchShopID}
            />
          </div>

          {/* Filter Button */}
          <Filter
            shopCategory={shopCategory}
            selectedCate={selectedCate}
            onSelectCategory={handleCategorySelect} // ส่งฟังก์ชันให้ Filter
            setMatchShopID={setMatchShopID}
          />
        </div>

        <div className="sm:flex hidden w-full gap-4 flex-wrap justify-center">
  {/* Map Section */}
  <div className="w-[600px] min-w-[600px] flex justify-center">
    <Map
      selectedCate={selectedCate}
      setSelectedBlock={setSelectedBlock}
    />
  </div>

<<<<<<< HEAD
  {/* Conditional Rendering for ShopSide or GIF */}
  <div className="w-[570px] min-w-[500px] flex justify-center flex-wrap">
    {!selectedBlock ? (
      <img
        src="../assets/Mapguide.gif"
        alt="GIF"
        className="w-full h-auto max-h-[570px] object-contain mapguide-hidden"
      />
    ) : (
      <Shopside blockName={selectedBlock} />
    )}
  </div>
</div>

<div className="sm:hidden block flex justify-center">
  <Map
    selectedCate={selectedCate}
    setSelectedBlock={setSelectedBlock}
  />
</div>
=======
          <div className="w-[570px] min-w-[500px] flex justify-center">
            {!selectedBlock && (
              <img
                src="../assets/Mapguide.gif"
                alt="GIF"
                className="w-full h-auto max-h-[570px] object-contain mapguide-hidden"
              />
            )}
          </div>
          <div className="z-10 shoplistformmap mapguide-hidden">
            <div className="absolute">
              <SearchBar
                setSelectedCate={setSelectedCate}
                setMatchShopID={setMatchShopID}
              />
            </div>
            <div className="mt-20 h-[100%]">
              <Shopside blockName={selectedBlock} />
            </div>
          </div>

          {/* <Shopside blockName={selectedBlock} /> */}
        </div>

        <div className="sm:hidden block">
          <Map
            selectedCate={selectedCate}
            setSelectedBlock={setSelectedBlock}
          />
        </div>
>>>>>>> d66710082bf223d09c6256efd020ee892e88b500

        <div className="mt-6 sm:hidden ref={shopListRef}">
          <Shoplist
            label=""
            onCateChange={handleChange}
            Cateid={selectedCate}
            setMatchShopID={setMatchShopID}
            matchShop={matchShopID}
          />
        </div>

        <div>
          <HighlightBanner />
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
