import React from "react";
import Header from "../../layouts/Header";
import Link from "next/link";

const ManageHighlightedWorkshop = () => {
  return (
    <div className="h-screen flex flex-col font-sans">
      <Header />
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Manage highlighted workshop</h1>
      </header>
      <main className="flex flex-1 bg-gray-100">
        <aside className="w-1/6 bg-gray-700 text-white p-6">
          <div className="mt-4 space-y-4">
            {" "}
            {/* You can leave this space between items if you need extra padding */}
            <Link href="/adminPage">
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
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
                Manage Shop Hours
              </button>
            </Link>
            <Link href="/admin/manage-highlighted-workshop">
              <button className="w-full bg-blue-600  text-white py-2 rounded-lg mb-4">
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

        <section className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Manage highlighted workshop
            </h2>
            <button className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition duration-200">
              Add
            </button>
          </div>

          <div className="mb-6">
            {" "}
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {" "}
            {/* Grid Layout for Workshop Items */}
            {/* Example Workshop Item (Repeat as needed) */}
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="bg-gray-200 h-48 mb-4 rounded">
                {/* Placeholder for Image/Video */}
              </div>
              <h3 className="font-semibold mb-2">Name</h3>
              <div className="flex justify-between">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Remove</button>
              </div>
            </div>
            {/* Repeat the above div for other workshop items */}
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="bg-gray-200 h-48 mb-4 rounded">
                {/* Placeholder for Image/Video */}
              </div>
              <h3 className="font-semibold mb-2">Name</h3>
              <div className="flex justify-between">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Remove</button>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="bg-gray-200 h-48 mb-4 rounded">
                {/* Placeholder for Image/Video */}
              </div>
              <h3 className="font-semibold mb-2">Name</h3>
              <div className="flex justify-between">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Remove</button>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="bg-gray-200 h-48 mb-4 rounded">
                {/* Placeholder for Image/Video */}
              </div>
              <h3 className="font-semibold mb-2">Name</h3>
              <div className="flex justify-between">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Remove</button>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="bg-gray-200 h-48 mb-4 rounded">
                {/* Placeholder for Image/Video */}
              </div>
              <h3 className="font-semibold mb-2">Name</h3>
              <div className="flex justify-between">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Remove</button>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="bg-gray-200 h-48 mb-4 rounded">
                {/* Placeholder for Image/Video */}
              </div>
              <h3 className="font-semibold mb-2">Name</h3>
              <div className="flex justify-between">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Remove</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ManageHighlightedWorkshop;
