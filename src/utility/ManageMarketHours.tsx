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

export interface MarketOpenDate {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
}

export async function fetchMarketOpenDates(): Promise<MarketOpenDatesResponse> {
  try {
    const url = `/api/marketDate`;
    console.log("Fetching market-open-dates from URL:", url);

    const response = await axios.get<MarketOpenDatesResponse>(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as MarketOpenDatesResponse;
  } catch (error) {
    console.error("Error fetching market-open-dates:", error);
    throw error;
  }
}

export async function fetcMarketOpenDatesById(id: number): Promise<MarketOpenDate> {
  try {
    const response = await axios.get<MarketOpenDate>(`/api/marketDate/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch MarketOpenDate by id");
    }
    return response.data as MarketOpenDate;
  } catch (error) {
    throw error;
  }
}