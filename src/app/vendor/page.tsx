"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VendorLayouts from "../layouts/VendorLayouts";
import LandingPic from "../../../public/assets/1.png";
import Image from "next/image";
import {
  getShopDetailsByLoggedInEntrepreneur,
  TempShopEn,
} from "@/utility/entrepreneurLogin";

export default function VendorLandingPage() {
  const [, setShopData] = useState<TempShopEn[]>([]);
  const [, setSelectedShop] = useState<TempShopEn | null>(null);
  const [, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsLoggedIn(false);
      router.push("/login");
    } else {
      const fetchShopData = async () => {
        try {
          const response = await getShopDetailsByLoggedInEntrepreneur();

          if ("error" in response) {
            setError(response.error);
            setShopData([]);
          } else {
            setShopData(response.temp_shops);

            if (response.temp_shops.length > 0) {
              setSelectedShop(response.temp_shops[0]);
            }
          }
        } catch (err) {
          setError(`Failed to load shop data ${err}`);
          setShopData([]); // Ensure it's an empty array
        }
      };

      fetchShopData();
    }
  }, [router]);

  return (
    <VendorLayouts currentPage="">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-[50%] h-[50%] ">
          <Image src={LandingPic} alt="Landing Picture" layout="responsive" />
        </div>
        {isLoggedIn === false && (
          <p>Please log in to access the Vendor Dashboard.</p>
        )}
      </div>
    </VendorLayouts>
  );
}
