"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchWorkshopsById, Workshop } from "@/utility/workshop";
// import Footer from "@/app/layouts/Footer";
const WorkshopDetail = () => {
  const { id } = useParams();
  const [workshopDetail, setWorkshopDetail] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await fetchWorkshopsById(Number(id));
          setWorkshopDetail(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          setError("Failed to fetch workshop details by id (useeffect)");
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
      {workshopDetail ? (
        <div>
          <h1>{workshopDetail.name}</h1>
          <p>{workshopDetail.description}</p>
        </div>
      ) : (
        <p>No workshop details found</p>
      )}
    </div>
  );
};

export default WorkshopDetail;
