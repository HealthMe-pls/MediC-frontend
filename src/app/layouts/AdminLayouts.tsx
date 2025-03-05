"use client";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";

interface AdminLayoutsProps {
  currentPage: string;
  children: React.ReactNode;
}

export default function AdminLayouts({
  currentPage,
  children,
}: AdminLayoutsProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    // console.log("toggleNav: ", isNavOpen);
  };

  return (
    <div className="flex bg-[#F5F5F5] h-full font-lexend text-[#4C4343]">
      <AdminNavigation
        currentPage={currentPage}
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
      />

      <main className="flex-1 px-6 min-h-screen overflow-y-auto">
        <div className={`lg:hidden flex justify-between items-center p-4 z-20`}>
          <button
            onClick={toggleNav}
            className="text-2xl transition-transform duration-300 "
          >
            &#9776; {/* Hamburger icon */}
          </button>
          <h1 className="fixed left-24 text-[150%]">{currentPage}</h1>
        </div>
        <div className="lg:ml-[250px]">
          <h1 className=" text-[150%] mt-[40px] ml-4 hidden lg:block z-18">
            {currentPage}
          </h1>
          <div className="max-h-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
