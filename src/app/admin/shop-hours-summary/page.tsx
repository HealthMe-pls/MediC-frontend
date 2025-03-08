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
        // const response = await fetchShopOpenDates();
        // console.log("Fetched response:", response);
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

    // ดึงตารางจาก DOM
    const table = document.querySelector("table");
    if (!table) {
      console.error("Table not found!");
      return;
    }

    // สร้างข้อมูลสำหรับ autoTable
    const headers = Array.from(table.querySelectorAll("thead th")).map(
      (th: Element) => (th as HTMLElement).innerText.trim()
    );
    const data = Array.from(table.querySelectorAll("tbody tr")).map(
      (tr: Element) => {
        return Array.from(tr.querySelectorAll("td")).map((td: Element) =>
          (td as HTMLElement).innerText.trim()
        );
      }
    );

    const headerStyles = {
      fillColor: [240, 240, 240] as [number, number, number],
      textColor: 0, // ✅ ค่าเดี่ยวใช้ได้เลย
      fontStyle: "bold" as "bold" | "italic" | "normal",
      lineWidth: 0.5,
      lineColor: [200, 200, 200] as [number, number, number],
    };

    const bodyStyles = {
      lineWidth: 0.5,
      lineColor: [200, 200, 200] as [number, number, number],
      textColor: 0,
    };

    // ใช้ autoTable และเปลี่ยนช่องที่มีข้อความให้เป็นช่องทึบ
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 20,
      styles: { fontSize: 10, cellPadding: 4 },
      alternateRowStyles: { fillColor: [245, 245, 245] }, // สีพื้นหลังแถวสลับกัน
      headStyles: headerStyles,
      bodyStyles: bodyStyles,
      columnStyles: { 0: { halign: "center" } }, // จัดกึ่งกลางคอลัมน์แรก
      didParseCell: (data) => {
        // ตรวจสอบว่าเป็นแถวข้อมูล (ไม่ใช่ header) และไม่ใช่คอลัมน์แรก (คอลัมน์ 0)
        if (
          data.section === "body" &&
          data.cell.raw &&
          data.column.index !== 0
        ) {
          // ถ้ามีข้อความในเซลล์ที่ไม่ใช่คอลัมน์แรก
          const cellValue = data.cell.raw?.toString().trim();
          if (cellValue && cellValue !== "") {
            // ถ้ามีข้อความให้ตั้งสีพื้นหลังเป็นเทาเข้มและข้อความเป็นขาว
            data.cell.styles.fillColor = [130, 130, 130]; // สีพื้นหลังทึบ
            data.cell.styles.textColor = [130, 130, 130]; // สีข้อความเป็นขาว
          } else {
            // ถ้าเซลล์ไม่มีข้อความให้ไม่เปลี่ยนพื้นหลัง
            data.cell.styles.fillColor = [255, 255, 255]; // พื้นหลังเป็นสีขาว
            data.cell.styles.textColor = [0, 0, 0]; // ข้อความสีดำ
          }
        }
      },
    });

    // ดาวน์โหลด PDF
    doc.save("Shop_Hours_Summary.pdf");
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
                            {dayjs(marketDate.start_time).format("D MMM")}
                          </div>
                        </th>
                      ))
                  ) : (
                    <th colSpan={2} className="text-center py-4">
                      No market openings found
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredShops.length > 0 ? (
                  [...filteredShops]
                    .sort((a, b) => {
                      if (a.shop.id === b.shop.id) {
                        return dayjs(a.start_time).isBefore(dayjs(b.start_time))
                          ? -1
                          : 1;
                      }
                      return a.shop.id - b.shop.id;
                    })
                    .reduce<
                      { shop: ShopOpenDates["shop"]; times: ShopOpenDates[] }[]
                    >((acc, time) => {
                      const shopIndex = acc.findIndex(
                        (group) => group.shop.id === time.shop.id
                      );
                      if (shopIndex > -1) {
                        acc[shopIndex].times.push(time);
                      } else {
                        acc.push({ shop: time.shop, times: [time] });
                      }
                      return acc;
                    }, [])
                    .map(({ shop, times }) => (
                      <tr key={shop.id} className="h-[50px]">
                        <td className="border px-4 py-2 text-center">
                          {shop.name}
                        </td>
                        {filteredMarkets.map((marketDate) => {
                          const isOpen = times.some((time) =>
                            dayjs(time.start_time).isSame(
                              dayjs(marketDate.start_time),
                              "day"
                            )
                          );
                          return (
                            <td
                              key={marketDate.id}
                              className={`border px-4 py-2 text-center ${
                                isOpen ? "bg-gray-200 text-gray-200" : ""
                              }`}
                            >
                              {isOpen ? "X" : ""}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={filteredMarkets.length + 1}
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
