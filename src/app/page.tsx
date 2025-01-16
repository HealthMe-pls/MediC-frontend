"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchMapDetail, MapDetail } from "../utility/maps";
import { fetchPatients, Patient } from "../utility/patient";

export default function Home() {
  const [marketMaps, setMarketMaps] = useState<MapDetail[]>([]); // State for market maps
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  useEffect(() => {
    fetchPatients()
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  // Fetch market map data on component mount
  useEffect(() => {
    fetchMapDetail()
      .then((data) => setMarketMaps(data))
      .catch((error) => console.error("Error fetching market maps:", error));
  }, []);

  const handleBlockClick = (blockId: number) => {
    setSelectedBlock(blockId);
  };

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
        <div className="bg-yellow-400 py-4 text-center text-black font-bold mb-6">
          <h2>Highlight Workshop - Special Offers this Week!</h2>
        </div>

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

        {/* Store Details Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Store Details</h2>
          <ul>
            {patients.map((patient, index) => (
              <li
                key={`${patient.ID}-${index}`}
                className="p-4 bg-white shadow-md rounded-lg min-w-[200px] hover:shadow-lg transition-shadow"
              >
                <Link href={`/patient/${patient.ID}`}>
                  <p className="text-xl font-semibold text-pink-500 hover:underline">
                    {patient.Name}
                  </p>
                  <p className="text-gray-700">{patient.Age}</p>
                  <p className="text-gray-700">{patient.Email}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
      </footer>
    </div>
  );
}
