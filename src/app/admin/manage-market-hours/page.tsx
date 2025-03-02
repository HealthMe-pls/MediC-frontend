"use client";

import React, { useEffect, useState } from "react";
import AdminLayouts from "@/app/layouts/AdminLayouts";
import { fetchMarketOpenDates, MarketOpenDate } from "@/utility/ManageMarketHours";
import axios from "axios";

const combineDateTime = (date: string, time: string): string => {
  return new Date(`${date}T${time}:00`).toISOString();
};

const normalizeMarketDates = (dates: MarketOpenDate[]): MarketOpenDate[] => {
  return dates
    .map((item) => ({
      ...item,
      date: new Date(item.date).toISOString(),
      start_time: new Date(item.start_time).toISOString(),
      end_time: new Date(item.end_time).toISOString(),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const ShopHoursSummaryPage = () => {
  const [marketOpenDates, setMarketOpenDates] = useState<MarketOpenDate[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // New state to track which date we are editing or deleting
  const [editingDate, setEditingDate] = useState<MarketOpenDate | null>(null);
  const [dateToDelete, setDateToDelete] = useState<MarketOpenDate | null>(null);

  // Form fields
  const [newDate, setNewDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    fetchMarketOpenDates()
      .then((data) => {
        const normalizedDates = normalizeMarketDates(data);
        setMarketOpenDates(normalizedDates);

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

  // Reset form fields and editing state
  const resetForm = () => {
    setNewDate("");
    setStartTime("");
    setEndTime("");
    setEditingDate(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // When clicking edit, prefill the form and set editing mode
  const handleEditClick = (item: MarketOpenDate) => {
    setEditingDate(item);
    setNewDate(item.date.split("T")[0]); // extract YYYY-MM-DD
    setStartTime(new Date(item.start_time).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    setEndTime(new Date(item.end_time).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    setIsModalOpen(true);
  };

  // When clicking delete, show a confirmation modal
  const handleDeleteClick = (item: MarketOpenDate) => {
    setDateToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const newDateData = {
        date: combineDateTime(newDate, "00:00"),
        start_time: combineDateTime(newDate, startTime),
        end_time: combineDateTime(newDate, endTime),
      };

      if (editingDate) {
        // Update market open date via PUT
        await axios.put(`http://127.0.0.1:8080/marketDate/${editingDate.id}`, newDateData);
      } else {
        // Create new market open date via POST
        await axios.post("http://127.0.0.1:8080/marketDate/", newDateData);
      }

      const updatedDates = await fetchMarketOpenDates();
      setMarketOpenDates(normalizeMarketDates(updatedDates));
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to submit market open date:", error);
    }
  };

  const confirmDelete = async () => {
    if (!dateToDelete) return;
    try {
      await axios.delete(`http://127.0.0.1:8080/marketDate/${dateToDelete.id}`);
      const updatedDates = await fetchMarketOpenDates();
      setMarketOpenDates(normalizeMarketDates(updatedDates));
      setIsDeleteModalOpen(false);
      setDateToDelete(null);
    } catch (error) {
      console.error("Failed to delete market open date:", error);
    }
  };

  const filteredDates = marketOpenDates.filter((item) => {
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
            <button
              onClick={openAddModal}
              className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              Add Date
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <button onClick={handlePreviousMonth} className="text-2xl">&lt;</button>
            <span className="text-lg font-medium">{currentMonthDisplay}</span>
            <button onClick={handleNextMonth} className="text-2xl">&gt;</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-left">Opening Date</th>
                  <th className="border px-4 py-2 text-left">From</th>
                  <th className="border px-4 py-2 text-left">To</th>
                  <th className="border px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDates.length > 0 ? (
                  filteredDates.map((date) => (
                    <tr key={date.id} className="border-b">
                      <td className="px-4 py-2">
                        {new Date(date.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(date.start_time).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(date.end_time).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => handleEditClick(date)}
                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(date)}
                          className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No dates available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {editingDate ? "Edit Market Open Date" : "Add Market Open Date"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                {editingDate ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && dateToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this market open date?</p>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDateToDelete(null);
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayouts>
  );
};

export default ShopHoursSummaryPage;
