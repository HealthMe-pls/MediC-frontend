"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  fetchMarketOpenDates,
  MarketOpenDate,
} from "@/utility/ManageMarketHours";
import { ShopOpenDates } from "./types";
import "./styles/HoursTable.css";

const normalizeMarketDates = (dates: MarketOpenDate[]): MarketOpenDate[] => {
  return dates
    .map((item) => ({
      ...item,
      date: new Date(item.date).toISOString(),
      start_time: new Date(item.start_time).toISOString(),
      end_time: new Date(item.end_time).toISOString(),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const parseTime = (timeStr: string): number => {
  const parts = timeStr.split(":");
  const hour = parseInt(parts[0], 10);
  const minute = parseInt(parts[1], 10);
  return hour * 60 + minute;
};

const formatTime = (hour: number, minute: number): string => {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:00`;
};

interface MarketHoursTableProps {
  shopId?: number;
  initialShopHours?: ShopOpenDates[];
  onShopHoursChange?: (shopHours: ShopOpenDates[]) => void;
}

const MarketHoursTable: React.FC<MarketHoursTableProps> = ({
  shopId = 0,
  initialShopHours,
  onShopHoursChange,
}) => {
  const [marketOpenDates, setMarketOpenDates] = useState<MarketOpenDate[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [shopHours, setShopHours] = useState<{ [id: number]: ShopOpenDates }>(
    {}
  );
  const initializedRef = useRef(false);

  useEffect(() => {
    fetchMarketOpenDates()
      .then((data) => {
        const normalizedDates = normalizeMarketDates(data.market_open_dates);
        setMarketOpenDates(normalizedDates);
        if (normalizedDates.length > 0) {
          const firstDate = new Date(normalizedDates[0].date);
          setSelectedYear(firstDate.getFullYear());
          setSelectedMonth(firstDate.getMonth());
        }
      })
      .catch((error) =>
        console.error("Error fetching market open dates:", error)
      );
  }, []);

  // useEffect(() => {
  //   console.log(shopHours);
  // });

  useEffect(() => {
    if (marketOpenDates.length === 0 || initializedRef.current) return;

    const newShopHours: { [id: number]: ShopOpenDates } = {};

    if (initialShopHours && initialShopHours.length > 0) {
      marketOpenDates.forEach((date) => {
        const matching = initialShopHours.find(
          (item) => item.market_open_date_id === date.id
        );

        if (matching) {
          newShopHours[date.id] = {
            ...matching,
            start_time:
              new Date(matching.start_time).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }) + ":00",
            end_time:
              new Date(matching.end_time).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }) + ":00",
          };
        } else {
          newShopHours[date.id] = {
            id: Date.now(),
            start_time: "",
            end_time: "",
            shop_id: shopId,
            market_open_date_id: date.id,
          };
        }
      });
    } else {
      marketOpenDates.forEach((date) => {
        newShopHours[date.id] = {
          id: Date.now(),
          start_time: "",
          end_time: "",
          shop_id: shopId,
          market_open_date_id: date.id,
        };
      });
    }

    setShopHours(newShopHours);
    initializedRef.current = true;
  }, [marketOpenDates, initialShopHours, shopId]);

  useEffect(() => {
    if (onShopHoursChange) {
      onShopHoursChange(Object.values(shopHours));
    }
  }, [shopHours, onShopHoursChange]);

  const handlePreviousMonth = () => {
    setSelectedMonth((prevMonth) => {
      if (prevMonth === 0) {
        setSelectedYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => {
      if (prevMonth === 11) {
        setSelectedYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const filteredDates = marketOpenDates.filter((item) => {
    const dateObj = new Date(item.date);
    return (
      dateObj.getFullYear() === selectedYear &&
      dateObj.getMonth() === selectedMonth
    );
  });

  const currentMonthDisplay = new Date(
    selectedYear,
    selectedMonth,
    1
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleCheckboxChange = (marketDateId: number) => {
    setShopHours((prev) => {
      const current = prev[marketDateId];
      const isOpen = current && current.start_time !== "";
      if (isOpen) {
        return {
          ...prev,
          [marketDateId]: {
            ...current,
            start_time: "",
            end_time: "",
          },
        };
      } else {
        const marketDate = marketOpenDates.find((d) => d.id === marketDateId);
        if (marketDate) {
          const fromTimeStr = new Date(
            marketDate.start_time
          ).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          const toTimeStr = new Date(marketDate.end_time).toLocaleTimeString(
            "en-GB",
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }
          );
          return {
            ...prev,
            [marketDateId]: {
              ...current,
              start_time: `${fromTimeStr}:00`,
              end_time: `${toTimeStr}:00`,
            },
          };
        }
      }
      return prev;
    });
  };

  const handleTimeChange = (
    marketDateId: number,
    field: "startHour" | "startMinute" | "endHour" | "endMinute",
    value: string
  ) => {
    const trimmedValue = value.slice(0, 2);
    setShopHours((prev) => {
      const current = prev[marketDateId];
      if (!current.start_time && !current.end_time) return prev;
      const marketDate = marketOpenDates.find((d) => d.id === marketDateId);
      if (!marketDate) return prev;
      const marketFromTimeStr =
        new Date(marketDate.start_time).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }) + ":00";
      const marketToTimeStr =
        new Date(marketDate.end_time).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }) + ":00";
      const minAllowed = parseTime(marketFromTimeStr);
      const maxAllowed = parseTime(marketToTimeStr);
      let currentTimeStr = field.startsWith("start")
        ? current.start_time
        : current.end_time;
      const parts = currentTimeStr.split(":");
      let currentHour = parseInt(parts[0], 10);
      let currentMinute = parseInt(parts[1], 10);
      let newHour = currentHour;
      let newMinute = currentMinute;
      if (field === "startHour" || field === "endHour") {
        newHour = parseInt(trimmedValue, 10);
      } else {
        newMinute = parseInt(trimmedValue, 10);
      }
      const newTotal = newHour * 60 + newMinute;
      const clamped = Math.min(Math.max(newTotal, minAllowed), maxAllowed);
      const clampedHour = Math.floor(clamped / 60);
      const clampedMinute = clamped % 60;
      const newTimeStr = formatTime(clampedHour, clampedMinute);
      if (field.startsWith("start")) {
        return {
          ...prev,
          [marketDateId]: {
            ...current,
            start_time: newTimeStr,
          },
        };
      } else {
        return {
          ...prev,
          [marketDateId]: {
            ...current,
            end_time: newTimeStr,
          },
        };
      }
    });
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">Open Schedule</h3>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePreviousMonth}
          className="text-2xl"
        >
          &lt;
        </button>
        <span className="text-lg font-medium">{currentMonthDisplay}</span>
        <button type="button" onClick={handleNextMonth} className="text-2xl">
          &gt;
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Open?</th>
              <th className="border px-4 py-2 text-left">Opening Date</th>
              <th className="border px-4 py-2 text-left">From</th>
              <th className="border px-4 py-2 text-left">To</th>
            </tr>
          </thead>
          <tbody>
            {filteredDates.length > 0 ? (
              filteredDates.map((date) => {
                const defaultFromTimeStr = new Date(
                  date.start_time
                ).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });
                const defaultToTimeStr = new Date(
                  date.end_time
                ).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });
                const defaultFromHour = defaultFromTimeStr.split(":")[0];
                const defaultFromMinute = defaultFromTimeStr.split(":")[1];
                const defaultToHour = defaultToTimeStr.split(":")[0];
                const defaultToMinute = defaultToTimeStr.split(":")[1];
                const shopHourForDate = shopHours[date.id] ?? {
                  id: date.id,
                  start_time: "",
                  end_time: "",
                  shop_id: shopId,
                  market_open_date_id: date.id,
                };
                const isOpen = shopHourForDate.start_time !== "";
                const startHourValue = isOpen
                  ? shopHourForDate.start_time.split(":")[0]
                  : "";
                const startMinuteValue = isOpen
                  ? shopHourForDate.start_time.split(":")[1]
                  : "";
                const endHourValue = isOpen
                  ? shopHourForDate.end_time.split(":")[0]
                  : "";
                const endMinuteValue = isOpen
                  ? shopHourForDate.end_time.split(":")[1]
                  : "";
                return (
                  <tr key={date.id} className="border-b">
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={isOpen}
                        onChange={() => handleCheckboxChange(date.id)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      {new Date(date.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        {/* Dropdown เลือกชั่วโมง */}
                        <select
                          value={startHourValue}
                          onChange={(e) =>
                            handleTimeChange(
                              date.id,
                              "startHour",
                              e.target.value
                            )
                          }
                          disabled={!isOpen}
                          className={`w-14 border p-1 rounded text-center ${
                            !isOpen ? "bg-gray-200" : ""
                          }`}
                        >
                          {Array.from({ length: 24 }, (_, i) => (
                            <option
                              key={i}
                              value={i.toString().padStart(2, "0")}
                            >
                              {i.toString().padStart(2, "0")}
                            </option>
                          ))}
                        </select>

                        <span className="px-1">:</span>

                        {/* Dropdown เลือกนาที */}
                        <select
                          value={startMinuteValue}
                          onChange={(e) =>
                            handleTimeChange(
                              date.id,
                              "startMinute",
                              e.target.value
                            )
                          }
                          disabled={!isOpen}
                          className={`w-14 border p-1 rounded text-center ${
                            !isOpen ? "bg-gray-200" : ""
                          }`}
                        >
                          {Array.from({ length: 60 }, (_, i) => (
                            <option
                              key={i}
                              value={i.toString().padStart(2, "0")}
                            >
                              {i.toString().padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        {/* Dropdown เลือกชั่วโมงสิ้นสุด */}
                        <select
                          value={endHourValue}
                          onChange={(e) =>
                            handleTimeChange(date.id, "endHour", e.target.value)
                          }
                          disabled={!isOpen}
                          className={`w-14 border p-1 rounded text-center ${
                            !isOpen ? "bg-gray-200" : ""
                          }`}
                        >
                          {Array.from({ length: 24 }, (_, i) => (
                            <option
                              key={i}
                              value={i.toString().padStart(2, "0")}
                            >
                              {i.toString().padStart(2, "0")}
                            </option>
                          ))}
                        </select>

                        <span className="px-1">:</span>

                        {/* Dropdown เลือกนาทีสิ้นสุด */}
                        <select
                          value={endMinuteValue}
                          onChange={(e) =>
                            handleTimeChange(
                              date.id,
                              "endMinute",
                              e.target.value
                            )
                          }
                          disabled={!isOpen}
                          className={`w-14 border p-1 rounded text-center ${
                            !isOpen ? "bg-gray-200" : ""
                          }`}
                        >
                          {Array.from({ length: 60 }, (_, i) => (
                            <option
                              key={i}
                              value={i.toString().padStart(2, "0")}
                            >
                              {i.toString().padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No dates available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketHoursTable;
