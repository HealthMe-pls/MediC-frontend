import { setCorsHeaders } from "@/utility/corsUtils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log("Received Request:", req); // Debug: Log the full request object

    // Set up headers and CORS
    const headers = new Headers();
    setCorsHeaders(headers); // Apply CORS headers

    // Extract the Authorization header (Bearer token)
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    console.log("Extracted Token:", token); // Debug: Log the extracted token

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Call the backend API to fetch the shop details using the token
    console.log("Trying to connect to the API route..."); // Debug: Log attempt to connect to the external API
    const response = await fetch(`${process.env.NEXT_PUBLIC_GO_API_URL}/shopLogin`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        ...Object.fromEntries(headers), // Include any other headers if needed
      },
    });

    console.log("API Response Status:", response.status); // Debug: Log API response status

    // If the response is not OK, log the response body
    if (!response.ok) {
      const errorResponse = await response.text();  // Get the response text if not ok
      console.log("Error response body:", errorResponse); // Debug: Show error details from response
      throw new Error("Failed to fetch shop details");
    }

    // Parse the shop details from the response
    const shopDetails = await response.json();
    console.log("Shop Details:", shopDetails); // Debug: Log the fetched shop details

    // Return the shop details in the response
    return NextResponse.json(shopDetails, { status: 200 });
  } catch (error: unknown) {
    // Type assertion: Assert that the error is an instance of Error
    if (error instanceof Error) {
      console.error("Error in GET Route:", error.message);
      console.error("Error Stack:", error.stack); // Log error stack for more detail

      // Return a detailed error message in the response
      return NextResponse.json(
        { message: "Failed to fetch shop details", error: error.message },
        { status: 500 }
      );
    }

    // Handle unknown errors (if not an instance of Error)
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log("Request received:", req.method);  // Log the method of the request

//   if (req.method === "GET") {
//     try {
//       const token = req.headers.authorization?.replace("Bearer ", "");
//       console.log("Received Token:", token);  // Log the token received

//       if (!token) {
//         console.error("No token provided");
//         return res.status(400).json({ message: "No token provided" });
//       }

//       // Simulate API call or fetch data using the token
//       const shopDetails = await getShopDetails(token); // Replace with actual logic
//       console.log("Fetched shop details:", shopDetails);  // Log fetched details

//       return res.status(200).json(shopDetails);
//     } catch (error) {
//       console.error("Error in API route:", error);  // Log error in the catch block
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   } else {
//     console.error("Method Not Allowed:", req.method);  // Log method not allowed
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
// }

// async function getShopDetails(token: string) {
//   // Example logic for fetching shop details based on token
//   // Replace this with your actual fetch logic
//   console.log("Simulating shop details fetch with token:", token);
//   return {
//     name: "Sample Shop",
//     location: "Sample Location",
//   };
// }
