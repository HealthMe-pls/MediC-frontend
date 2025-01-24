"use client";

import Link from "next/link";
// import CircularShops from "./components/CircularShops";
import { useEffect, useState } from "react";
import { fetchMapDetail, MapDetail } from "../utility/maps";
import Header from "./layouts/Header";
import Shoplist from "./components/ShopList";
import Footer from "./layouts/Footer";
import Map from "./components/ShopMap";
import "../styles/global.css";
import "./globals.css";
import { fetchShopCategory, ShopCategory } from "@/utility/shopcate";

export default function Home() {
  const [marketMaps, setMarketMaps] = useState<MapDetail[]>([]); // State for market maps
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [shopCategory, setCategory] = useState<ShopCategory[]>([]);
  const [selectedCate, setSelectedCate] = useState<number>(0);

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

  // const handleBlockClick = (blockId: number) => {
  //   setSelectedBlock(blockId);
  // };

  // const [innerShops, setInnerShops] = useState(8);
  // const [outerShops, setOuterShops] = useState(12);

  return (
    <div className="h-screen flex flex-col">
      <Header />

      {/* Content Section */}
      <main className="flex-1 overflow-auto p-6">
        {/* Highlight Banner */}
        <div className="bg-yellow-400 py-4 text-center text-black font-bold mb-6">
          <h2>Highlight Workshop - Special Offers this Week!</h2>
        </div>
        <Link href="/adminPage">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Go to Admin Page
          </button>
        </Link>

        {/* Search & Filter Section */}
        <div className="flex justify-between mb-6">
          <div className="flex-1 mr-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Search..."
            />
          </div>
          <div>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={selectedCate}
              onChange={handleChange}
            >
              <option value={0}>Select Filter</option>
              {shopCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {/* <p className="mt-4">
              Selected Category ID: {selectedCate !== 0 ? selectedCate : "None"}
            </p> */}
          </div>
        </div>

        <div className="sm:hidden">
          <Map selectedCate={selectedCate}></Map>
        </div>

        {/* Details of Selected Block */}
        {/* {selectedBlock && (
          <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
            <h3 className="text-2xl font-semibold mb-4">
              Shop of Block {selectedBlock}
            </h3>
            <p className="text-lg">
              {marketMaps.find((map) => map.block_id === selectedBlock)
                ?.shop_name || "No shop details available for this block."}
            </p>
          </div>
        )} */}

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
