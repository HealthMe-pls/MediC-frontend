import React from "react";
import Header from "../../layouts/Header";
import Link from "next/link";
const ShopHoursSummaryPage = () => {
  // Assuming 'shopSet' data is passed as a prop or fetched from an API
  const shopSet = [
    { shop_name: "Shop 1" },
    { shop_name: "Shop 2" },
    { shop_name: "Shop 3" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Shop Hours Summary</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/6 bg-gray-700 text-white p-6">
          <div className="mt-4 space-y-4">
            {" "}
            {/* You can leave this space between items if you need extra padding */}
            <Link href="/adminPage/page">
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
                {" "}
                {/* Added margin-bottom */}
                Manage Market Map
              </button>
            </Link>
            <Link href="/admin/shop-hours-summary">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4">
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
        {/* <aside className="w-1/6 bg-gray-700 text-white p-6">
          <div className="mt-4 space-y-6">
            {" "}
            
            <Link href="/admin/manage-market-map">
              <button className="w-full bg-gray-600 py-2 rounded-lg hover:bg-gray-500 transition duration-200">
                Manage Market Map
              </button>
            </Link>
            <Link href="/admin/shop-hours-summary">
              <button className="w-full bg-blue-600 py-2 rounded-lg text-white hover:bg-blue-500 transition duration-200">
                Shop Hours Summary
              </button>
            </Link>
            <Link href="/admin/manage-shop-hours">
              <button className="w-full bg-gray-600 py-2 rounded-lg hover:bg-gray-500 transition duration-200">
                Manage Shop Hours
              </button>
            </Link>
            <Link href="/admin/manage-highlighted-workshop">
              <button className="w-full bg-gray-600 py-2 rounded-lg hover:bg-gray-500 transition duration-200">
                Manage Highlighted Workshop
              </button>
            </Link>
            <Link href="/admin/notifications">
              <button className="w-full bg-gray-600 py-2 rounded-lg hover:bg-gray-500 transition duration-200">
                Notification
              </button>
            </Link>
          </div>
        </aside> */}

        {/* Content Area */}
        <section className="flex-1 p-6 bg-gray-50">
          {/* Filter and Export Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="filter" className="font-semibold">
                Filter:
              </label>
              <select
                id="filter"
                className="p-2 border border-gray-300 rounded"
              >
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
                  <th className="border border-gray-300 px-4 py-2">
                    Sun 1 Dec
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Sat 7 Dec
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Sun 8 Dec
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Sat 14 Dec
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Sun 15 Dec
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Sat 21 Dec
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Sun 22 Dec
                  </th>
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ShopHoursSummaryPage;
