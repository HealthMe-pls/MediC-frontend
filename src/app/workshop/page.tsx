"use client";

import { useState, useEffect } from "react";
import { fetchWorkshops, Workshop } from "../../utility/workshop";
import Header from "../layouts/Header";
import WorkshopCard from '../components/WorkshopCard';


export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkshops()
      .then((data) => setWorkshops(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Workshops</h1>

        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : workshops.length === 0 ? (
          <p className="text-center text-gray-500">No workshops available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
         <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
       </footer>
    </>
  );
}

