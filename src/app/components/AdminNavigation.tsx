import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/assets/logo.png";

interface AdminNavigationProps {
  currentPage: string;
  isNavOpen: boolean;
  toggleNav: () => void;
}

const pages = [
  { name: "Manage Market Map", path: "/admin/manage-market-map" },
  { name: "Manage Vendor", path: "/admin/manage-vendor" },
  { name: "Manage Market Hours", path: "/admin/manage-market-hours" },
  { name: "Shop Hours Summary", path: "/admin/shop-hours-summary" },
  {
    name: "Manage Highlighted Workshop & Event",
    path: "/admin/manage-highlighted-workshop",
  },

  { name: "Reported Issues", path: "/admin/reported-issues" },
  { name: "Pending Approval", path: "/admin/pending-approval" },
  { name: "Edit About Us", path: "/admin/edit-about-us" },
];

export default function AdminNavigation({
  currentPage,
  isNavOpen,
  toggleNav,
}: AdminNavigationProps) {
  return (
    <>
      <aside
        className={`fixed lg:relative top-0 left-0 w-[250px] h-dvh bg-white p-4 shadow-md rounded-r-[40px] border-gray-200 transition-transform duration-300 z-20 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={Logo} alt="Logo" className="w-[50%] mx-auto my-8" />
        <div className="space-y-4 overflow-y-auto">
          {pages.map((page, index) => (
            <Link key={index} href={page.path}>
              <button
                className={`my-2 w-full py-3 rounded-20 text-center px-4 font-medium hover:bg-[#DBDBDB] transition-colors duration-200 ${
                  currentPage === page.name
                    ? "bg-[#D5EBD6]"
                    : "bg-[#F0F0F0] text-[#929292]"
                }`}
                onClick={toggleNav}
              >
                {page.name}
              </button>
            </Link>
          ))}
        </div>
      </aside>
      <div
        className={`fixed inset-0 bg-[#6d6d6d] transition-opacity duration-300 ${
          isNavOpen ? "opacity-30" : "opacity-0 pointer-events-none"
        } z-19`}
        onClick={toggleNav}
      ></div>
    </>
  );
}
