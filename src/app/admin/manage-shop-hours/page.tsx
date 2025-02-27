//อันนี้เหมือนจะไม่ได้ใช้
import React from "react";
import Header from "../../layouts/Header";
import Link from "next/link";
import AdminNavigation from "@/app/components/AdminNavigation";
import AdminLayouts from "@/app/layouts/AdminLayouts";

const ShopHoursSummaryPage = () => {
  // const shopSet = [
  //   { shop_name: "Shop 1" },
  //   { shop_name: "Shop 2" },
  //   { shop_name: "Shop 3" },
  // ];

  return (
    <AdminLayouts currentPage="Manage Shop Hours">
      <div className="h-screen flex flex-col ">
        {" "}
        {/* Added font-sans */}
        {/* Main Content */} {/* Added background color */}
        {/* Sidebar */}
        {/* <AdminNavigation currentPage="Manage Shop Hours" /> */}
        {/* Content Area */}
        <section className="flex-1 p-8">
          {" "}
          {/* Increased padding */}
          {/* Title and Add Date Button */}
          <div className="flex justify-between items-center mb-6">
            {" "}
            {/* Increased margin */}
            <button className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition duration-200">
              Add Date
            </button>
          </div>
          {/* Month Navigation */}
          <div className="flex justify-center items-center mb-6">
            {" "}
            {/* Increased margin */}
            <button className="mx-2">&lt;</button>{" "}
            {/* Changed to arrow symbols */}
            <span className="text-lg font-medium">December 2024</span>
            <button className="mx-2">&gt;</button>{" "}
            {/* Changed to arrow symbols */}
          </div>
          {/* Shop Hours Summary Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-auto">
              {" "}
              {/* table-auto for better responsiveness */}
              <thead>
                <tr className="bg-gray-200">
                  {" "}
                  {/* Lighter header background */}
                  <th className="border px-4 py-2 text-left">
                    Opening Date
                  </th>{" "}
                  {/* Left aligned text */}
                  <th className="border px-4 py-2 text-left">From</th>{" "}
                  {/* Left aligned text */}
                  <th className="border px-4 py-2 text-left">To</th>{" "}
                  {/* Left aligned text */}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  {" "}
                  {/* Added bottom border to rows */}
                  <td className="px-4 py-2">Sunday, 1 Dec 2024</td>
                  <td className="px-4 py-2">09:00</td>
                  <td className="px-4 py-2">20:00</td>
                </tr>
                <tr className="border-b">
                  {" "}
                  {/* Added bottom border to rows */}
                  <td className="px-4 py-2">Saturday, 7 Dec 2024</td>
                  <td className="px-4 py-2">09:00</td>
                  <td className="px-4 py-2">20:00</td>
                </tr>
                <tr className="border-b">
                  {" "}
                  {/* Added bottom border to rows */}
                  <td className="px-4 py-2">Sunday, 8 Dec 2024</td>
                  <td className="px-4 py-2">09:00</td>
                  <td className="px-4 py-2">20:00</td>
                </tr>
                <tr className="border-b">
                  {" "}
                  {/* Added bottom border to rows */}
                  <td className="px-4 py-2">Saturday, 14 Dec 2024</td>
                  <td className="px-4 py-2">09:00</td>
                  <td className="px-4 py-2">20:00</td>
                </tr>
                <tr>
                  {" "}
                  {/* Last row - no bottom border */}
                  <td className="px-4 py-2">Sunday, 15 Dec 2024</td>
                  <td className="px-4 py-2">09:00</td>
                  <td className="px-4 py-2">20:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayouts>
  );
};

export default ShopHoursSummaryPage;
