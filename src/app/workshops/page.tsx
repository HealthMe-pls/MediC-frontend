"use client";

import { useState, useEffect } from "react";
import { fetchWorkshops, Workshop } from "../../utility/workshop";
import Header from "../layouts/Header";
import WorkshopCard from "../components/WorkshopCard";
import Footer from "../layouts/Footer";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchWorkshops()
      .then((data) => {
        setWorkshops(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="font-lexend">
      <Header />
      <main className="flex flex-col items-center p-8 bg-[#FFF7EB] min-h-screen">
        <h1 className="text-3xl mb-6 text-center">Highlighted Workshops</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading workshops...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : workshops.length === 0 ? (
          <div className="flex items-center justify-center h-screen bg-[#FFF7EB]">
            <div className="text-center text-gray-500">
              <p>No workshops available at the moment.</p>
              <p>Please check back later!</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 px-6 w-full">
            {workshops.map((workshop) => (
              <div key={workshop.id} className="flex justify-center">
                <WorkshopCard workshop={workshop} />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
