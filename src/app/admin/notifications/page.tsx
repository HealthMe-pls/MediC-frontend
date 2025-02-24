"use client";

import { useEffect, useState } from "react";
import { fetchNotifications, Noti } from "@/utility/notifications";
import React from "react";
import Header from "../../layouts/Header";
import Link from "next/link";

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
    <div className="h-screen flex flex-col font-sans">
      <Header />
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Notification</h1>
      </header>
      <main className="flex flex-1 bg-gray-100">
        <aside className="w-1/6 bg-gray-700 text-white p-6">
          <div className="mt-4 space-y-4">
            <Link href="/adminPage">
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
                Manage Market Map
              </button>
            </Link>
            <Link href="/admin/shop-hours-summary">
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
                Shop Hours Summary
              </button>
            </Link>
            <Link href="/admin/manage-shop-hours">
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
                Manage Shop Hours
              </button>
            </Link>
            <Link href="/admin/manage-highlighted-workshop">
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
                Manage Highlighted Workshop
              </button>
            </Link>
            <Link href="/admin/notifications">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4">
                Notification
              </button>
            </Link>
          </div>
        </aside>

        <section className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-6">Notifications</h2>

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
                ))
              : !loading && <p>No notifications found.</p>}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NotificationsPage;
