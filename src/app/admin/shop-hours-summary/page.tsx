"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import AdminLayouts from "@/app/layouts/AdminLayouts";
import { fetchShopOpenDates, ShopOpenDates } from "@/utility/shopHourSummary";
import {
  fetchMarketOpenDates,
  MarketOpenDate,
} from "@/utility/ManageMarketHours";
import autoTable from "jspdf-autotable";

dayjs.extend(isBetween);

// PDF Export Function
const exportAsPDF = (
  filterType: 'week' | 'month', 
  currentDate: dayjs.Dayjs, 
  filteredShops: ShopOpenDates[], 
  filteredMarkets: MarketOpenDate[]
) => {
  // Create a new jsPDF instance
  const doc = new jsPDF('landscape');

  // Set document title
  const startDate = currentDate.startOf(filterType);
  const endDate = currentDate.endOf(filterType);
  const title = `Shop Hours Summary (${startDate.format('DD MMM YYYY')} - ${endDate.format('DD MMM YYYY')})`;
  
  // Add title to the document
  doc.setFontSize(16);
  doc.text(title, 14, 15);

  // Prepare table headers
  const headers = [
    'Shop Name',
    ...filteredMarkets
      .sort((a, b) => dayjs(a.start_time).isBefore(dayjs(b.start_time)) ? -1 : 1)
      .map(market => `${dayjs(market.start_time).format('ddd')} ${dayjs(market.start_time).format('D MMM')}`)
  ];

  // Group shop data by shop.id so thatแต่ละร้านมีแถวเดียวกัน
  const groupedShops = Object.values(
    filteredShops.reduce((acc, record) => {
      if (!acc[record.shop.id]) {
        acc[record.shop.id] = { shop: record.shop, openTimes: [] };
      }
      acc[record.shop.id].openTimes.push(record.start_time);
      return acc;
    }, {} as Record<number, { shop: typeof filteredShops[0]['shop'], openTimes: string[] }>)
  );

  // Prepare table rows based on grouped shop data
  const rows = groupedShops.map((group) => {
    return [
      group.shop.name,
      ...filteredMarkets
        .sort((a, b) => dayjs(a.start_time).isBefore(dayjs(b.start_time)) ? -1 : 1)
        .map(marketDate => 
          group.openTimes.some((openTime) =>
            dayjs(openTime).isSame(dayjs(marketDate.start_time), 'day')
          )
            ? ' '
            : ''
        )
    ];
  });

  // Generate the table
  autoTable(doc, {
    startY: 25,
    head: [headers],
    body: rows,
    theme: 'striped',
    styles: { 
      fontSize: 10,
      cellPadding: 3,
      valign: 'middle',
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'left' }
    },
    didParseCell: function (data) {
      if (data.column.index === 0) return;
      if (data.cell.raw === ' ') {
        data.cell.styles.fillColor = [206, 206, 206];
        data.cell.styles.textColor = [0, 0, 0];
      }
    }
  });

  // Save the PDF file
  doc.save(`shop_hours_summary_${startDate.format('YYYY-MM-DD')}_to_${endDate.format('YYYY-MM-DD')}.pdf`);
};


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
        const [marketDateData, shopDateData] = await Promise.all([
          fetchMarketOpenDates(),
          fetchShopOpenDates()
        ]);

        const shopData = shopDateData.shop_open_dates;
        const marketData = marketDateData.market_open_dates;

        setMarketOpenDate(marketData);
        setShopOpenDate(shopData);

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

  const handleExportPDF = () => {
    exportAsPDF(filterType, currentDate, filteredShops, filteredMarkets);
  };

  return (
    <>
      <AdminLayouts currentPage="Shop Hours Summary">
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
              onClick={handleExportPDF}
              className="border border-gray-300 text-grey py-2 px-4 rounded-xl"
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
                    [...filteredMarkets]
                      .sort((a, b) =>
                        dayjs(a.start_time).isBefore(dayjs(b.start_time))
                          ? -1
                          : 1
                      )
                      .map((marketDate) => (
                        <th key={marketDate.id} className="border px-4 py-2">
                          <div>
                            {dayjs(marketDate.start_time).format("ddd")}
                          </div>
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
                {(() => {
                  // จัดกลุ่มข้อมูลร้านค้าโดยใช้ shop.id เป็น key
                  const groupedShops = Object.values(
                    filteredShops.reduce((acc, record) => {
                      if (!acc[record.shop.id]) {
                        acc[record.shop.id] = { shop: record.shop, openTimes: [] };
                      }
                      acc[record.shop.id].openTimes.push(record.start_time);
                      return acc;
                    }, {})
                  );
                
                  return groupedShops.length > 0 ? (
                    groupedShops.map((group) => (
                      <tr key={group.shop.id} className="h-[50px]">
                        <td className="border px-4 py-2 text-center">{group.shop.name}</td>
                        {filteredMarkets
                          .sort((a, b) =>
                            dayjs(a.start_time).isBefore(dayjs(b.start_time)) ? -1 : 1
                          )
                          .map((marketDate) => {
                            // ตรวจสอบว่าใน openTimes ของร้านมีเวลาไหนตรงกับ marketDate หรือไม่
                            const isOpen = group.openTimes.some((openTime) =>
                              dayjs(openTime).isSame(dayjs(marketDate.start_time), "day")
                            );
                            return (
                              <td
                                key={marketDate.id}
                                className={`border px-4 py-2 text-center ${
                                  isOpen ? "bg-[#CECECE] text-black" : ""
                                }`}
                              >
                                {isOpen ? " " : ""}
                              </td>
                            );
                          })}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={filteredMarkets.length + 1} className="text-center py-4">
                        No shop openings found
                      </td>
                    </tr>
                  );
                })()}
              </tbody>
            </table>
          </div>
        </section>
      </AdminLayouts>
    </>
  );
};

export default ShopHoursSummaryPage;