import React from "react";
import Header from "../../layouts/Header";
import Link from "next/link";
import AdminLayouts from "@/app/layouts/AdminLayouts";
const ShopHoursSummaryPage = () => {
  // Assuming 'shopSet' data is passed as a prop or fetched from an API
  const shopSet = [
    { shop_name: "Shop 1" },
    { shop_name: "Shop 2" },
    { shop_name: "Shop 3" },
  ];

  return (
    <AdminLayouts currentPage="Shop Hours Summary">
      {/* Content Area */}
      <section className="flex-1 p-6 bg-gray-50">
        {/* Filter and Export Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="filter" className="font-semibold">
              Filter:
            </label>
            <select id="filter" className="p-2 border border-gray-300 rounded">
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
            Export as PDF
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Sun 1 Dec</th>
                <th className="border border-gray-300 px-4 py-2">Sat 7 Dec</th>
                <th className="border border-gray-300 px-4 py-2">Sun 8 Dec</th>
                <th className="border border-gray-300 px-4 py-2">Sat 14 Dec</th>
                <th className="border border-gray-300 px-4 py-2">Sun 15 Dec</th>
                <th className="border border-gray-300 px-4 py-2">Sat 21 Dec</th>
                <th className="border border-gray-300 px-4 py-2">Sun 22 Dec</th>
              </tr>
            </thead>
            <tbody>
              {shopSet.map((shop, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {shop.shop_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center bg-gray-300">
                    Scheduled
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                  <td className="border border-gray-300 px-4 py-2 bg-gray-300">
                    Scheduled
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                  <td className="border border-gray-300 px-4 py-2 bg-gray-300">
                    Scheduled
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                  <td className="border border-gray-300 px-4 py-2 bg-gray-300">
                    Scheduled
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayouts>
  );
};

export default ShopHoursSummaryPage;
