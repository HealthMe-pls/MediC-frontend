"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchMapDetail, MapDetail } from "../../../utility/maps";
import Header from "../../layouts/Header";

export default function AdminPage() {
  const [blocks, setBlocks] = useState<Record<number, string>>({});
  const [shopSet, setShopSet] = useState<MapDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleRemoveShop = (blockId: number) => {
    const confirmRemove = window.confirm(`Remove shop from block ${blockId}?`);
    if (confirmRemove) {
      setBlocks((prevBlocks) => {
        const newBlocks = { ...prevBlocks };
        delete newBlocks[blockId];
        return newBlocks;
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Admin - Edit Market Map</h1>
      </header>
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/6 bg-gray-700 text-white p-6">
          <div className="mt-4 space-y-4">
            {" "}
            {/* You can leave this space between items if you need extra padding */}
            <Link href="/adminPage/page">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4">
                {" "}
                {/* Added margin-bottom */}
                Manage Market Map
              </button>
            </Link>
            <Link href="/admin/shop-hours-summary">
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
                Shop Hours Summary
              </button>
            </Link>
            <Link href="/admin/manage-shop-hours">
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
                Manage Shop Hours
              </button>
            </Link>
            <Link href="/admin/manage-highlighted-workshop">
              <button className="w-full bg-gray-600  text-white py-2 rounded-lg mb-4">
                Manage Highlighted Workshop
              </button>
            </Link>
            <Link href="/admin/notifications">
              <button className="w-full bg-gray-600  text-white py-2 rounded-lg mb-4">
                Notification
              </button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
          {/* Search Bar */}
          <div className="mt-10 w-full flex justify-between items-center">
            <input
              type="text"
              placeholder="Search shops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-2/2 p-1 border border-gray-300 rounded"
            />
            <Link href="/admin/manage-shops">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
                Manage Shops
              </button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
      </footer>
    </div>
  );
}
