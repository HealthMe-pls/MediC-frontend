"use client";

import { useEffect, useState } from "react";
import { getShopDetailsByLoggedInEntrepreneur, TempShopEn } from "@/utility/entrepreneurLogin";
import { logoutEntrepreneur } from "@/utility/login"; 
import { useRouter } from "next/navigation"; 

const Dashboard = () => {
  const [shopData, setShopData] = useState<TempShopEn[]>([]);  
  const [error, setError] = useState<string | null>(null);
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
          }
        } catch (err) {
          setError("Failed to load shop data");
          setShopData([]);  
        }
      };

      fetchShopData();
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        await logoutEntrepreneur(token);
        setIsLoggedIn(false);
        localStorage.removeItem("authToken");
        router.push("/login");  
      } else {
        console.error("No token found, cannot log out.");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {shopData.length > 0 ? (
        <div>
          <h2>Your Shops</h2>
          <ul>
            {shopData.map((shop) => (
              <li key={shop.shop_id}>
                <strong>{shop.name}</strong> - {shop.shop_id}
                <ul>
                  <li><strong>Entrepreneur ID:</strong> {shop.entrepreneur_id}</li>

                  {/* Socials */}
                  <li><strong>Socials:</strong> 
                    {shop.socials.length > 0 
                      ? shop.socials.map((s, index) => <span key={index}>{s.platform} ({s.link}) | </span>) 
                      : "No socials available"}
                  </li>

                  {/* Menus */}
                  <li><strong>Menus:</strong> 
                    {shop.menus.length > 0 
                      ? shop.menus.map((menu) => <span key={menu.id}>{menu.product_name} | </span>) 
                      : "No menus available"}
                  </li>

                  {/* Photos */}
                  <li><strong>Shop Photos:</strong> 
                    {shop.photos_shop.length > 0 
                      ? shop.photos_shop.map((photo, index) => <span key={index}>{photo.path_file} | </span>) 
                      : "No photos available"}
                  </li>
                  <li><strong>Menu Photos:</strong> 
                    {shop.photos_menu.length > 0 
                      ? shop.photos_menu.map((photo, index) => <span key={index}>{photo.path_file} | </span>) 
                      : "No menu photos available"}
                  </li>

                  {/* Time Details */}
                  <li><strong>Shop Open Dates:</strong> 
                    {shop.time.length > 0 
                      ? shop.time.map((date, index) => <span key={index}>{date.start_time} - {date.end_time} | </span>) 
                      : "No open dates available"}
                  </li>
                  <li><strong>Added Time:</strong> 
                    {shop.addTime.length > 0 
                      ? shop.time.map((date, index) => <span key={index}>{date.start_time} - {date.end_time} | </span>)
                      : "No added times available"}
                  </li>
                  <li><strong>Edited Time:</strong> 
                    {shop.editTime.length > 0 
                      ? shop.time.map((date, index) => <span key={index}>{date.start_time} - {date.end_time} | </span>)
                      : "No edited times available"}
                  </li>
                  <li><strong>Deleted Time:</strong> 
                    {shop.deleteTime.length > 0 
                      ? shop.time.map((date, index) => <span key={index}>{date.start_time} - {date.end_time} | </span>)
                      : "No deleted times available"}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{error ? "No shops found." : "Loading your shop data..."}</p>
      )}

      {isLoggedIn && (
        <button onClick={handleLogout} style={{ marginTop: "20px" }}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default Dashboard;
