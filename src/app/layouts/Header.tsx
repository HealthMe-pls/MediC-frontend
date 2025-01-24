"use client";

import { useState } from "react";
import Hamburger from "../components/hamburger";
import styles from "../../styles/Header.module.css";
import Bar from "./bar";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Eng");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <div>

    <Bar/>



      {/* <div className={styles.header}> */}
      <div className="flex justify-between p-4">
        <div className="flex-none justify-start">
          {/* <div className={styles.logoContainer}> */}
          <img src="/assets/logo.png" alt="Logo" className="w-[86px]" />
          {/* <h1 className="text-xl sm:text-3xl font-bold">
            Bamboo Family Market
          </h1> */}
        </div>
        <div className="flex justify-aroud ">
          {/* <div className="text-sm sm:text-lg flex"> */}
          <div className="flex">
            <button
              className={`${
                selectedLanguage === "Eng"
                  ? "text-[#4C4343]  font-bold"
                  : "hover:text-[#9C9C9C]"
              } mr-1 sm:mr-2`}
              onClick={() => handleLanguageChange("Eng")}
            >
              English
            </button>
          </div>
          <div className="flex mt-5">| </div>
          <div className="flex">
            <button
              className={`${
                selectedLanguage === "TH"
                  ? "text-[#4C4343] font-bold"
                  : "hover:text-[#9C9C9C]"
              } ml-1 sm:ml-2`}
              onClick={() => handleLanguageChange("TH")}
            >
              TH
            </button>
          </div>
          {/* </div> */}
          <div
            className="cursor-pointer flex justify-around mt-6 ml-5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* <div  onClick={() => setIsMenuOpen(!isMenuOpen)}> */}
            <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
