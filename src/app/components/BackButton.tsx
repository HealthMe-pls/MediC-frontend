"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
  const router = useRouter();
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  useEffect(() => {
    setPreviousPage(sessionStorage.getItem("previousPage") || "/");
  }, []);

  return (
    <div
      className="bg-white w-full h-[50px] fixed top-0 left-0 z-50 shadow-md"
      style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
    >
      <button onClick={() => router.push(previousPage || "/")} className="pt-4 pl-4">
        <svg
          width="12"
          height="22"
          viewBox="0 0 12 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4133 19.7117C11.5004 19.7988 11.5695 19.9022 11.6166 20.016C11.6638 20.1298 11.688 20.2518 11.688 20.375C11.688 20.4982 11.6638 20.6201 11.6166 20.7339C11.5695 20.8477 11.5004 20.9512 11.4133 21.0383C11.3262 21.1254 11.2228 21.1945 11.109 21.2416C10.9952 21.2887 10.8732 21.313 10.75 21.313C10.6268 21.313 10.5048 21.2887 10.391 21.2416C10.2772 21.1945 10.1738 21.1254 10.0867 21.0383L0.711724 11.6633C0.624558 11.5762 0.55541 11.4728 0.508231 11.359C0.461052 11.2452 0.436768 11.1232 0.436768 11C0.436768 10.8768 0.461052 10.7548 0.508231 10.641C0.55541 10.5272 0.624558 10.4238 0.711724 10.3367L10.0867 0.961691C10.2626 0.785778 10.5012 0.686951 10.75 0.686951C10.9988 0.686951 11.2374 0.785778 11.4133 0.961691C11.5892 1.1376 11.688 1.37619 11.688 1.62497C11.688 1.87375 11.5892 2.11234 11.4133 2.28825L2.7004 11L11.4133 19.7117Z"
            fill="#4C4343"
          />
        </svg>
      </button>
    </div>
  );
};

export default BackButton;
