"use client";

import React, { useEffect, useState } from "react";
import AdminLayouts from "@/app/layouts/AdminLayouts";
import axios from "axios";
import { fetchMarketOpenDates, MarketOpenDate } from "@/utility/ManageMarketHours";
import { normalizeMarketHourDates } from "@/utility/marketHourUtils";
import MarketHourTable from "@/app/components/MarketHourTable";
import MarketHourFormModal from "@/app/components/MarketHourFormModal";
import MarketHourDeleteModal from "@/app/components/MarketHourDeleteModal";

const ManageMarketHours = () => {
  const [marketHourDates, setMarketHourDates] = useState<MarketOpenDate[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [editingDate, setEditingDate] = useState<MarketOpenDate | null>(null);
  const [dateToDelete, setDateToDelete] = useState<MarketOpenDate | null>(null);

  useEffect(() => {
    fetchMarketOpenDates()
      .then((data) => {
        const normalizedDates = normalizeMarketHourDates(data.market_open_dates);
        setMarketHourDates(normalizedDates);

        if (normalizedDates.length > 0) {
          const firstDate = new Date(normalizedDates[0].date);
          setSelectedYear(firstDate.getFullYear());
          setSelectedMonth(firstDate.getMonth());
        }
      })
      .catch((error) => console.error("Error fetching market open dates:", error));
  }, []);

  const handlePreviousMonth = () => {
    setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (selectedMonth === 0) setSelectedYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (selectedMonth === 11) setSelectedYear((prev) => prev + 1);
  };

  const openAddModal = () => {
    setEditingDate(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item: MarketOpenDate) => {
    setEditingDate(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: MarketOpenDate) => {
    setDateToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleModalSubmit = async (
    data: { date: string; start_time: string; end_time: string },
    editingDate?: MarketOpenDate | null
  ) => {
    try {
      if (editingDate) {
        await axios.put(`/api/marketDate/${editingDate.id}`, data);
      } else {
        await axios.post(`/api/marketDate/`, data);
      }
      const updatedDates = await fetchMarketOpenDates();
      setMarketHourDates(normalizeMarketHourDates(updatedDates.market_open_dates));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to submit market hour data:", error);
    }
  };

  const confirmDelete = async () => {
    if (!dateToDelete) return;
    try {
      await axios.delete(`/api/marketDate/${dateToDelete.id}`);
      const updatedDates = await fetchMarketOpenDates();
      setMarketHourDates(normalizeMarketHourDates(updatedDates.market_open_dates));
      setIsDeleteModalOpen(false);
      setDateToDelete(null);
    } catch (error) {
      console.error("Failed to delete market hour data:", error);
    }
  };

  const filteredDates = marketHourDates.filter((item) => {
    const date = new Date(item.date);
    return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
  });

  const currentMonthDisplay = new Date(selectedYear, selectedMonth, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <AdminLayouts currentPage="Manage Market Hours">
      <div className="h-screen flex flex-col">
        <section className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={openAddModal} className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition duration-200">
              Add Market Hour
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <button onClick={handlePreviousMonth} className="text-2xl">
              &lt;
            </button>
            <span className="text-lg font-medium">{currentMonthDisplay}</span>
            <button onClick={handleNextMonth} className="text-2xl">
              &gt;
            </button>
          </div>

          <MarketHourTable marketHourDates={filteredDates} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </section>
      </div>

      <MarketHourFormModal
        isOpen={isModalOpen}
        editingDate={editingDate}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      <MarketHourDeleteModal
        isOpen={isDeleteModalOpen}
        dateToDelete={dateToDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDateToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </AdminLayouts>
  );
};

export default ManageMarketHours;
