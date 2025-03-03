"use client";

import { useEffect, useState } from "react";
import { getShopDetailsByLoggedInEntrepreneur, Shop } from "@/utility/entrepreneurLogin";

const Dashboard = () => {
  const [shopData, setShopData] = useState<Shop[]>([]);  // Initialize as an empty array
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await getShopDetailsByLoggedInEntrepreneur();
        
        if ("error" in response) {
          setError(response.error);
          setShopData([]);  // Ensure it's an empty array, not null
        } else {
          setShopData(response);
        }
      } catch (err) {
        setError("Failed to load shop data");
        setShopData([]);  // Ensure it's an empty array
      }
    };

    fetchShopData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Show error if any */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Show shop data if available */}
      {shopData.length > 0 ? (
        <div>
          <h2>Your Shops</h2>
          <ul>
            {shopData.map((shop) => (
              <li key={shop.shop_id}>
                <strong>{shop.name}</strong> - {shop.category}
                <ul>
                  <li>Status: {shop.open_status}</li>
                  <li>Description: {shop.description}</li>
                  <li>Photos: {shop.photos?.length > 0 ? shop.photos.join(", ") : "No photos available"}</li>
                  <li>Shop Open Dates: {shop.shop_open_dates?.join(", ")}</li>
                  <li>Menus: {shop.menus?.join(", ")}</li>
                  <li>Social Media: {shop.social_media?.join(", ")}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{error ? "No shops found." : "Loading your shop data..."}</p>
      )}
    </div>
  );
};

export default Dashboard;
