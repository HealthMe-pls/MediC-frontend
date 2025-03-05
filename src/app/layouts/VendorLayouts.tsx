"use client";
import { useState } from "react";
import VendorNavigation from "../components/VendorNavigation";

interface VendorLayoutsProps {
  currentPage: string;
  children: React.ReactNode;
}

export default function VendorLayouts({
  currentPage,
  children,
}: VendorLayoutsProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    // console.log("toggleNav: ", isNavOpen);
  };

  return (
    <div
      className="flex bg-[#F5F5F5] font-lexend text-[#4C4343]"
      //   onClick={closeNav}
    >
      <VendorNavigation
        currentPage={currentPage}
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
      />

      <main className="flex-1 px-6  ">
        <div className={`lg:hidden flex justify-between items-center p-4 z-20`}>
          <button
            onClick={toggleNav}
            className="text-2xl transition-transform duration-300 "
          >
            &#9776; {/* Hamburger icon */}
          </button>
          <h1 className="fixed left-24 text-[150%]">{currentPage}</h1>
        </div>
        <div>
          <div className="max-h-full m-10">{children}</div>
        </div>
      </main>
    </div>
  );
}
