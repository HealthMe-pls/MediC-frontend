"use client"; // ✅ บอกให้ Next.js รันโค้ดฝั่ง Client เท่านั้น

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ ใช้ 'next/navigation' แทน 'next/router'
import axios from "axios";

interface AuthResponse {
  access_token: string;
}

const Callback = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ✅ ทำให้แน่ใจว่าโค้ดนี้รันบน Client

    if (!isClient) return; // ⛔ หยุดถ้ายังไม่ใช่ Client

    const fetchToken = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (code) {
        try {
          const response = await axios.get<AuthResponse>(
            `http://localhost:8080/callback?code=${code}`
          );
          localStorage.setItem("access_token", response.data.access_token);
          router.push("/profile"); // ✅ Redirect หลังจาก login สำเร็จ
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      }
    };

    fetchToken();
  }, [router, isClient]);

  return <p>Processing login...</p>;
};

export default Callback;
