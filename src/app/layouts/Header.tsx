"use client";

import { useState } from "react";
import Hamburger from "../components/hamburger";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <header className="bg-blue-600 text-white py-3 sm:py-4 flex justify-between items-center px-4 sm:px-6">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="h-6 sm:h-8 w-6 sm:w-8 object-contain"
          />
          <h1 className="text-xl sm:text-3xl font-bold">
            Bamboo Family Market
          </h1>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="text-sm sm:text-lg hidden sm:block">
            <button className="hover:text-gray-300 mr-1 sm:mr-2">EN</button>|
            <button className="hover:text-gray-300 ml-1 sm:ml-2">TH</button>
          </div>
          <div
            className="cursor-pointer flex flex-col justify-center space-y-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-4 sm:w-6 h-0.5 bg-white"></div>
            <div className="w-4 sm:w-6 h-0.5 bg-white"></div>
            <div className="w-4 sm:w-6 h-0.5 bg-white"></div>
          </div>
        </div>
      </header>

      <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Header;