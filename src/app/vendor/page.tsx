"use client";

import { useEffect, useState } from "react";
import {
  getShopDetailsByLoggedInEntrepreneur,
  Shop,
} from "@/utility/entrepreneurLogin";
import { logoutEntrepreneur } from "@/utility/login"; // Import the logout function
import { useRouter } from "next/navigation"; // Import the useRouter hook for navigation

const Dashboard = () => {
  const [shopData, setShopData] = useState<Shop[]>([]); // Initialize as an empty array
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // State to track if user is logged in
  const router = useRouter(); // Instantiate the router

  useEffect(() => {
    // Check if the user is logged in (by checking if the token exists)
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsLoggedIn(false); // If no token is found, the user is not logged in
      router.push("/login"); // Redirect to login page
    } else {
      // Fetch shop data if the user is logged in
      const fetchShopData = async () => {
        try {
          const response = await getShopDetailsByLoggedInEntrepreneur(); // Pass token for authentication

          if ("error" in response) {
            setError(response.error);
            setShopData([]); // Ensure it's an empty array, not null
          } else {
            setShopData(response);
          }
        } catch (err) {
          setError(`Failed to load shop data ${err}`);
          setShopData([]); // Ensure it's an empty array
        }
      };

      fetchShopData();
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      // Get the token from localStorage (or wherever it's stored)
      const token = localStorage.getItem("authToken");

      if (token) {
        // Call the imported logout function with the token
        await logoutEntrepreneur(token);

        // Update the state to reflect logged-out status
        setIsLoggedIn(false);

        // Clear the token from localStorage
        localStorage.removeItem("authToken");

        // Optionally, redirect the user to the login page after logout
        router.push("/login"); // Navigate to the login page after successful logout
      } else {
        console.error("No token found, cannot log out.");
        // Optionally redirect to login if the token is not found
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

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
                  <li>
                    Photos:{" "}
                    {shop.photos?.length > 0
                      ? shop.photos.join(", ")
                      : "No photos available"}
                  </li>
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

      {/* Logout Button */}
      {isLoggedIn && (
        <button onClick={handleLogout} style={{ marginTop: "20px" }}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default Dashboard;
