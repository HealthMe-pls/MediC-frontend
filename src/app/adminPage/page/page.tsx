import React from "react";
import Header from "../../layouts/Header";
import Link from "next/link";

const ManageMarketMap = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex flex-1">
        <aside className="w-1/5 bg-white p-6 shadow-md">
          <div className="space-y-4">
            {[
              "Manage Market Map",
              "Manage Shop Hours",
              "Shop Hours Summary",
              "Manage Vendor",
              "Manage Highlighted Workshop & Event",
              "Edit About Us",
              "Notification",
            ].map((item, index) => (
              <button
                key={index}
                className={`w-full py-3 rounded-lg text-left px-4 text-gray-700 font-medium hover:bg-gray-200 ${
                  index === 0 ? "bg-green-200" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-4">Manage Market Map</h2>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <input
              type="text"
              placeholder="Search by Block ID or Shop Name"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <Link href="/admin/manage-shops">
              {" "}
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg">
                Manage Category
              </button>{" "}
            </Link>
          </div>

          <div className="flex space-x-2 mb-4">
            {["A", "B", "C"].map((letter, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg border ${
                  index === 0 ? "bg-yellow-300" : "bg-gray-200"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

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
              {[
                { id: "A1", name: "Shop Name 1", status: false },
                { id: "A2", name: "Shop Name 2", status: true },
                { id: "A3", name: "No data available", status: null },
                { id: "A4", name: "Shop Name 4", status: false },
                { id: "A5", name: "Shop Name 5", status: true },
              ].map((shop, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{shop.id}</td>
                  <td className="p-3">{shop.name}</td>
                  <td className="p-3 text-center">
                    {shop.status !== null ? (
                      <span
                        className={`inline-block w-6 h-6 rounded-full ${
                          shop.status ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                    ) : (
                      <button className="bg-green-300 px-3 py-1 rounded-lg">
                        Add
                      </button>
                    )}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    {shop.status !== null && (
                      <>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                          Edit
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
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
            <button className="bg-gray-300 p-2 rounded-lg">&#9664;</button>
            <span className="text-gray-700">1</span>
            <span className="text-gray-400">2</span>
            <span className="text-gray-400">3</span>
            <button className="bg-gray-300 p-2 rounded-lg">&#9654;</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageMarketMap;

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { fetchMapDetail, MapDetail } from "../../../utility/maps";
// import Header from "../../layouts/Header";

// export default function AdminPage() {
//   const [blocks, setBlocks] = useState<Record<number, string>>({});
//   const [shopSet, setShopSet] = useState<MapDetail[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchMapDetail();
//         setShopSet(data);

//         const initialBlocks = data.reduce((acc, mapDetail) => {
//           acc[mapDetail.block_id] = mapDetail.shop_name;
//           return acc;
//         }, {} as Record<number, string>);

//         setBlocks(initialBlocks);
//       } catch (error) {
//         console.error("Error fetching map details:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleRemoveShop = (blockId: number) => {
//     const confirmRemove = window.confirm(`Remove shop from block ${blockId}?`);
//     if (confirmRemove) {
//       setBlocks((prevBlocks) => {
//         const newBlocks = { ...prevBlocks };
//         delete newBlocks[blockId];
//         return newBlocks;
//       });
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <Header />
//       <header className="bg-blue-600 text-white py-4 text-center">
//         <h1 className="text-3xl font-bold">Admin - Edit Market Map</h1>
//       </header>
//       <main className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="w-1/6 bg-gray-700 text-white p-6">
//           <div className="mt-4 space-y-4">
//             {" "}
//             {/* You can leave this space between items if you need extra padding */}
//             <Link href="/adminPage/page">
//               <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4">
//                 {" "}
//                 {/* Added margin-bottom */}
//                 Manage Market Map
//               </button>
//             </Link>
//             <Link href="/admin/shop-hours-summary">
//               <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
//                 Shop Hours Summary
//               </button>
//             </Link>
//             <Link href="/admin/manage-shop-hours">
//               <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
//                 Manage Shop Hours
//               </button>
//             </Link>
//             <Link href="/admin/manage-highlighted-workshop">
//               <button className="w-full bg-gray-600  text-white py-2 rounded-lg mb-4">
//                 Manage Highlighted Workshop
//               </button>
//             </Link>
//             <Link href="/admin/notifications">
//               <button className="w-full bg-gray-600  text-white py-2 rounded-lg mb-4">
//                 Notification
//               </button>
//             </Link>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <section className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
//           {/* Search Bar */}
//           <div className="mt-10 w-full flex justify-between items-center">
//             <input
//               type="text"
//               placeholder="Search shops..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-2/2 p-1 border border-gray-300 rounded"
//             />
//             <Link href="/admin/manage-shops">
//               <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
//                 Manage Shops
//               </button>
//             </Link>
//           </div>
//         </section>
//       </main>
//       <footer className="bg-gray-800 text-white py-4 text-center">
//         <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }
