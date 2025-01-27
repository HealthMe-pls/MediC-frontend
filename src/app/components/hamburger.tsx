"use client";

import Link from "next/link";
import styles from "../../styles/Header.module.css";

interface HamburgerProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div>
      <svg
        width="30"
        height="24"
        viewBox="0 0 30 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 12C30 12.3315 29.8683 12.6495 29.6339 12.8839C29.3995 13.1183 29.0815 13.25 28.75 13.25H1.25C0.918479 13.25 0.600537 13.1183 0.366117 12.8839C0.131696 12.6495 0 12.3315 0 12C0 11.6685 0.131696 11.3505 0.366117 11.1161C0.600537 10.8817 0.918479 10.75 1.25 10.75H28.75C29.0815 10.75 29.3995 10.8817 29.6339 11.1161C29.8683 11.3505 30 11.6685 30 12ZM1.25 3.25H28.75C29.0815 3.25 29.3995 3.1183 29.6339 2.88388C29.8683 2.64946 30 2.33152 30 2C30 1.66848 29.8683 1.35054 29.6339 1.11612C29.3995 0.881696 29.0815 0.75 28.75 0.75H1.25C0.918479 0.75 0.600537 0.881696 0.366117 1.11612C0.131696 1.35054 0 1.66848 0 2C0 2.33152 0.131696 2.64946 0.366117 2.88388C0.600537 3.1183 0.918479 3.25 1.25 3.25ZM28.75 20.75H1.25C0.918479 20.75 0.600537 20.8817 0.366117 21.1161C0.131696 21.3505 0 21.6685 0 22C0 22.3315 0.131696 22.6495 0.366117 22.8839C0.600537 23.1183 0.918479 23.25 1.25 23.25H28.75C29.0815 23.25 29.3995 23.1183 29.6339 22.8839C29.8683 22.6495 30 22.3315 30 22C30 21.6685 29.8683 21.3505 29.6339 21.1161C29.3995 20.8817 29.0815 20.75 28.75 20.75Z"
          fill="#4C4343"
        />
      </svg>

      {/* Menu Drawer */}
      {isMenuOpen && (
        <div
          className={`{styles.menu-drawer}${
            isMenuOpen
              ? "block fixed top-[40px] right-0 z-50 bg-white text-black p-6"
              : "hidden"
          } w-full h-full sm:w-[350px] sm:h-[100%] sm:right-0 sm:top-0`}
        >
          <ul className="space-y-4">
            <li>
              <button
                className="hover:text-gray-300 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex justify-end mb-8 mr-8">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.1008 17.7742C19.1879 17.8613 19.257 17.9647 19.3041 18.0785C19.3512 18.1923 19.3755 18.3143 19.3755 18.4375C19.3755 18.5607 19.3512 18.6827 19.3041 18.7965C19.257 18.9103 19.1879 19.0137 19.1008 19.1008C19.0137 19.1879 18.9102 19.257 18.7964 19.3041C18.6826 19.3513 18.5607 19.3755 18.4375 19.3755C18.3143 19.3755 18.1923 19.3513 18.0785 19.3041C17.9647 19.257 17.8613 19.1879 17.7742 19.1008L9.99997 11.3254L2.22575 19.1008C2.04984 19.2767 1.81125 19.3755 1.56247 19.3755C1.31369 19.3755 1.0751 19.2767 0.899191 19.1008C0.723278 18.9249 0.624451 18.6863 0.624451 18.4375C0.624451 18.1887 0.723278 17.9501 0.899191 17.7742L8.67458 10L0.899191 2.22578C0.723278 2.04987 0.624451 1.81128 0.624451 1.5625C0.624451 1.31372 0.723278 1.07513 0.899191 0.899221C1.0751 0.723308 1.31369 0.624481 1.56247 0.624481C1.81125 0.624481 2.04984 0.723308 2.22575 0.899221L9.99997 8.67461L17.7742 0.899221C17.9501 0.723308 18.1887 0.624481 18.4375 0.624481C18.6863 0.624481 18.9248 0.723308 19.1008 0.899221C19.2767 1.07513 19.3755 1.31372 19.3755 1.5625C19.3755 1.81128 19.2767 2.04987 19.1008 2.22578L11.3254 10L19.1008 17.7742Z"
                      fill="#4C4343"
                    />
                  </svg>
                </div>
              </button>
            </li>
            <li>
              <Link
                href="./"
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={styles.linkHamburger}>
                  <p className="ml-5">Market Map</p>
                </div>
              </Link>
            </li>

            <li>
              <Link
                href="/workshop"
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={styles.linkHamburger}>
                  <p className="ml-5">Highlighted Workshops</p>
                </div>
              </Link>
            </li>

            <li>
              <Link
                href="/adminPage"
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={styles.linkHamburger}>
                  <p className="ml-5">Admin page</p>
                  </div>
              </Link>
            </li>
            <li>
              <Link
                href="./"
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={styles.linkHamburger}>
                  <p className="ml-5">About Us</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
