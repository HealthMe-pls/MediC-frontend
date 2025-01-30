import React from "react";
import Header from "../../layouts/Header";
import Link from "next/link";

const NotificationsPage = () => {
  const notifications = [
    {
      shop_name: "Shop_Name_1",
      problem: "Forgot Password",
      detail: "I forgot my password. Please provide a new one.",
    },
    {
      shop_name: "Shop_Name_2",
      problem: "", // Empty string for no problem
      detail: "", // Empty string for no detail
    },
    {
      shop_name: "Shop_Name_3",
      problem: "", // Empty string for no problem
      detail: "", // Empty string for no detail
    },
    // Add more notifications as needed
  ];

  return (
    <div className="h-screen flex flex-col font-sans">
      <Header />
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Notification</h1>
      </header>
      <main className="flex flex-1 bg-gray-100">
        <aside className="w-1/6 bg-gray-700 text-white p-6">
          <div className="mt-4 space-y-4">
            {" "}
            {/* You can leave this space between items if you need extra padding */}
            <Link href="/adminPage">
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg mb-4">
                {" "}
                {/* Added margin-bottom */}
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
              <button className="w-full bg-gray-600  text-white py-2 rounded-lg mb-4">
                Manage Highlighted Workshop
              </button>
            </Link>
            <Link href="/admin/notifications">
              <button className="w-full bg-blue-600  text-white py-2 rounded-lg mb-4">
                Notification
              </button>
            </Link>
          </div>
        </aside>

        <section className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-6">Notification</h2>

          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-4 relative"
              >
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                  x {/* Close button */}
                </button>
                <h3 className="font-semibold">{notification.shop_name}</h3>
                <p className="mt-1">
                  Problem: {notification.problem || "N/A"}{" "}
                  {/* Display "N/A" if no problem */}
                </p>
                <p className="mt-1">
                  Detail: {notification.detail || "N/A"}{" "}
                  {/* Display "N/A" if no detail */}
                </p>
              </div>
            ))}
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
