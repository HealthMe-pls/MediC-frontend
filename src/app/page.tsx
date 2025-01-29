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
  const [selectedBlock, setSelectedBlock] = useState<string | "">("");

  const shopListRef = useRef<HTMLDivElement>(null);

  const [showGif, setShowGif] = useState(true); 
  
  const handleCloseGif = () => {
    setShowGif(false);  // ปิดการแสดง GIF
  };

  const handleSearchChange = (newSelectedCate) => {
    setSelectedCate(newSelectedCate);
  };


  useEffect(() => {
    if (matchShopID !== 0) {
      setTimeout(() => {
        // Smooth scroll to the element referenced by shopListRef
        shopListRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });

        window.scrollTo({
          top: 850,
          behavior: "smooth",
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
    setSelectedCate(categoryId);
  };

  useEffect(() => {
    console.log("selectedBlock:", selectedBlock);
    console.log("matchShopID:", matchShopID);
  }, [selectedBlock, matchShopID]);

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
              setSelectedCate={handleSearchChange}
              setMatchShopID={setMatchShopID}
            />
          </div>

          {/* Filter Button */}
          <Filter
            shopCategory={shopCategory}
            selectedCate={selectedCate}
            onSelectCategory={handleCategorySelect}
            setMatchShopID={setMatchShopID}
          />
        </div>

        <div className="sm:flex hidden w-full gap-32 flex-wrap justify-center">
  <div className="w-[600px] min-w-[600px] flex justify-center">
    <Map
      selectedCate={selectedCate}
      setSelectedBlock={setSelectedBlock}
    />
  </div>

  <div className="w-[570px] min-w-[500px] flex justify-center flex-wrap flex-col">
    <div className="w-full">
      <SearchBar
        setSelectedCate={setSelectedCate}
        setMatchShopID={setMatchShopID}
      />
    </div>

    <div className="w-full">
    {showGif && !selectedBlock ? (
        <div className="relative w-full">
          <img
            src="../assets/Mapguide.gif"
            alt="GIF"
            className="w-full h-auto max-h-[570px] object-contain mapguide-hidden"
          />
          <button
            onClick={handleCloseGif}
            className="absolute top-2 right-16 p-1 rounded-full mr-2 mt-2"
            aria-label="Close"
          >
            <span className="text-opacity-50 text-black text-[50px]">×</span>
          </button>
        </div>
      ) : (
        <Shopside 
          blockName={selectedBlock}
        />
      )}
    </div>
  </div>
</div>

<div className="sm:hidden block">
  <Map
    selectedCate={selectedCate}
    setSelectedBlock={setSelectedBlock}
  />
</div>

        <div className="mt-6 sm:hidden ref={shopListRef}">
          <Shoplist
            label=""
            onCateChange={handleSearchChange}
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
