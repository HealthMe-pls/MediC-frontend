"use client";

import { useState } from "react";
import Hamburger from "../components/hamburger";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/assets/logo.png" alt="Logo" className="h-8" />

          <h1 className="text-3xl font-bold">Bamboo Family Market</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-lg">
            <button className="hover:text-gray-300">EN</button> |{" "}
            <button className="hover:text-gray-300">TH</button>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </div>
      </header>

      {/* Pass the isMenuOpen state and setIsMenuOpen function to Hamburger */}
      <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Header;
