"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { fetchMapDetail, MapDetail } from "../utility/maps";
import Header from "./layouts/Header";
import Shoplist from "./components/ShopList";
import HighlightBanner from "./components/HighlightBanner";
import Footer from "./layouts/Footer";
import Map from "./components/ShopMap";
import SearchBar from "./components/SearchBar";
import "../styles/global.css";
import "./globals.css";
import Mapguide from "../../public/assets/MapGuide.gif";
import { fetchShopCategory, ShopCategory } from "@/utility/shopcate";
import Filter from "./components/Filter";
import Shopside from "./components/ShopSide";



export default function Home() {
  const [marketMaps, setMarketMaps] = useState<MapDetail[]>([]);
  const [shopCategory, setCategory] = useState<ShopCategory[]>([]);
  const [selectedCate, setSelectedCate] = useState<number>(0);
  const [matchShopID, setMatchShopID] = useState<number>(0);
  const [selectedBlock, setSelectedBlock] = useState<string | "">("");

  const shopListRef = useRef<HTMLDivElement>(null);

  const [showGif, setShowGif] = useState(true); 
  
  const handleCloseGif = () => {
    setShowGif(false);
  };


  useEffect(() => {
    if (matchShopID !== 0 && window.innerWidth <= 640) {
      setTimeout(() => {
        shopListRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });

        window.scrollTo({
          top: 850,
          behavior: "smooth",
        });
      }, 300);
    }
  }, [matchShopID]);


  useEffect(() => {
    fetchMapDetail()
      .then((data) => setMarketMaps(data))
      .catch((error) => console.error("Error fetching market maps:", error));
  }, [selectedCate]);

  useEffect(() => {
    if (selectedCate !== 0 && matchShopID === 0) {
      setMatchShopID(0);
    }
  }, [selectedCate]);
  

  useEffect(() => {
    fetchShopCategory()
      .then((data) => setCategory(data))
      .catch((error) => console.error("Error fetching shopcate:", error));
  }, []);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const data = await fetchMapDetail();
        if (selectedCate === 0) {
          setMarketMaps(data.filter(map => map.shop_id !== null));
        } else if (matchShopID !== 0) {
          setMarketMaps(data.filter(map => map.shop_id === matchShopID));
        } else {
          setMarketMaps(data.filter(map => map.category_id === selectedCate));
        }
      } catch (error) {
        console.error("Error fetching market maps:", error);
      }
    };
  
    fetchMaps();
  }, [selectedCate, matchShopID]);
  
  
  const handleSearchChange = (newSelectedCate: number) => {
    setSelectedCate(newSelectedCate);
    setMatchShopID(0);
  };
  
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCate(categoryId); 
    setMatchShopID(0);
  };

  useEffect(() => {
    if (matchShopID !== 0) {
      const matchedShop = marketMaps.find(shop => shop.shop_id === matchShopID);
      if (matchedShop) {
        setSelectedBlock(matchedShop.block_name);
      }
    }
  }, [matchShopID, marketMaps]);

  useEffect(() => {
    console.log("selectedBlock:", selectedBlock);
    console.log("matchShopID:", matchShopID);
  }, [selectedBlock, matchShopID]);

  return (
    <div className="flex flex-col font-lexend">
      <Header />


      <main className="flex-1 overflow-auto p-6 bg-[#FFF7EB]">

        <h2 className="text-[25px] text-[#4C4343] mb-4 text-center mobile-view">
          Market Map
        </h2>
        <div className="mobile-view">
        <div className="mb-6 mt-2 ">
          <div>
          <SearchBar
        setSelectedCate={setSelectedCate}
        setMatchShopID={setMatchShopID}
      />
          </div>

          <Filter
            shopCategory={shopCategory}
            selectedCate={selectedCate}
            onSelectCategory={handleCategorySelect}
            setMatchShopID={setMatchShopID}
          />
        </div>
        </div>
        <div className="flex flex-wrap ipad-view w-[575px] justify-center mx-auto">
    <div className="flex-1 mr-2">
      <SearchBar
        setSelectedCate={setSelectedCate}
        setMatchShopID={setMatchShopID}
      />
    </div>
    <div className="flex-1 ml-2">
      <Filter
        shopCategory={shopCategory}
        selectedCate={selectedCate}
        onSelectCategory={handleCategorySelect}
        setMatchShopID={setMatchShopID}
      /></div>
    </div>

        <div className="sm:flex hidden w-full gap-8 flex-wrap justify-center mb-[32px]">
  <div className="w-[600px] min-w-[600px] flex justify-center">
      <Map
        selectedCate={selectedCate}
        setSelectedBlock={setSelectedBlock}
        matchShopID={matchShopID}
        setMatchShopID={setMatchShopID}
      />

  </div>

  <div className="w-[570px] min-w-[500px] flex justify-center flex-wrap flex-col">
    <div className="flex flex-wrap desktop-view mx-autu">
    <div className="flex-1 mr-2">
      <SearchBar
        setSelectedCate={setSelectedCate}
        setMatchShopID={setMatchShopID}
      />
    </div>
    <div className="flex-1 ml-2">
      <Filter
        shopCategory={shopCategory}
        selectedCate={selectedCate}
        onSelectCategory={handleCategorySelect}
        setMatchShopID={setMatchShopID}
      /></div>
    </div>
    <div className="w-full">
    {showGif && !selectedBlock ? (
        <div className="relative w-full">
          <img
            src="../assets/Mapguide.gif"
            alt="GIF"
            className="w-full h-auto max-h-[570px] object-contain mapguide-hidden"
          />
          <button
            onClick={handleCloseGif}
            className="absolute top-2 right-16 p-1 rounded-full mr-2 mt-2"
            aria-label="Close"
          >
            <span className="text-opacity-50 text-black text-[50px]">×</span>
          </button>
        </div>
      ) : (
        <Shopside 
          blockName={selectedBlock}
        />
      )}
    </div>
  </div>
</div>

<div className="mobile-view block">
      <Map
        selectedCate={selectedCate}
        setSelectedBlock={setSelectedBlock}
        matchShopID={matchShopID}
      />
</div>

        <div className="mt-6 mobile-view ref={shopListRef}">
          <Shoplist
            label=""
            onCateChange={handleSearchChange}
            Cateid={selectedCate}
            setMatchShopID={setMatchShopID}
            matchShop={matchShopID}
          />
        </div>

        <div>
          <HighlightBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
