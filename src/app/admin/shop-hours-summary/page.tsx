"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import isBetween from "dayjs/plugin/isBetween";
import AdminLayouts from "@/app/layouts/AdminLayouts";
import { fetchShopOpenDates, ShopOpenDates } from "@/utility/shopHourSummary";
import {
  fetchMarketOpenDates,
  MarketOpenDate,
} from "@/utility/ManageMarketHours";

dayjs.extend(isBetween);

const ShopHoursSummaryPage = () => {
  const [filterType, setFilterType] = useState<"week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startDate = currentDate.startOf(filterType);
  const endDate = currentDate.endOf(filterType);

  const [shopOpenDate, setShopOpenDate] = useState<ShopOpenDates[]>([]);
  const [marketOpenDate, setMarketOpenDate] = useState<MarketOpenDate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchShopOpenDates();
        console.log("Fetched response:", response);
        const [marketDateData] = await Promise.all([fetchMarketOpenDates()]);
        const [shopDateData] = await Promise.all([fetchShopOpenDates()]);

        const shopData = shopDateData.shop_open_dates;
        const marketData = marketDateData.market_open_dates;

        setMarketOpenDate(marketData);
        setShopOpenDate(shopData);

        // console.log("Fetched market data:", marketData);
        // console.log("Fetched shop data:", shopData);
      } catch (error) {
        console.error("Error fetching shop open date data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredShops = shopOpenDate.filter((shop) =>
    dayjs(shop.start_time).isBetween(startDate, endDate, null, "[]")
  );

  const filteredMarkets = marketOpenDate.filter((market) =>
    dayjs(market.start_time).isBetween(startDate, endDate, null, "[]")
  );

  const handlePrev = () => setCurrentDate(currentDate.subtract(1, filterType));
  const handleNext = () => setCurrentDate(currentDate.add(1, filterType));

  const exportAsPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Shop Hours Summary", 14, 16);

    // กรองข้อมูลเฉพาะเดือนที่เปิดอยู่
    const filteredShops = shopOpenDate.filter((shop) =>
      dayjs(shop.start_time).isBetween(startDate, endDate, null, "[]")
    );

    if (filteredShops.length === 0) {
      alert("No shop data for the selected period.");
      return;
    }

    // จัดกลุ่มข้อมูลตามเดือน
    const monthYear = startDate.format("MMM YYYY");
    doc.setFontSize(14);
    doc.text(monthYear, 14, 30);

    const data = filteredShops.map((shop) => [
      `Shop ${shop.id}`,
      dayjs(shop.start_time).format("ddd, D MMM YYYY"),
      dayjs(shop.start_time).format("HH:mm"),
      dayjs(shop.end_time).format("HH:mm"),
    ]);

    autoTable(doc, {
      head: [["Shop Name", "Opening Date", "From", "To"]],
      body: data,
      startY: 40,
      theme: "grid",
    });

    // บันทึก PDF
    doc.save(`shop_hours_${startDate.format("YYYY_MM")}.pdf`);
  };
  return (
    <>
      <AdminLayouts currentPage="Shop Hours Summary">
        {/* Content Area */}
        <section className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-end items-center mb-8">
            <div className="flex items-center space-x-4 mr-10">
              <label className="font-semibold">Filter :</label>
              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value as "week" | "month")
                }
                className="p-2 border border-gray-300 rounded-xl"
              >
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>
            <button
              onClick={exportAsPDF}
              className="border border-gray-300 text-grey  py-2 px-4 rounded-xl"
            >
              Export as PDF
            </button>
          </div>
          <div className="flex justify-between items-center mb-8 space-x-4">
            <button
              onClick={handlePrev}
              className=" text-gray-600 px-3 py-1 rounded-lg"
            >
              ❮
            </button>
            <span className="text-lg font-semibold">
              {startDate.format("DD MMM YYYY")} -{" "}
              {endDate.format("DD MMM YYYY")}
            </span>
            <button
              onClick={handleNext}
              className=" text-gray-600 px-3 py-1 rounded-lg"
            >
              ❯
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Shop Name</th>
                  {filteredMarkets.length > 0 ? (
                    filteredMarkets.map((marketDate) => (
                      <th key={marketDate.id} className="border px-4 py-2">
                        <div>{dayjs(marketDate.start_time).format("ddd")}</div>
                        <div>
                          {dayjs(marketDate.start_time).format("D MMM ")}
                        </div>
                      </th>
                    ))
                  ) : (
                    <td
                      colSpan={filteredMarkets.length}
                      className="text-center py-4"
                    >
                      No market openings found
                    </td>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredShops.length > 0 ? (
                  filteredShops.map((shop) => (
                    <tr key={shop.id}>
                      <td className="border px-4 py-2 text-center">
                        Shop {shop.id}
                      </td>
                      {filteredMarkets.map((marketDate) => {
                        const isOpen = dayjs(shop.start_time).isSame(
                          dayjs(marketDate.start_time),
                          "day"
                        );
                        return (
                          <td
                            key={marketDate.id}
                            className={`border px-4 py-2 text-center ${
                              isOpen ? "bg-gray-200" : ""
                            }`}
                          ></td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={filteredMarkets.length + 2}
                      className="text-center py-4"
                    >
                      No shop openings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </AdminLayouts>
    </>
  );
};

export default ShopHoursSummaryPage;
