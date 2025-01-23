"use client";

import Link from "next/link";
import CircularShops from "./components/CircularShops";
import { useEffect, useState } from "react";
import { fetchMapDetail, MapDetail } from "../utility/maps";
import Map from "./components/ShopMap";
import "../styles/global.css";
import Shoplist from "./components/ShopList";

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

  const [innerShops, setInnerShops] = useState(8);
  const [outerShops, setOuterShops] = useState(12);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="../assets/logo.png" alt="Logo" className="h-8" />
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
          <div className="flex-1 ml-4">
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              defaultValue=""
            >
              <option value="">Select Filter</option>
              <option value="type1">Filter Type 1</option>
              <option value="type2">Filter Type 2</option>
            </select>
          </div>
        </div>

        <Map></Map>

        {/* <div className="absolute inset-0 flex justify-center items-center">
  {Array.from({ length: 26 }).map((_, i) => (
    <div
      key={`A${i + 1}`}
      className="point-a"
      style={{
        transform: `rotate(${i * 13.85}deg) translate(240px) rotate(-${i * 13.85}deg)`,
      }}
    >
      <span className="text-black text-xs">{`A${i + 1}`}</span> {}
    </div>
  ))}
</div>

<div className="absolute inset-0 flex justify-center items-center">
  {Array.from({ length: 15 }).map((_, i) => (
    <div
      key={`B${i + 1}`}
      className="point-b"
      style={{
        transform: `rotate(${i * 24}deg) translate(200px) translateY(-10px) rotate(-${i * 24}deg)`,
      }}
    >
      <span className="text-black text-xs">{`B${i + 1}`}</span> {}
    </div>
  ))}
</div>

<div className="absolute inset-0 flex justify-center items-center">
  {Array.from({ length: 13 }).map((_, i) => (
    <div
      key={`C${i + 1}`}
      className="point-c"
      style={{
        transform: `rotate(${i * 27.69}deg) translate(160px) translateY(-10px) rotate(-${i * 27.69}deg)`,
      }}
    >
      <span className="text-black text-xs">{`C${i + 1}`}</span> {}
    </div>
  ))}
</div> */}

        {/* //Market Map */}
        {/* <div className="flex justify-center mb-6">
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
        </div> */}

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

        {/*ShopList*/}
        <div className="mt-6 sm:hidden">
          <Shoplist />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
      </footer>
    </div>
  );
}
