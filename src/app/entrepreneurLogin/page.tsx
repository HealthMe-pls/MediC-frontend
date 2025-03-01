// /pages/dashboard.tsx (or wherever your Dashboard component is)

"use client";

import { useEffect, useState } from "react";
import { getShopDetailsByLoggedInEntrepreneur, Shop } from "@/utility/entrepreneurLogin";  // Import the utility function

const Dashboard = () => {
  const [shopData, setShopData] = useState<Shop[] | null>(null);  // To store shop data
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopData = async () => {
      const response = await getShopDetailsByLoggedInEntrepreneur();
      const token = localStorage.getItem("authToken");
      if (!token) {
        return { error: "No token found. Please log in." };
      }
      if ("error" in response) {
        setError(response.error);  // If the response has an error, show it
      } else {
        setShopData(response);  // Set the shop data to state
      }
    };

    fetchShopData();
  }, []);  // Empty dependency array means it will run only on component mount

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Show error if any */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Show shop data if available */}
      {shopData ? (
        <div>
          <h2>Your Shops</h2>
          <ul>
            {shopData.length > 0 ? (
              shopData.map((shop) => (
                <li key={shop.shop_id}>
                  <strong>{shop.name}</strong> - {shop.category}
                  <ul>
                    <li>Status: {shop.open_status}</li>
                    <li>Description: {shop.description}</li>
                    <li>Photos: {shop.photos.length > 0 ? shop.photos.join(", ") : "No photos available"}</li>
                    <li>Shop Open Dates: {shop.shop_open_dates.join(", ")}</li>
                    <li>Menus: {shop.menus.join(", ")}</li>
                    <li>Social Media: {shop.social_media.join(", ")}</li>
                  </ul>
                </li>
              ))
            ) : (
              <li>No shops found.</li>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading your shop data...</p> // Show loading state while fetching
      )}
    </div>
  );
};

export default Dashboard;
