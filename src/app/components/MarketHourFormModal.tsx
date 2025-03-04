import React, { useState, useEffect } from "react";
import { MarketOpenDate } from "@/utility/ManageMarketHours";
import { combineMarketHourDateTime } from "@/utility/marketHourUtils";

interface MarketHourFormModalProps {
  isOpen: boolean;
  editingDate: MarketOpenDate | null;
  onClose: () => void;
  onSubmit: (
    data: { date: string; start_time: string; end_time: string },
    editingDate?: MarketOpenDate | null
  ) => void;
}

const MarketHourFormModal: React.FC<MarketHourFormModalProps> = ({ isOpen, editingDate, onClose, onSubmit }) => {
  const [newDate, setNewDate] = useState<string>("");
  const [startHour, setStartHour] = useState<string>("");
  const [startMinute, setStartMinute] = useState<string>("");
  const [endHour, setEndHour] = useState<string>("");
  const [endMinute, setEndMinute] = useState<string>("");

  // Error states
  const [newDateError, setNewDateError] = useState<string>("");
  const [startHourError, setStartHourError] = useState<string>("");
  const [startMinuteError, setStartMinuteError] = useState<string>("");
  const [endHourError, setEndHourError] = useState<string>("");
  const [endMinuteError, setEndMinuteError] = useState<string>("");

  useEffect(() => {
    if (editingDate) {
      const localDate = new Date(editingDate.date);
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, "0");
      const day = String(localDate.getDate()).padStart(2, "0");
      setNewDate(`${year}-${month}-${day}`);

      const startTimeStr = new Date(editingDate.start_time).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const [sHour, sMinute] = startTimeStr.split(":");
      setStartHour(sHour);
      setStartMinute(sMinute);

      const endTimeStr = new Date(editingDate.end_time).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const [eHour, eMinute] = endTimeStr.split(":");
      setEndHour(eHour);
      setEndMinute(eMinute);
    } else {
      setNewDate("");
      setStartHour("");
      setStartMinute("");
      setEndHour("");
      setEndMinute("");
    }
  }, [editingDate]);

  const padTime = (value: string) => value.padStart(2, "0");

  const handleSubmit = () => {
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

    const startTimeStr = `${padTime(startHour)}:${padTime(startMinute)}`;
    const endTimeStr = `${padTime(endHour)}:${padTime(endMinute)}`;

    const newDateData = {
      date: combineMarketHourDateTime(newDate, "00:00"),
      start_time: combineMarketHourDateTime(newDate, startTimeStr),
      end_time: combineMarketHourDateTime(newDate, endTimeStr),
    };

    onSubmit(newDateData, editingDate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {editingDate ? "Edit Market Hour" : "Add Market Hour"}
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
          <button onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            {editingDate ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketHourFormModal;
