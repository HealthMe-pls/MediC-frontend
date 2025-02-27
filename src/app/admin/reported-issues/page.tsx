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
      <div className="mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p>Loading notifications...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {filteredNotifications.length > 0 && (
            <>
              <input
                ref={selectAllRef}
                type="checkbox"
                onChange={toggleSelectAll}
                className="w-5 h-5"
              />
              <p>Select All</p>
            </>
          )}
          {selectedNotifications.length > 0 && (
            <button
              onClick={confirmDeleteSelected}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete Selected ({selectedNotifications.length})
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
                  className="w-5 h-5 mt-1"
                />
                <div
                  className={`border border-gray-300 rounded-lg p-4 flex items-start gap-4 w-[100%] transition ${
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
                    x
                  </button>
                </div>
              </div>
            ))
          : !loading && <p>No notifications found.</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">
              {deleteMultiple
                ? selectedNotifications.length === notifications.length
                  ? "Remove all reported issue? This action cannot be undone."
                  : `Remove ${selectedNotifications.length} reported issue? This action cannot be undone.`
                : "Remove this reported issue?  This action cannot be undone."}
            </p>

            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                No, Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayouts>
  );
};

export default ReportedIssuesPage;
