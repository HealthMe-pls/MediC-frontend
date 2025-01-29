import { useState, useEffect } from "react";
import { fetchShopByWord, SearchBarInt } from "@/utility/searchbar";

interface SearchBarProps {
  setSelectedCate: React.Dispatch<React.SetStateAction<number>>;
  setMatchShopID: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchBar({
  setSelectedCate,
  setMatchShopID,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState<string>("");
  const [results, setResults] = useState<SearchBarInt[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // ติดตาม index ที่เลือก
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1); // ติดตาม index ที่ hover

  useEffect(() => {
    if (keyword.length > 2) {
      const fetchData = async () => {
        setIsSearching(true);
        const data = await fetchShopByWord(keyword);
        setResults(data);
        setIsSearching(false);
        setHighlightedIndex(-1); // รีเซ็ต index เมื่อมีผลใหม่
      };
      fetchData();
    } else {
      setResults([]);
      setHighlightedIndex(-1); // รีเซ็ต index ถ้าค้นหาน้อยกว่า 2 ตัวอักษร
    }
  }, [keyword]);

  useEffect(() => {
    if (keyword.length > 0) {
      setSelectedCate(0);
    }
  }, [keyword, setSelectedCate]);

  const handleSelectShop = (shopId: number) => {
    setMatchShopID(shopId);
    setKeyword("");
    setSelectedShopId(shopId);
    setHighlightedIndex(-1); // รีเซ็ต index หลังเลือก
    setHoveredIndex(-1); // รีเซ็ต hover
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : results.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectShop(results[highlightedIndex].shop_id);
    }
  };

  return (
    <div className="mb-1">
      {/* Search Bar */}
      <div className="mt-2">
        <input
          type="text"
          className="w-full p-3 border rounded-[30px]"
          placeholder="Search for a shop name or interest..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown} // รองรับปุ่มลูกศรและ Enter
        />
      </div>

      {/* Results on mobile */}
      <div className="sm:hidden">
        {keyword.length > 2 && results.length === 0 && !isSearching && (
          <p className="bg-white border border-gray-200 rounded-md font-light text-[14px] p-2">
            No shops/products found
          </p>
        )}

        {results.length > 0 && (
          <ul className="bg-white border border-gray-200 rounded-md font-light text-[14px]">
            {results.map((shop, index) => (
              <li
                key={shop?.shop_id}
                className={`p-2 border-b last:border-none cursor-pointer 
                  ${highlightedIndex === index ? "bg-gray-200" : ""}
                  ${
                    hoveredIndex === index && highlightedIndex !== index
                      ? "bg-gray-100"
                      : ""
                  }
                `}
                onClick={() => handleSelectShop(shop?.shop_id!)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                {shop?.matchWord}
              </li>
            ))}
          </ul>
        )}

        {isSearching && keyword.length > 2 && (
          <p className="bg-white border border-gray-200 rounded-md font-light text-[14px]">
            Searching...
          </p>
        )}
      </div>

      {/* Dropdown Results on desktop */}
      <div className="hidden sm:block relative">
        {keyword.length > 2 && results.length === 0 && !isSearching && (
          <p className="bg-white border border-gray-200 rounded-md font-light text-[14px] p-2">
            No shops/products found
          </p>
        )}

        {results.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md font-light text-[14px]">
            {results.map((shop, index) => (
              <li
                key={shop?.shop_id}
                className={`p-2 border-b last:border-none cursor-pointer 
                  ${highlightedIndex === index ? "bg-gray-200" : ""}
                  ${
                    hoveredIndex === index && highlightedIndex !== index
                      ? "bg-gray-100"
                      : ""
                  }
                `}
                onClick={() => handleSelectShop(shop?.shop_id!)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                {shop?.matchWord}
              </li>
            ))}
          </ul>
        )}

        {isSearching && keyword.length > 2 && (
          <p className="bg-white border border-gray-200 rounded-md font-light text-[14px]">
            Searching...
          </p>
        )}
      </div>
    </div>
  );
}
