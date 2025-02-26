import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/assets/logo.png";

interface AdminNavigationProps {
  currentPage: string;
}

const pages = [
  { name: "Manage Market Map", path: "/admin/manage-market-map" },
  { name: "Manage Vendor", path: "/admin/manage-vendor" },
  { name: "Manage Market Hours", path: "/admin/manage-market-hours" },
  { name: "Manage Shop Hours", path: "/admin/manage-shop-hours" },
  { name: "Shop Hours Summary", path: "/admin/shop-hours-summary" },

  {
    name: "Manage Highlighted Workshop & Event",
    path: "/admin/manage-highlighted-workshop",
  },
  { name: "Edit About Us", path: "/admin/edit-about-us" },
  { name: "Notification", path: "/admin/notifications" },
];

export default function AdminNavigation({ currentPage }: AdminNavigationProps) {
  return (
    <aside className="w-1/5 min-h-screen bg-white p-4 shadow-md rounded-r-[40px]  border-gray-200">
      <Image src={Logo} alt="Logo" className="w-[50%] mx-auto my-8" />
      <div className="space-y-4 ">
        {pages.map((page, index) => (
          <Link key={index} href={page.path}>
            <button
              className={`my-2 w-full py-3 rounded-20 text-center px-4 font-medium hover:bg-[#DBDBDB] transition-colors duration-200 ${
                currentPage === page.name
                  ? "bg-[#D5EBD6]"
                  : "bg-[#F0F0F0] text-[#929292]"
              }`}
            >
              {page.name}
            </button>
          </Link>
        ))}
      </div>
    </aside>
  );
}
