import Link from "next/link";
import { useEffect, useState } from "react";

const pages = [
  { name: "Market Map", path: "/" },
  { name: "Highlighted Workshops & Events", path: "/workshops" },
  { name: "About Us", path: "/about-us" },
];

export default function CustomerNavigation() {
  const [currentPage, setCurrentPage] = useState<string>("");
  useEffect(() => {
    const page = pages.find((p) => p.path === window.location.pathname);
    setCurrentPage(page ? page.name : "Unknown Page");
  }, []);
  return (
    <div className="space-x-4 lg:flex hidden ">
      {pages.map((page, index) => (
        <Link key={index} href={page.path}>
          <button
            className={`my-2 w-full py-3  text-center px-4  ${
              currentPage === page.name ? "underline" : ""
            }`}
            onClick={() => setCurrentPage(page.name)}
          >
            {page.name}
          </button>
        </Link>
      ))}
    </div>
  );
}
