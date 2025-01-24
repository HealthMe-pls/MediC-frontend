"use client";

import { useState, useEffect } from "react";
import { fetchWorkshops, Workshop } from "../../utility/workshop";
import Header from "../layouts/Header";
import WorkshopCard from "../components/WorkshopCard";
import Footer from "../layouts/Footer";
export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]); // Ensure workshops is always an array
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchWorkshops()
      .then((data) => {
        setWorkshops(data || []); // Fallback to an empty array if data is null
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow p-8 bg-[#FFF7EB] font-lexend ">
        <h1 className="text-3xl mb-6 text-center">Highlighted Workshops</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading workshops...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : workshops.length === 0 ? (
          <div className="flex justify-center h-screen bg-[#FFF7EB]">
            <div className="mt-7 text-center text-gray-500">
              <p>No workshops available at the moment.</p>
              <p>Please check back later!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
