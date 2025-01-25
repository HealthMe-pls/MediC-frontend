"use client";

import { useState, useEffect } from "react";
import { fetchMapDetail, MapDetail } from "../../utility/maps";
import Header from "../layouts/Header";
export default function AdminPage() {
  const [blocks, setBlocks] = useState<Record<number, string>>({});
  const [shopSet, setShopSet] = useState<MapDetail[]>([]);
  // const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  // const [selectedShop, setSelectedShop] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMapDetail();
        setShopSet(data);

        const initialBlocks = data.reduce((acc, mapDetail) => {
          acc[mapDetail.block_id] = mapDetail.shop_name;
          return acc;
        }, {} as Record<number, string>);

        setBlocks(initialBlocks);
      } catch (error) {
        console.error("Error fetching map details:", error);
      }
    };

    fetchData();
  }, []);

  // const handleBlockClick = (blockId: number) => {
  //   setSelectedBlock(blockId);
  //   setSelectedShop(blocks[blockId] || "");
  // };

  // const handleShopChange = () => {
  //   if (selectedBlock !== null) {
  //     setBlocks((prevBlocks) => ({
  //       ...prevBlocks,
  //       [selectedBlock]: selectedShop,
  //     }));
  //     setSelectedBlock(null);
  //   }
  // };

  const handleRemoveShop = (blockId: number) => {
    const confirmRemove = window.confirm(`Remove shop from block ${blockId}?`);
    if (confirmRemove) {
      setBlocks((prevBlocks) => {
        const newBlocks = { ...prevBlocks };
        delete newBlocks[blockId]; // Remove shop from block
        return newBlocks;
      });
    }
  };

  const generateBlockPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 140;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Admin - Edit Market Map</h1>
      </header>

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        {/* Circular Map */}
        <div
          className="relative w-72 h-72 rounded-full border-4 border-gray-500 flex items-center justify-center"
          style={{ position: "relative" }}
        >
          {Object.keys(blocks).map((blockId, index) => {
            const { x, y } = generateBlockPosition(
              index,
              Object.keys(blocks).length
            );
            return (
              <div
                key={blockId}
                className="absolute w-16 h-16 text-white flex items-center justify-center rounded-full cursor-pointer"
                style={{
                  backgroundColor: `blue`,
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <p>{blocks[Number(blockId)] || "Select Shop"}</p>
              </div>
            );
          })}
        </div>

        {/* Table Section */}
        <div className="mt-8 w-full">
          <h2 className="text-xl font-bold mb-4">Manage Shops</h2>
          <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Block ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(blocks).map(([blockId, shop]) => (
                <tr key={blockId}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {blockId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {shop || "Select Shop"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <select
                      value={shop}
                      onChange={(e) =>
                        setBlocks((prevBlocks) => ({
                          ...prevBlocks,
                          [blockId]: e.target.value,
                        }))
                      }
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select Shop</option>
                      {shopSet.map((shop) => (
                        <option key={shop.shop_id} value={shop.shop_name}>
                          {shop.shop_name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveShop(Number(blockId))}
                      className="className = p-2 bg-red-500 text-white rounded"
                    >
                      remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
      </footer>
    </div>
  );
}
