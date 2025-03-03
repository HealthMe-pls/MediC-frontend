"use client";


import { useEffect, useState, useRef } from "react";
import {
  fetchNotifications,
  Noti,
  deleteNotifications,
} from "@/utility/notifications";
import React from "react";
import AdminLayouts from "@/app/layouts/AdminLayouts";

const ReportedIssuesPage = () => {
  const [notifications, setNotifications] = useState<Noti[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Noti[]>(
    []
  );
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [deleteMultiple, setDeleteMultiple] = useState<boolean>(false);

  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNotifications()
      .then((data) => {
        setNotifications(data || []);
        setFilteredNotifications(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = notifications.filter((notification) =>
      notification.from_username.toLowerCase().includes(term)
    );
    setFilteredNotifications(filtered);
  };

  const confirmDelete = (id: number) => {
    setDeleteTarget(id);
    setDeleteMultiple(false);
    setIsModalOpen(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteTarget(null);
    setDeleteMultiple(true);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (deleteMultiple) {
      await Promise.all(
        selectedNotifications.map((id) => deleteNotifications(id))
      );
      setNotifications((prev) =>
        prev.filter((noti) => !selectedNotifications.includes(noti.id))
      );
      setFilteredNotifications((prev) =>
        prev.filter((noti) => !selectedNotifications.includes(noti.id))
      );
      setSelectedNotifications([]);
    } else if (deleteTarget !== null) {
      await deleteNotifications(deleteTarget);
      setNotifications((prev) =>
        prev.filter((noti) => noti.id !== deleteTarget)
      );
      setFilteredNotifications((prev) =>
        prev.filter((noti) => noti.id !== deleteTarget)
      );
      setSelectedNotifications((prev) =>
        prev.filter((id) => id !== deleteTarget)
      );
    }
    setIsModalOpen(false);
  };

  const toggleSelection = (id: number) => {
    setSelectedNotifications((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    }else if (selectedNotifications.length > 0) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((noti) => noti.id));
    }
  };

  useEffect(() => {
    if (selectAllRef.current) {
      if (selectedNotifications.length === 0) {
        selectAllRef.current.indeterminate = false;
        selectAllRef.current.checked = false;
      } else if (
        selectedNotifications.length === filteredNotifications.length
      ) {
        selectAllRef.current.indeterminate = false;
        selectAllRef.current.checked = true;
      } else {
        selectAllRef.current.indeterminate = true;
      }
    }
  }, [selectedNotifications, filteredNotifications]);

  return (
    <AdminLayouts currentPage="Reported Issues">
      <div className="text-[#4C4343]">
      <div className="mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            backgroundImage: 'url(/assets/search-rounded.png)', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: '10px center',
            paddingLeft: '30px',
          }}
          className="py-2 pr-64 ml-8 mt-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p>Loading notifications...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="space-y-4">
        <div className="flex items-center ml-9 gap-4">
          {filteredNotifications.length > 0 && (
            <>
              <input
                ref={selectAllRef}
                type="checkbox"
                onChange={toggleSelectAll}
                className="w-5 h-5 border-2 border-gray-300 rounded-sm bg-white accent-[#4C4343]"
              />
              <p>Select All</p>
            </>
          )}
          {selectedNotifications.length > 0 && (
            <button
              onClick={confirmDeleteSelected}
              className="p-2 rounded-lg hover:bg-red-200 transition "
            >
              <img 
                src="/assets/trash.png" 
                alt="Delete" 
                className="w-5 h-5 " 
              />
            </button>
          )}
        </div>

        {filteredNotifications.length > 0
          ? filteredNotifications.map((notification) => (
              <div key={notification.id} className="p-4 flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={() => toggleSelection(notification.id)}
                  className="w-5 h-5 mt-1 ml-5 border-2 border-gray-300 rounded-sm bg-white accent-[#4C4343]"
                />
                <div
                  className={`border border-gray-300 rounded-lg p-4 flex items-start gap-4 w-full transition mr-16 ${
                    selectedNotifications.includes(notification.id)
                      ? "bg-gray-200"
                      : "bg-white"
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {notification.from_username}
                    </h3>
                    <p className="mt-1">
                      <strong>Subject:</strong> {notification.problem || "N/A"}
                    </p>
                    <p className="mt-1">
                      <strong>Detail:</strong> {notification.detail || "N/A"}
                    </p>
                    <p className="mt-1">
                      <strong>Contacted at :</strong>{" "}
                      {notification.contact_to_en || "N/A"}
                    </p>
                  </div>

                  <button
                    onClick={() => confirmDelete(notification.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))
          : !loading && <p>No notifications found.</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white py-8 px-16 rounded-xl shadow-lg">
          <p className="text-lg font-semibold flex items-center justify-center">
            {deleteMultiple
              ? selectedNotifications.length === notifications.length
                ? "Remove all reported issue?"
                : `Remove ${selectedNotifications.length} reported issue?`
              : "Remove this reported issue?"}
          </p>
          <p className="flex items-center justify-center">This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-16">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-full"
              >
                No, Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-200 text-black rounded-full hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminLayouts>
  );
};

export default ReportedIssuesPage;
