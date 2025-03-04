import React from "react";
import { MarketOpenDate } from "@/utility/ManageMarketHours";

interface MarketHourDeleteModalProps {
  isOpen: boolean;
  dateToDelete: MarketOpenDate | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const MarketHourDeleteModal: React.FC<MarketHourDeleteModalProps> = ({ isOpen, dateToDelete, onCancel, onConfirm }) => {
  if (!isOpen || !dateToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete this market hour entry?
        </p>
        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onCancel} className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketHourDeleteModal;
