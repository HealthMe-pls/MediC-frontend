"use client";

import React, { useState } from "react";

const EditShopModal = ({ onClose }) => {
  const [schedule, setSchedule] = useState([
    { date: "Sunday, 1 Jan 2025", checked: false, from: " ", to: " " },
    { date: "Saturday, 7 Jan 2025", checked: true, from: " ", to: " " },
    { date: "Sunday, 13 Jan 2025", checked: true, from: " ", to: " " },
    {
      date: "Saturday, 14 Jan 2025",
      checked: true,
      from: " ",
      to: " ",
    },
  ]);

  const handleCheckboxChange = (index) => {
    setSchedule((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleTimeChange = (index, field, value) => {
    setSchedule((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const timeOptions = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const time = `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}`;
      timeOptions.push(time);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Shop Information</h2>
          <button onClick={onClose} className="text-gray-600 text-2xl">
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Shop Name"
            className="w-full border p-2 rounded"
          />
          <select className="w-full border p-2 rounded">
            <option>Shop Category</option>
          </select>
          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        <div className="mt-4">
          <p className="font-medium mb-2">
            Social Media:{" "}
            <button className="bg-green-300 px-2 py-1 rounded">Add</button>
          </p>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Platform"
              className="border p-2 rounded w-1/3"
            />
            <input
              type="text"
              placeholder="Account Name"
              className="border p-2 rounded w-1/3"
            />
            <input
              type="text"
              placeholder="Link"
              className="border p-2 rounded w-1/3"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-medium mb-2">Opening Schedule:</p>
          <table className="w-full border rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-center">From</th>
                <th className="p-2 text-center">To</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <select
                      className="border p-1 rounded flex-1"
                      value={item.date}
                      onChange={(e) =>
                        handleTimeChange(index, "date", e.target.value)
                      }
                    >
                      <option value="Sunday, 1 Jan 2025">
                        Sunday, 1 Jan 2025
                      </option>
                      <option value="Saturday, 7 Jan 2025">
                        Saturday, 7 Jan 2025
                      </option>
                      <option value="Sunday, 13 Jan 2025">
                        Sunday, 13 Jan 2025
                      </option>
                      <option value="Saturday, 14 Jan 2025">
                        Saturday, 14 Jan 2025
                      </option>
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    <select
                      className="border p-1 rounded"
                      value={item.from}
                      onChange={(e) =>
                        handleTimeChange(index, "from", e.target.value)
                      }
                      disabled={!item.checked}
                    >
                      <option value="">From</option>
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    <select
                      className="border p-1 rounded"
                      value={item.to}
                      onChange={(e) =>
                        handleTimeChange(index, "to", e.target.value)
                      }
                      disabled={!item.checked}
                    >
                      <option value="">To</option>
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditShopModal;
