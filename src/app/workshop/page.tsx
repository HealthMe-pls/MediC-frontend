"use client";

import { useState, useEffect } from "react";
import { fetchWorkshops, Workshop } from "../../utility/workshop";
import Header from "../layouts/Header";

export default function WorkshopPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [error, setError] = useState<string | null>(null); // State to track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWorkshops();
        setWorkshops(data);
      } catch (err) {
        console.error("Error fetching workshops:", err);
        setError("Failed to load workshops. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Workshops</h1>

        {error ? (
          // Display error message if any
          <p className="text-center text-red-500">{error}</p>
        ) : workshops.length === 0 ? (
          // Display message if no workshops are available
          <p className="text-center text-gray-500">No workshops available.</p>
        ) : (
          // Display workshop cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-white rounded shadow-md p-4 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold">{workshop.name}</h2>
                <p className="text-gray-700 mt-2">{workshop.description}</p>
                <p className="text-gray-500 mt-2">
                  Instructor: {workshop.instructor}
                </p>
                <p className="text-gray-500 mt-1">
                  Language: {workshop.language}
                </p>
                <p className="text-gray-500 mt-1">
                  Date: {workshop.date} ({workshop.start_time} - {workshop.end_time})
                </p>
                <p className="text-blue-600 font-bold mt-2">
                  ${workshop.price.toFixed(2)}
                </p>
                <div className="mt-4">
                  {workshop.photos.map((photo) => (
                    <img
                      key={photo.photo_id}
                      src={photo.pathfile}
                      alt={`Workshop ${workshop.name}`}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
      </footer>
    </div>
  );
}
