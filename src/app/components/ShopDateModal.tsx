import React, { useState, useEffect, useMemo } from "react";

export interface ShopOpenDate {
  id: number;
  start_time: string;
  end_time: string;
}

export interface MarketDate {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  shop_open_dates?: ShopOpenDate[];
}

export interface ShopScheduleEntry {
  marketDateId: number;
  isOpen: boolean;
  from: string;
  to: string;
}

interface ShopDateModalProps {
  onScheduleChange: (schedule: ShopScheduleEntry[]) => void;
}

const ShopDateModal: React.FC<ShopDateModalProps> = ({ onScheduleChange }) => {
  const [marketDates, setMarketDates] = useState<MarketDate[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [schedule, setSchedule] = useState<Record<number, ShopScheduleEntry>>({});

  // เรียกข้อมูล marketDate ผ่าน API
  useEffect(() => {
    const fetchMarketDates = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_GO_API_URL}/marketDate`);
        if (!response.ok) throw new Error("Failed to fetch market open dates");
        const data = await response.json();
        // คาดหวังว่า API ส่งกลับเป็น object ที่มี property market_open_dates
        if (data && Array.isArray(data.market_open_dates)) {
          setMarketDates(data.market_open_dates);
        } else {
          console.error("Invalid data format", data);
        }
      } catch (error) {
        console.error("Error fetching market open dates:", error);
      }
    };

    fetchMarketDates();
  }, []);

  // ใช้ useMemo คำนวณ filteredDates เมื่อ marketDates, selectedYear, selectedMonth เปลี่ยนแปลงจริงๆ
  const filteredDates = useMemo(() => {
    return marketDates.filter((md) => {
      const d = new Date(md.date);
      return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
    });
  }, [marketDates, selectedYear, selectedMonth]);

  // เมื่อ filteredDates เปลี่ยน ให้ตั้งค่าเริ่มต้นใน schedule สำหรับแต่ละ marketDate
  useEffect(() => {
    setSchedule((prev) => {
      const newSchedule = { ...prev };
      let changed = false;
      filteredDates.forEach((md) => {
        if (!(md.id in newSchedule)) {
          if (md.shop_open_dates && md.shop_open_dates.length > 0) {
            const shopOpen = md.shop_open_dates[0];
            newSchedule[md.id] = {
              marketDateId: md.id,
              isOpen: true,
              from: shopOpen.start_time.substring(11, 16),
              to: shopOpen.end_time.substring(11, 16),
            };
          } else {
            newSchedule[md.id] = {
              marketDateId: md.id,
              isOpen: false,
              from: "",
              to: "",
            };
          }
          changed = true;
        }
      });
      return changed ? newSchedule : prev;
    });
  }, [filteredDates]);

  // ส่งข้อมูล schedule กลับไปยัง parent เมื่อ schedule เปลี่ยนแปลง
  useEffect(() => {
    onScheduleChange(Object.values(schedule));
  }, [schedule]); // onScheduleChange ถูก memoizeจาก parentแล้ว

  const handleToggle = (marketDateId: number) => {
    setSchedule((prev) => ({
      ...prev,
      [marketDateId]: {
        ...prev[marketDateId],
        isOpen: !prev[marketDateId].isOpen,
      },
    }));
  };

  const handleTimeChange = (marketDateId: number, field: "from" | "to", value: string) => {
    setSchedule((prev) => ({
      ...prev,
      [marketDateId]: {
        ...prev[marketDateId],
        [field]: value,
      },
    }));
  };

  const handlePreviousMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handleNextMonth = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const monthYearDisplay = new Date(selectedYear, selectedMonth, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">Open Schedule</h3>
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePreviousMonth} className="p-2 bg-gray-200 rounded">
          &lt;
        </button>
        <span className="font-medium">{monthYearDisplay}</span>
        <button onClick={handleNextMonth} className="p-2 bg-gray-200 rounded">
          &gt;
        </button>
      </div>
      {/* ส่วนหัวตาราง */}
      <div className="border-t border-b py-2 grid grid-cols-4 gap-4 font-semibold">
        <div className="flex items-center justify-center">เปิด</div>
        <div className="text-center">Date</div>
        <div className="text-center">From (start time)</div>
        <div className="text-center">To (end time)</div>
      </div>
      {/* รายการของแต่ละ marketDate */}
      {filteredDates.map((md) => {
        const dateObj = new Date(md.date);
        const formattedDate = dateObj.toLocaleDateString("th-TH", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const entry = schedule[md.id] || { isOpen: false, from: "", to: "" };
        return (
          <div key={md.id} className="grid grid-cols-4 gap-4 items-center py-2 border-b">
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                checked={entry.isOpen}
                onChange={() => handleToggle(md.id)}
              />
            </div>
            <div className="text-center">{formattedDate}</div>
            <div className="text-center">
              <input
                type="time"
                value={entry.from}
                onChange={(e) => handleTimeChange(md.id, "from", e.target.value)}
                disabled={!entry.isOpen}
                className="border p-1"
                min={md.start_time.substring(11, 16)}
                max={md.end_time.substring(11, 16)}
              />
            </div>
            <div className="text-center">
              <input
                type="time"
                value={entry.to}
                onChange={(e) => handleTimeChange(md.id, "to", e.target.value)}
                disabled={!entry.isOpen}
                className="border p-1"
                min={md.start_time.substring(11, 16)}
                max={md.end_time.substring(11, 16)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShopDateModal;
