import { NextResponse } from "next/server";
// // GET - Fetch all workshops
export async function GETWorkshop() {
  console.log("Fetching workshops from backend...");
  console.log(
    "Backend URL:",
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/workshops`
  );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/workshops`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch workshops (in route) ");
    }

    const workshops = await response.json();
    const headers = new Headers();
    return NextResponse.json(workshops, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch workshops (in route) 2" },
      { status: 500 }
    );
  }
}
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log("Fetching workshops from backend...");
// console.log("Backend URL:", `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/workshops`);

//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workshops`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch workshops from the backend");
//     }

//     const workshops = await response.json();
//     res.status(200).json(workshops); // Return workshops to the utility
//   } catch (error) {
//     console.error("Error fetching workshops from backend:", error);
//     res.status(500).json({ message: "Failed to fetch workshops from backend" });
//   }
// }
