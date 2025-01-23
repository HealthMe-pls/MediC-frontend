"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchShopById, ShopDetail } from "@/utility/shopDetail";

const ShopPage = () => {
  const { id } = useParams();
  const [shopDetail, setShopDetail] = useState<ShopDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await fetchShopById(Number(id));
          setShopDetail(data);
        } catch (error) {
          setError("Failed to fetch shop details");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {shopDetail ? (
        <div>
          <h1>{shopDetail.name}</h1>
          <p>{shopDetail.full_description}</p>
          {/* Render other shop details as needed */}
        </div>
      ) : (
        <p>No shop details found</p>
      )}
    </div>
  );
};

export default ShopPage;
