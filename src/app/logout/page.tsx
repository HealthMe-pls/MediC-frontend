"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutWithInfomaniak } from "@/utility/auth"; // Import your logout utility

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await logoutWithInfomaniak(); // Call the utility to handle logout
        router.push("/login"); // Redirect to login page after logout
      } catch (error) {
        console.error("Error logging out:", error);
        router.push("/login"); // Redirect to login page if there's an error
      }
    };

    logoutUser();
  }, [router]);

  return <div>Logging you out...</div>; // Show this message while logging out
};

export default LogoutPage;
