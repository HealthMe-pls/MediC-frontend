"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchMapDetail, MapDetail } from "../utility/maps";
import SearchInput from "./components/SearchInput";
// import CircularShops from "./components/CircularShops";
import Footer from "./components/Footer";
import HighlightBanner from "./components/HighlightBanner";
import FilterSelect from "./components/FilterSelect";

export default function Home() {
  const [marketMaps, setMarketMaps] = useState<MapDetail[]>([]); // State for market maps
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  // Fetch market map data on component mount
  useEffect(() => {
    fetchMapDetail()
      .then((data) => setMarketMaps(data))
      .catch((error) => console.error("Error fetching market maps:", error));
  }, []);

  const handleBlockClick = (blockId: number) => {
    setSelectedBlock(blockId);
  };

  // const [innerShops, setInnerShops] = useState(8);
  // const [outerShops, setOuterShops] = useState(12);

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-3xl font-bold">Bamboo Family Market</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-lg">
            <button className="hover:text-gray-300">EN</button> |{" "}
            <button className="hover:text-gray-300">TH</button>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </div>
      </header>

      {/* Menu Drawer */}
      {isMenuOpen && (
        <div className="absolute top-0 right-0 bg-blue-600 p-4 w-48 h-full">
          <ul className="text-white space-y-4">
            <li>
              <Link href="/label1" className="hover:text-gray-300">
                Label 1
              </Link>
            </li>
            <li>
              <Link href="/label2" className="hover:text-gray-300">
                Label 2
              </Link>
            </li>
            <li>
              <Link href="/label3" className="hover:text-gray-300">
                Label 3
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Content Section */}
      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        {/* Highlight Banner */}
        <HighlightBanner />

        {/* Admin Page Button */}
        <Link href="/adminPage">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Go to Admin Page
          </button>
        </Link>

        {/* Search & Filter Section */}
        <div className="flex justify-between mb-6">
          <div className="flex-1 mr-4">
            <SearchInput />
          </div>
          <div className="flex-1 ml-4">
            <FilterSelect />
          </div>
        </div>

        {/* Market Map */}
        <div className="flex justify-center mb-6">
          <div className="relative w-72 h-72 rounded-full border-4 border-gray-500 overflow-hidden">
            <div
              className="absolute top-10 left-10 w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => handleBlockClick(1)}
            >
              Block 1
            </div>
            <div
              className="absolute top-10 right-10 w-16 h-16 bg-red-600 text-white flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => handleBlockClick(2)}
            >
              Block 2
            </div>
            <div
              className="absolute bottom-10 left-10 w-16 h-16 bg-green-600 text-white flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => handleBlockClick(3)}
            >
              Block 3
            </div>
            <div
              className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-600 text-white flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => handleBlockClick(4)}
            >
              Block 4
            </div>
          </div>
        </div>

        {/* <div>
        <h1>Shop Circle Layout</h1>
        <div>
          <label>
            Inner Shops:
            <input
              type="number"
              value={innerShops}
              onChange={(e) => setInnerShops(Number(e.target.value))}
              min="1"
            />
          </label>
          <label>
            Outer Shops:
            <input
              type="number"
              value={outerShops}
              onChange={(e) => setOuterShops(Number(e.target.value))}
              min="1"
            />
          </label>
        </div>
        <CircularShops innerShopCount={innerShops} outerShopCount={outerShops} />
      </div> */}

        {/* Details of Selected Block */}
        {selectedBlock && (
          <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
            <h3 className="text-2xl font-semibold mb-4">
              Shop of Block {selectedBlock}
            </h3>
            <p className="text-lg">
              {marketMaps.find((map) => map.block_id === selectedBlock)
                ?.shop_name || "No shop details available for this block."}
            </p>
          </div>
        )}
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
