"use client";

import Link from "next/link";

interface HamburgerProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div>
      {/* Menu Drawer */}
      {isMenuOpen && (
        <div className="absolute top-0 right-0 bg-blue-600 p-4 w-48 h-full">
          <ul className="text-white space-y-4">
            <li>
              <Link
                href="./"
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                home
              </Link>
            </li>
            <li>
              <Link
                href="/workshop"
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                work shop
              </Link>
            </li>
            <li>
              <Link
                href="/adminPage"
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                admin page
              </Link>
            </li>
            {/* Close Tab */}
            <li>
              <button
                className="text-left hover:text-gray-300 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Close
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
