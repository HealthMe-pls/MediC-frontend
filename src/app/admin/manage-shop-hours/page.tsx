import React from "react";
import Header from "../../layouts/Header";
import Link from "next/link";

const ShopHoursSummaryPage = () => {
  const shopSet = [
    { shop_name: "Shop 1" },
    { shop_name: "Shop 2" },
    { shop_name: "Shop 3" },
  ];

  return (
    <div className="h-screen flex flex-col font-sans">
      {" "}
      {/* Added font-sans */}
      <Header />
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Manage shop hours</h1>
      </header>
      {/* Main Content */}
      <main className="flex flex-1 bg-gray-100">
        {" "}
        {/* Added background color */}
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
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
                Shop Hours Summary
              </button>
            </Link>
            <Link href="/admin/manage-shop-hours">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4">
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
        {/* Content Area */}
        <section className="flex-1 p-8">
          {" "}
          {/* Increased padding */}
          {/* Title and Add Date Button */}
          <div className="flex justify-between items-center mb-6">
            {" "}
            {/* Increased margin */}
            <h2 className="text-2xl font-semibold">Manage shop hours</h2>
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
      </main>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ShopHoursSummaryPage;
