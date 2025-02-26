"use client";
import React, { useState } from "react";
import Link from "next/link";
import Map from "@/app/components/ShopMap";
import AdminLayouts from "@/app/layouts/AdminLayouts";

const ManageMarketMap = () => {
  const [shops, setShops] = useState([
    { id: "A1", name: "Shop Name 1", status: false },
    { id: "A2", name: "Shop Name 2", status: true },
    { id: "A3", name: "No data available", status: null },
    { id: "A4", name: "Shop Name 4", status: false },
    { id: "A5", name: "Shop Name 5", status: true },
  ]);

  const handleDeleteClick = (shopId: string) => {
    const isConfirmed = window.confirm(
      "Remove this shop from the map?\nThis action cannot be undone."
    );

    if (isConfirmed) {
      setShops(shops.filter((shop) => shop.id !== shopId));
    }
  };

  const toggleStatus = (shopId: string) => {
    setShops(
      shops.map((shop) =>
        shop.id === shopId ? { ...shop, status: !shop.status } : shop
      )
    );
  };

  const handleAddClick = () => {
    const shopName = window.prompt("Enter the name of the new shop:");
    if (shopName) {
      const newShop = {
        id: `A${shops.length + 1}`,
        name: shopName,
        status: false,
      };
      setShops([...shops, newShop]);
    }
  };

  const handleEditClick = (shopId: string) => {
    const shop = shops.find((shop) => shop.id === shopId);
    if (shop) {
      const newName = window.prompt(
        "Enter the new name for the shop:",
        shop.name
      );
      if (newName) {
        setShops(
          shops.map((shop) =>
            shop.id === shopId ? { ...shop, name: newName } : shop
          )
        );
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // รีเซ็ตสีปุ่มทั้งหมดก่อน
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.classList.remove("bg-yellow-300");
      btn.classList.add("bg-gray-200");
    });

    // เพิ่มสี bg-yellow-300 ให้กับปุ่มที่ถูกคลิก
    event.currentTarget.classList.remove("bg-gray-200");
    event.currentTarget.classList.add("bg-yellow-300");
  };
  return (
    <AdminLayouts currentPage="Manage Market Hours">
      <div className="h-screen flex flex-col font-sans bg-gray-100">
        <main className="flex flex-1">
          <section className="flex-1 p-4 md:p-8">
            {/* Map Section */}
            <div className="flex justify-center w-full mb-6">
              <div className="w-full md:w-[30%] h-[200px] md:h-[30%]">
                <Map />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-40 mb-6">
              {/* Block Filter Buttons (A B C) */}
              <div className="flex">
                {["A", "B", "C"].map((letter, index) => (
                  <button
                    key={index}
                    onClick={handleClick}
                    className={`btn px-8 py-2 w-24 text-center transition-all ${
                      index === 0
                        ? "rounded-l-full bg-gray-200"
                        : index === 2
                        ? "rounded-r-full bg-gray-200"
                        : "rounded-none bg-gray-200"
                    } hover:bg-opacity-80`}
                  >
                    {letter}
                  </button>
                ))}
              </div>

              {/* Search Input (ตรงกลาง) */}
              <div className="flex-1 relative max-w-md">
                {" "}
                {/* ปรับความกว้างของช่องค้นหา */}
                {/* ไอคอนค้นหา */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {/* ช่องค้นหา */}
                <input
                  type="text"
                  placeholder="Search by Block ID or Shop Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Manage Category Button (ด้านขวา) */}
              <Link href="/admin/manage-shops" className=" w-full md:w-auto">
                <button className="w-full md:w-auto bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all">
                  Manage Category
                </button>
              </Link>
            </div>

            {/* Shops Table */}
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-3 text-left">Block ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-center">Close | Open</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shops.map((shop, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">{shop.id}</td>
                      <td className="p-3">{shop.name}</td>
                      <td className="p-3 text-center">
                        {shop.status !== null ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div
                              onClick={() => toggleStatus(shop.id)}
                              className={`relative w-12 h-4 rounded-full cursor-pointer transition-colors ${
                                shop.status ? "bg-green-500" : "bg-red-500"
                              }`}
                            >
                              <div
                                className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                                  shop.status
                                    ? "translate-x-8"
                                    : "translate-x-0"
                                } top-0.4`}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={handleAddClick}
                            className="bg-green-300 px-4 py-1 rounded-lg"
                          >
                            Add
                          </button>
                        )}
                      </td>
                      <td className="p-3 text-center space-x-2">
                        {shop.status !== null && (
                          <>
                            <button
                              onClick={() => handleEditClick(shop.id)}
                              className="bg-gray-400 text-white px-4 py-1 rounded-lg"
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-400 text-white px-4 py-1 rounded-lg"
                              onClick={() => handleDeleteClick(shop.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center items-center mt-4 space-x-2">
                {/* ปุ่มย้อนกลับ */}
                <button className="text-gray-700 hover:text-gray-900 transition-all">
                  &#8592; {/* Unicode สำหรับลูกศรซ้าย */}
                </button>

                {/* เลขหน้า */}
                {[1, 2, 3].map((page) => (
                  <label key={page} className="relative">
                    <input
                      type="radio"
                      name="pagination"
                      className="absolute opacity-0" // ซ่อน input
                    />
                    <span
                      className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer bg-transparent text-gray-700 hover:bg-gray-400 hover:text-white transition-all ${
                        page === 1
                          ? "peer-checked:bg-gray-500 peer-checked:text-white"
                          : "" // หน้า 1 ถูกเลือกโดย default
                      }`}
                    >
                      {page}
                    </span>
                  </label>
                ))}

                {/* ปุ่มไปหน้าถัดไป */}
                <button className="text-gray-700 hover:text-gray-900 transition-all">
                  &#8594; {/* Unicode สำหรับลูกศรขวา */}
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </AdminLayouts>
  );
};

export default ManageMarketMap;
