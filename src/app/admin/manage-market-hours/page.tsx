// "use client";

import AdminLayouts from "@/app/layouts/AdminLayouts";

// import React, { useEffect, useState } from "react";
// import AdminLayouts from "@/app/layouts/AdminLayouts";
// import { fetchMarketOpenDates, MarketOpenDate } from "@/utility/ManageMarketHours";
// import axios from "axios";

// const combineDateTime = (date: string, time: string): string => {
//   return new Date(`${date}T${time}:00`).toISOString();
// };

// const normalizeMarketDates = (dates: MarketOpenDate[]): MarketOpenDate[] => {
//   return dates
//     .map((item) => ({
//       ...item,
//       date: new Date(item.date).toISOString(),
//       start_time: new Date(item.start_time).toISOString(),
//       end_time: new Date(item.end_time).toISOString(),
//     }))
//     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
// };

const ManageMaketHours = () => {
  const [marketOpenDates, setMarketOpenDates] = useState<MarketOpenDate[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // Track which date we are editing or deleting
  const [editingDate, setEditingDate] = useState<MarketOpenDate | null>(null);
  const [dateToDelete, setDateToDelete] = useState<MarketOpenDate | null>(null);

  // Form fields
  const [newDate, setNewDate] = useState<string>("");
  const [startHour, setStartHour] = useState<string>("");
  const [startMinute, setStartMinute] = useState<string>("");
  const [endHour, setEndHour] = useState<string>("");
  const [endMinute, setEndMinute] = useState<string>("");

  // Error states สำหรับวันที่, ชั่วโมง และนาที
  const [newDateError, setNewDateError] = useState<string>("");
  const [startHourError, setStartHourError] = useState<string>("");
  const [startMinuteError, setStartMinuteError] = useState<string>("");
  const [endHourError, setEndHourError] = useState<string>("");
  const [endMinuteError, setEndMinuteError] = useState<string>("");

//   useEffect(() => {
//     fetchMarketOpenDates()
//       .then((data) => {
//         const normalizedDates = normalizeMarketDates(data);
//         setMarketOpenDates(normalizedDates);

//         if (normalizedDates.length > 0) {
//           const firstDate = new Date(normalizedDates[0].date);
//           setSelectedYear(firstDate.getFullYear());
//           setSelectedMonth(firstDate.getMonth());
//         }
//       })
//       .catch((error) => console.error("Error fetching market open dates:", error));
//   }, []);

//   const handlePreviousMonth = () => {
//     setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
//     if (selectedMonth === 0) setSelectedYear((prev) => prev - 1);
//   };

//   const handleNextMonth = () => {
//     setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));
//     if (selectedMonth === 11) setSelectedYear((prev) => prev + 1);
//   };

  // Reset form fields and errors
  const resetForm = () => {
    setNewDate("");
    setStartHour("");
    setStartMinute("");
    setEndHour("");
    setEndMinute("");
    setEditingDate(null);
    setNewDateError("");
    setStartHourError("");
    setStartMinuteError("");
    setEndHourError("");
    setEndMinuteError("");
  };

//   const openAddModal = () => {
//     resetForm();
//     setIsModalOpen(true);
//   };

  // เมื่อกด Edit ให้เติมค่าในฟอร์มตามข้อมูลที่เลือก
  const handleEditClick = (item: MarketOpenDate) => {
    setEditingDate(item);
    setNewDate(item.date.split("T")[0]); // extract YYYY-MM-DD

    const startTimeStr = new Date(item.start_time).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const [sHour, sMinute] = startTimeStr.split(":");
    setStartHour(sHour);
    setStartMinute(sMinute);

    const endTimeStr = new Date(item.end_time).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const [eHour, eMinute] = endTimeStr.split(":");
    setEndHour(eHour);
    setEndMinute(eMinute);

    setIsModalOpen(true);
  };

  // เมื่อกด Delete ให้แสดง modal สำหรับยืนยัน
  const handleDeleteClick = (item: MarketOpenDate) => {
    setDateToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const padTime = (value: string) => value.padStart(2, "0");

  const handleSubmit = async () => {
    let valid = true;
    if (newDate === "") {
      setNewDateError("Please enter the date");
      valid = false;
    }
    if (startHour === "" || startMinute === "") {
      setStartHourError("Please fill this box");
      valid = false;
    }
    if (endHour === "" || endMinute === "") {
      setEndHourError("Please fill this box");
      valid = false;
    }
    if (!valid) return;

    try {
      const startTimeStr = `${padTime(startHour)}:${padTime(startMinute)}`;
      const endTimeStr = `${padTime(endHour)}:${padTime(endMinute)}`;

      const newDateData = {
        date: combineDateTime(newDate, "00:00"),
        start_time: combineDateTime(newDate, startTimeStr),
        end_time: combineDateTime(newDate, endTimeStr),
      };

      if (editingDate) {
        // Update via PUT
        await axios.put(`/api/marketDate/${editingDate.id}`, newDateData);
      } else {
        // Create via POST
        await axios.post(`/api/marketDate/`, newDateData);
      }

//       const updatedDates = await fetchMarketOpenDates();
//       setMarketOpenDates(normalizeMarketDates(updatedDates));
//       setIsModalOpen(false);
//       resetForm();
//     } catch (error) {
//       console.error("Failed to submit market open date:", error);
//     }
//   };

  const confirmDelete = async () => {
    if (!dateToDelete) return;
    try {
      await axios.delete(`/api/marketDate/${dateToDelete.id}`);
      const updatedDates = await fetchMarketOpenDates();
      setMarketOpenDates(normalizeMarketDates(updatedDates));
      setIsDeleteModalOpen(false);
      setDateToDelete(null);
    } catch (error) {
      console.error("Failed to delete market open date:", error);
    }
  };

//   const filteredDates = marketOpenDates.filter((item) => {
//     const date = new Date(item.date);
//     return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
//   });

//   const currentMonthDisplay = new Date(selectedYear, selectedMonth, 1).toLocaleDateString("en-US", {
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <AdminLayouts currentPage="Manage Market Hours">
//       <div className="h-screen flex flex-col">
//         <section className="flex-1 p-8">
//           <div className="flex justify-between items-center mb-6">
//             <button
//               onClick={openAddModal}
//               className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition duration-200"
//             >
//               Add Date
//             </button>
//           </div>

//           <div className="flex justify-between items-center mb-6">
//             <button onClick={handlePreviousMonth} className="text-2xl">&lt;</button>
//             <span className="text-lg font-medium">{currentMonthDisplay}</span>
//             <button onClick={handleNextMonth} className="text-2xl">&gt;</button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse table-auto">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border px-4 py-2 text-left">Opening Date</th>
//                   <th className="border px-4 py-2 text-left">From</th>
//                   <th className="border px-4 py-2 text-left">To</th>
//                   <th className="border px-4 py-2 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredDates.length > 0 ? (
//                   filteredDates.map((date) => (
//                     <tr key={date.id} className="border-b">
//                       <td className="px-4 py-2">
//                         {new Date(date.date).toLocaleDateString("en-US", {
//                           weekday: "long",
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         })}
//                       </td>
//                       <td className="px-4 py-2">
//                         {new Date(date.start_time).toLocaleTimeString("en-US", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                           hour12: false,
//                         })}
//                       </td>
//                       <td className="px-4 py-2">
//                         {new Date(date.end_time).toLocaleTimeString("en-US", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                           hour12: false,
//                         })}
//                       </td>
//                       <td className="px-4 py-2 flex space-x-2">
//                         <button
//                           onClick={() => handleEditClick(date)}
//                           className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(date)}
//                           className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={4} className="text-center py-4">
//                       No dates available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>

//       {/* Add / Edit Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-lg font-bold mb-4">
//               {editingDate ? "Edit Market Open Date" : "Add Market Open Date"}
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block font-medium">Date</label>
//                 <input
//                   type="date"
//                   value={newDate}
//                   onChange={(e) => setNewDate(e.target.value)}
//                   className="border p-2 w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Start Time</label>
//                 <input
//                   type="time"
//                   value={startTime}
//                   onChange={(e) => setStartTime(e.target.value)}
//                   className="border p-2 w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">End Time</label>
//                 <input
//                   type="time"
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   className="border p-2 w-full"
//                 />
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end space-x-2">
//               <button
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   resetForm();
//                 }}
//                 className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
//               >
//                 {editingDate ? "Update" : "Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && dateToDelete && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
//             <p className="mb-4">Are you sure you want to delete this market open date?</p>
//             <div className="mt-6 flex justify-end space-x-2">
//               <button
//                 onClick={() => {
//                   setIsDeleteModalOpen(false);
//                   setDateToDelete(null);
//                 }}
//                 className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </AdminLayouts>
//   );
// };

// export default ShopHoursSummaryPage;

export default function ManageMarketHours() {
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
            <button onClick={handlePreviousMonth} className="text-2xl">
              &lt;
            </button>
            <span className="text-lg font-medium">{currentMonthDisplay}</span>
            <button onClick={handleNextMonth} className="text-2xl">
              &gt;
            </button>
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
                  onChange={(e) => {
                    setNewDate(e.target.value);
                    if (e.target.value !== "") setNewDateError("");
                  }}
                  className="border p-2 w-full"
                />
                {newDateError && <p className="text-red-500 text-xs mt-1">{newDateError}</p>}
              </div>
              <div>
                <label className="block font-medium">Start Time</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={startHour}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input === "") {
                        setStartHour("");
                      } else {
                        let value = parseInt(input);
                        if (isNaN(value)) {
                          setStartHour("");
                        } else {
                          if (value > 23) value = 23;
                          if (value < 0) value = 0;
                          setStartHour(value.toString());
                        }
                        setStartHourError("");
                      }
                    }}
                    placeholder="HH"
                    className="border p-2 w-1/2"
                  />
                  <span>:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={startMinute}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input === "") {
                        setStartMinute("");
                      } else {
                        let value = parseInt(input);
                        if (isNaN(value)) {
                          setStartMinute("");
                        } else {
                          if (value > 59) value = 59;
                          if (value < 0) value = 0;
                          setStartMinute(value.toString());
                        }
                        setStartMinuteError("");
                      }
                    }}
                    placeholder="MM"
                    className="border p-2 w-1/2"
                  />
                </div>
                {startHourError && <p className="text-red-500 text-xs mt-1">{startHourError}</p>}
                {startMinuteError && <p className="text-red-500 text-xs mt-1">{startMinuteError}</p>}
              </div>
              <div>
                <label className="block font-medium">End Time</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={endHour}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input === "") {
                        setEndHour("");
                      } else {
                        let value = parseInt(input);
                        if (isNaN(value)) {
                          setEndHour("");
                        } else {
                          if (value > 23) value = 23;
                          if (value < 0) value = 0;
                          setEndHour(value.toString());
                        }
                        setEndHourError("");
                      }
                    }}
                    placeholder="HH"
                    className="border p-2 w-1/2"
                  />
                  <span>:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={endMinute}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input === "") {
                        setEndMinute("");
                      } else {
                        let value = parseInt(input);
                        if (isNaN(value)) {
                          setEndMinute("");
                        } else {
                          if (value > 59) value = 59;
                          if (value < 0) value = 0;
                          setEndMinute(value.toString());
                        }
                        setEndMinuteError("");
                      }
                    }}
                    placeholder="MM"
                    className="border p-2 w-1/2"
                  />
                </div>
                {endHourError && <p className="text-red-500 text-xs mt-1">{endHourError}</p>}
                {endMinuteError && <p className="text-red-500 text-xs mt-1">{endMinuteError}</p>}
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

export default ManageMaketHours;
