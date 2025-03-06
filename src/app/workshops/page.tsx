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
  const [workshopsPerView, setWorkshopsPerView] = useState<number>(3); // Default to 3 columns

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

    // Function to set the number of workshops per view based on window width
    const handleResize = () => {
      if (window.innerWidth >= 1700) {
        setWorkshopsPerView(5);
      } else if (window.innerWidth >= 1400) {
        setWorkshopsPerView(4);
      } else if (window.innerWidth >= 1100) {
        setWorkshopsPerView(3);
      } else if (window.innerWidth >= 800) {
        setWorkshopsPerView(2);
      } else {
        setWorkshopsPerView(1);
      }
    };

    // Add resize event listener and initialize it
    window.addEventListener("resize", handleResize);
    handleResize(); // Call on component mount to set the initial value

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="font-lexend">
      <Header />
      <main className="flex-grow p-8 bg-[#FFF7EB] font-lexend">
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
          <div className="flex justify-center  ">
            <div
              className={`grid gap-4 p-5 mx-2 ${
                workshopsPerView === 1
                  ? "grid-cols-1"
                  : workshopsPerView === 2
                  ? "grid-cols-2"
                  : workshopsPerView === 3
                  ? "grid-cols-3"
                  : workshopsPerView === 4
                  ? "grid-cols-4"
                  : workshopsPerView === 5
                  ? "grid-cols-5"
                  : "grid-cols-6"
              }`}
            >
              {workshops.map((workshop) => (
                <div key={workshop.id} className="p-5">
                  <WorkshopCard workshop={workshop} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
