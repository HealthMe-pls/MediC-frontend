import React from "react";
import { MarketOpenDate } from "@/utility/ManageMarketHours";

interface MarketHourTableProps {
  marketHourDates: MarketOpenDate[];
  onEdit: (item: MarketOpenDate) => void;
  onDelete: (item: MarketOpenDate) => void;
}

const MarketHourTable: React.FC<MarketHourTableProps> = ({ marketHourDates, onEdit, onDelete }) => {
  return (
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
          {marketHourDates.length > 0 ? (
            marketHourDates.map((date) => (
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
                    onClick={() => onEdit(date)}
                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(date)}
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
  );
};

export default MarketHourTable;
