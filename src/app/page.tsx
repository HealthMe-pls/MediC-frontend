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
import { fetchShopCategory, ShopCategory } from "@/utility/shopcate";
import Filter from "./components/Filter";

export default function Home() {
  const [marketMaps, setMarketMaps] = useState<MapDetail[]>([]); // State for market maps
  const [shopCategory, setCategory] = useState<ShopCategory[]>([]);
  const [selectedCate, setSelectedCate] = useState<number>(0);
  const [matchShopID, setMatchShopID] = useState<number>(0);

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

        // Smooth scroll to the bottom of the page but leave 210px space
        window.scrollTo({
          top: document.documentElement.scrollHeight, // Use document.documentElement.scrollHeight
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
        <div className="mb-6 mt-2">
          {/* Search Bar */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shop Search</h2>
            <SearchBar
              setSelectedCate={setSelectedCate}
              setMatchShopID={setMatchShopID}
            />
            <p className="mt-4">
              MatchShopID: {matchShopID !== 0 ? matchShopID : "None"}
            </p>
          </div>

          {/* Filter Button */}
          <Filter
            shopCategory={shopCategory}
            selectedCate={selectedCate}
            onSelectCategory={handleCategorySelect} // ส่งฟังก์ชันให้ Filter
            setMatchShopID={setMatchShopID}
          />
        </div>
        <div className="sm:hidden">
          <Map selectedCate={selectedCate}></Map>
        </div>

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
