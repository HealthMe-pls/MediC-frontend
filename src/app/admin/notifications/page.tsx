"use client";

import { useEffect, useState } from "react";
import { fetchNotifications, Noti } from "@/utility/notifications";
import React from "react";
import Header from "../../layouts/Header";
import Link from "next/link";
import AdminLayouts from "@/app/layouts/AdminLayouts";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Noti[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Noti[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>(""); // สำหรับเก็บข้อความที่ค้นหา
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  // ฟังก์ชันสำหรับ handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = notifications.filter((notification) =>
      notification.from_username.toLowerCase().includes(term)
    );
    setFilteredNotifications(filtered);
  };

  return (
    <AdminLayouts currentPage="Notifications">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading and Error States */}
      {loading && <p>Loading notifications...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0
          ? filteredNotifications.map((notification, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-4 relative"
              >
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                  x
                </button>
                <h3 className="font-semibold">{notification.from_username}</h3>
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
            ))
          : !loading && <p>No notifications found.</p>}
      </div>
    </AdminLayouts>
  );
};

export default NotificationsPage;
