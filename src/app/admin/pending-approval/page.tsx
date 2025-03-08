"use client";
import React, { useEffect, useState } from "react";
import { fetchTempShop, TempShop } from "./pendingApproval";
import PendingCard from "./pending-card";
import AdminLayouts from "@/app/layouts/AdminLayouts";
import SearchPending from "./search-pending";
// import { te } from "date-fns/locale";

export default function PendingApprovalPage() {
  const [tempShops, setTempShops] = useState<TempShop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTempShop();
        // console.log("response", response);
        setTempShops(response.temp_shops);
      } catch (error) {
        setError(`Failed to fetch TempShops: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredShops = tempShops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AdminLayouts currentPage="Pending Approval">
        <div className="p-4 flex flex-col gap-2">
          <SearchPending onChanges={handleSearchChange} />

          <div className="p-8 grid grid-cols-1 gap-4 max-h-[650px] overflow-y-auto scrollbar-hide">
            {filteredShops.map((shop) => (
              <PendingCard key={shop.id} tempshop={shop} />
            ))}
          </div>
        </div>
      </AdminLayouts>
    </div>
  );
}
