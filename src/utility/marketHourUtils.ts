import { MarketOpenDate } from "./ManageMarketHours";

export const combineMarketHourDateTime = (date: string, time: string): string => {
    return new Date(`${date}T${time}:00`).toISOString();
  };
  
  export const normalizeMarketHourDates = (dates: MarketOpenDate[]): MarketOpenDate[] => {
    return dates
      .map((item) => ({
        ...item,
        date: new Date(item.date).toISOString(),
        start_time: new Date(item.start_time).toISOString(),
        end_time: new Date(item.end_time).toISOString(),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  