import { useState } from "react";
import { parseISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, format, addWeeks, subWeeks, addMonths, subMonths } from "date-fns";
import Header from "../../layouts/Header";
import Link from "next/link";

interface ShopOpenDates {
  id: number;
  start_time: string;
  end_time: string;
}

const shopSet: ShopOpenDates[] = [
  { id: 1, start_time: "2024-12-01T09:00:00", end_time: "2024-12-01T20:00:00" },
  { id: 2, start_time: "2024-12-07T09:00:00", end_time: "2024-12-07T20:00:00" },
  { id: 3, start_time: "2024-12-08T09:00:00", end_time: "2024-12-08T20:00:00" },
  { id: 4, start_time: "2024-12-14T09:00:00", end_time: "2024-12-14T20:00:00" },
  { id: 5, start_time: "2024-12-15T09:00:00", end_time: "2024-12-15T20:00:00" },
];

const ShopHoursSummaryPage = () => {
  const [filterType, setFilterType] = useState<"weekly" | "monthly">("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get start & end dates for filtering
  const startDate = filterType === "weekly" ? startOfWeek(currentDate) : startOfMonth(currentDate);
  const endDate = filterType === "weekly" ? endOfWeek(currentDate) : endOfMonth(currentDate);

  // Filter shops based on selected week or month
  const filteredShops = shopSet.filter(shop =>
    isWithinInterval(parseISO(shop.start_time), { start: startDate, end: endDate })
  );

  // Handle previous/next navigation
  const handlePrev = () => setCurrentDate(filterType === "weekly" ? subWeeks(currentDate, 1) : subMonths(currentDate, 1));
  const handleNext = () => setCurrentDate(filterType === "weekly" ? addWeeks(currentDate, 1) : addMonths(currentDate, 1));

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Shop Hours Summary</h1>
      </header>

      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/6 bg-gray-700 text-white p-6">
          <div className="space-y-4">
            <Link href="/adminPage"><button className="w-full bg-gray-600 text-white py-2 rounded-lg">Manage Market Map</button></Link>
            <Link href="/admin/shop-hours-summary"><button className="w-full bg-blue-600 text-white py-2 rounded-lg">Shop Hours Summary</button></Link>
            <Link href="/admin/manage-shop-hours"><button className="w-full bg-gray-600 text-white py-2 rounded-lg">Manage Shop Hours</button></Link>
            <Link href="/admin/notifications"><button className="w-full bg-gray-600 text-white py-2 rounded-lg">Notification</button></Link>
          </div>
        </aside>

        {/* Content */}
        <section className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <label className="font-semibold">Filter:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as "weekly" | "monthly")}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Export as PDF</button>
          </div>

          {/* Date Navigation */}
          <div className="flex justify-center items-center mb-4 space-x-4">
            <button onClick={handlePrev} className="bg-gray-600 text-white px-3 py-1 rounded-lg">❮ Prev</button>
            <span className="text-lg font-semibold">
              {format(startDate, "dd MMM yyyy")} - {format(endDate, "dd MMM yyyy")}
            </span>
            <button onClick={handleNext} className="bg-gray-600 text-white px-3 py-1 rounded-lg">Next ❯</button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Shop Name</th>
                  <th className="border px-4 py-2">Opening Date</th>
                  <th className="border px-4 py-2">From</th>
                  <th className="border px-4 py-2">To</th>
                </tr>
              </thead>
              <tbody>
                {filteredShops.length > 0 ? (
                  filteredShops.map((shop) => (
                    <tr key={shop.id}>
                      <td className="border px-4 py-2 text-center">Shop {shop.id}</td>
                      <td className="border px-4 py-2 text-center">{format(parseISO(shop.start_time), "EEE, d MMM yyyy")}</td>
                      <td className="border px-4 py-2 text-center">{format(parseISO(shop.start_time), "HH:mm")}</td>
                      <td className="border px-4 py-2 text-center">{format(parseISO(shop.end_time), "HH:mm")}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={4} className="text-center py-4">No shop openings found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShopHoursSummaryPage;
