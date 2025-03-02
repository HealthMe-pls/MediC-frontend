export interface MarketOpenDate {
    id: number;
    date: string;
    start_time: string;
    end_time: string;
}

export async function fetchMarketOpenDates(): Promise<MarketOpenDate[]> {
    try {
      const url = `/api/market-open-dates`;
      console.log("Fetching market-open-dates from URL:", url);
  
      const response = await axios.get<MarketOpenDate[]>(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data as MarketOpenDate[];
    } catch (error) {
      console.error("Error fetching market-open-dates:", error);
      throw error;
    }
  }
  