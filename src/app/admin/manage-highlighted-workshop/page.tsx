"use client";
import React from "react";

import AdminLayouts from "@/app/layouts/AdminLayouts";

const ManageHighlightedWorkshop = () => {
  return (
    <div className="h-screen flex flex-col ">
      <AdminLayouts currentPage="Manage Highlighted Workshop & Event">
        <section className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
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
      </AdminLayouts>
    </div>
  );
};

export default ManageHighlightedWorkshop;
