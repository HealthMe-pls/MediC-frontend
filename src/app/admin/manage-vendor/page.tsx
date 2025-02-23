"use client";

import { useState, useEffect } from "react";
import {
  fetchEntrepreneur,
  fetchShopEntById,
  Entrepreneur,
} from "../../../utility/entrepreneur";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function ManageVendor() {
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<string, boolean>
  >({});
  const [shopCounts, setShopCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchEntrepreneur()
      .then((data) => {
        setEntrepreneurs(data);
        data.forEach((ent) => {
          fetchShopEntById(ent.id)
            .then((shopData) => {
              setShopCounts((prev) => ({ ...prev, [ent.id]: shopData.length }));
            })
            .catch((error) =>
              console.error("Error fetching shop count:", error)
            );
        });
      })
      .catch((error) => console.error("Error fetching entrepreneurs:", error));
  }, []);

  const togglePasswordVisibility = (username: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  return (
    <div className="h-screen flex flex-col">
      {entrepreneurs.map((ent) => (
        <div key={ent.id} className="flex flex-row items-center">
          <p className="mx-5">{ent.username}</p>
          <p className="mr-2">
            {visiblePasswords[ent.username] ? ent.password : "••••••"}
          </p>
          <button onClick={() => togglePasswordVisibility(ent.username)}>
            {visiblePasswords[ent.username] ? <EyeOffIcon /> : <EyeIcon />}
          </button>
          <p className="mr-2">Shops: {shopCounts[ent.id] ?? "Loading..."}</p>
        </div>
      ))}
    </div>
  );
}
