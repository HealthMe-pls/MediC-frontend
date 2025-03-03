import axios from "axios";

export interface MarketOpenDate {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
}

export interface MarketOpenDatesResponse {
  market_open_dates: MarketOpenDate[];
}

export async function fetchMarketOpenDates(): Promise<MarketOpenDate[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_GO_API_URL}/marketDate/`;
    console.log("Fetching market-open-dates from URL:", url);

    const response = await axios.get<MarketOpenDatesResponse>(url, {
      headers: { "Content-Type": "application/json" },
    });

    const filteredDates = response.data.market_open_dates.map((item) => ({
      id: item.id,
      date: item.date,
      start_time: item.start_time,
      end_time: item.end_time,
    }));

    return filteredDates;
  } catch (error) {
    console.error("Error fetching market-open-dates:", error);
    throw error;
  }
}
