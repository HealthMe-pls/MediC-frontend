import { useState, useEffect } from "react";
import { fetchShopByWord, SearchBarInt } from "@/utility/searchbar";

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>("");
  const [results, setResults] = useState<SearchBarInt[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (keyword.length > 2) {
      const fetchData = async () => {
        setIsSearching(true);
        const data = await fetchShopByWord(keyword);
        setResults(data);
        setIsSearching(false);
      };
      fetchData();
    } else {
      setResults([]); // Clear results when search input is less than or equal to 2 characters
    }
  }, [keyword]);

  return (
    <div className="mb-4">
      {/* Search Bar */}
      <div className="mt-2">
        <div className="">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      {keyword.length > 2 && results.length === 0 && !isSearching ? (
        <p className="bg-white border border-gray-200 rounded-md font-light text-[14px] p-2 border-b last:border-none">
          No shops/products found
        </p>
      ) : null}

      {results.length > 0 ? (
        <ul className="bg-white border border-gray-200 rounded-md font-light text-[14px]">
          {results
            .filter((shop) => shop !== null)
            .map((shop) => (
              <li key={shop?.shop_id} className="p-2 border-b last:border-none">
                {shop?.matchWord} (ID: {shop?.shop_id})
              </li>
            ))}
        </ul>
      ) : isSearching && keyword.length > 2 ? (
        <p className="bg-white border border-gray-200 rounded-md font-light text-[14px]">
          Searching...
        </p>
      ) : null}
    </div>
  );
}
