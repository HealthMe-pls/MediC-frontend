"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import { autoTable } from 'jspdf-autotable'
import isBetween from "dayjs/plugin/isBetween";
import AdminLayouts from "@/app/layouts/AdminLayouts";
import { fetchShopOpenDates, ShopOpenDates } from "@/utility/shopHourSummary";
import { fetchMarketOpenDates, MarketOpenDate } from "@/utility/ManageMarketHours";


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
        const [shopDateData, marketDateData] = await Promise.all([
          fetchShopOpenDates(),
          fetchMarketOpenDates(),
        ]);
        
        const shopData = shopDateData;
        const marketData = marketDateData;
        
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
  
  


  const filteredShops = shopOpenDate.filter(shop =>
    dayjs(shop.start_time).isBetween(startDate, endDate, null, "[]")
  );

  const filteredMarkets = marketOpenDate.filter(market =>
    dayjs(market.start_time).isBetween(startDate, endDate, null, "[]")
  );

  const handlePrev = () => setCurrentDate(currentDate.subtract(1, filterType));
  const handleNext = () => setCurrentDate(currentDate.add(1, filterType));

  const exportAsPDF = () => {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(18);
    doc.text("Shop Hours Summary", 14, 16);
  
    // Group the shop data by month
    const groupedByMonth = shopOpenDate.reduce((groups, shop) => {
      const monthYear = dayjs(shop.start_time).format("MMM YYYY");
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(shop);
      return groups;
    }, {} as Record<string, ShopOpenDates[]>);
  
    // Add tables for each month
    let currentY = 30; // starting position for the first table
    for (const monthYear in groupedByMonth) {
      if (groupedByMonth.hasOwnProperty(monthYear)) {
        // Add month title
        doc.setFontSize(14);
        doc.text(monthYear, 14, currentY);
        currentY += 10;
  
        // Add table header
        doc.setFontSize(12);
        const header = ["Shop Name", "Opening Date", "From", "To"];
        const columns = [header];
  
        // Add table data for the current month
        const data = groupedByMonth[monthYear].map((shop) => [
          `Shop ${shop.id}`,
          dayjs(shop.start_time).format("ddd, D MMM YYYY"),
          dayjs(shop.start_time).format("HH:mm"),
          dayjs(shop.end_time).format("HH:mm"),
        ]);
  
        // Add data to table
        autoTable(doc,{
          head: columns,
          body: data,
          startY: currentY,
          theme: "grid",
        });
  
        // Update currentY for the next section
        currentY = doc.internal.pageSize.height - 10; // Calculate the Y position for the next page
      // Ensure that we move to the next page if there is not enough space
      if (currentY > doc.internal.pageSize.height - 40) {
        doc.addPage();
        currentY = 30; // Reset to the top of the new page
      }
      }
    }
  
    // Save the PDF
    doc.save("shop_hours_summary.pdf");
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
                onChange={(e) => setFilterType(e.target.value as "week" | "month")}
                className="p-2 border border-gray-300 rounded-xl"
              >
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>
            <button
              onClick={exportAsPDF} 
              className="border border-gray-300 text-grey  py-2 px-4 rounded-xl">Export as PDF
            </button>
          </div>
          <div className="flex justify-between items-center mb-8 space-x-4">
            <button onClick={handlePrev} className=" text-gray-600 px-3 py-1 rounded-lg">❮</button>
            <span className="text-lg font-semibold">
              {startDate.format("DD MMM YYYY")} - {endDate.format("DD MMM YYYY")}
            </span>
            <button onClick={handleNext} className=" text-gray-600 px-3 py-1 rounded-lg">❯</button>
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
                      <div>{dayjs(marketDate.start_time).format("D MMM ")}</div>
                    </th>
                  ))
                ) : (
                  <td colSpan={filteredMarkets.length} className="text-center py-4">No market openings found</td>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredShops.length > 0 ? (
                filteredShops.map((shop) => (
                  <tr key={shop.id}>
                    <td className="border px-4 py-2 text-center">Shop {shop.id}</td>
                    {filteredMarkets.map((marketDate) => {
                      const isOpen = dayjs(shop.start_time).isSame(dayjs(marketDate.start_time), "day");
                      return (
                        <td
                          key={marketDate.id}
                          className={`border px-4 py-2 text-center ${isOpen ? "bg-gray-200" : ""}`}
                        >
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr><td colSpan={filteredMarkets.length + 2} className="text-center py-4">No shop openings found</td></tr>
              )}
            </tbody>
          </table>
          </div>
        </section>
      </AdminLayouts>
    </>
  );
}

export default ShopHoursSummaryPage;
