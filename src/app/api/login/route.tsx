import axios from "axios";
import { NextResponse } from "next/server";
import { setCorsHeaders } from "@/utility/corsUtils";

export async function POST(req: Request) {
  try {
    const headers = new Headers();
    setCorsHeaders(headers);
    const body = await req.json();
    console.log("Login request body:", body); // Log the incoming data

    // Send the login request to Go backend using axios
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/login`, // Your Go backend URL
      body, // Pass the request body directly
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response from Go backend
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("POST Request Error:", error);

    // You can handle specific error codes or just return a general error message
    return NextResponse.json(
      { message: "Login failed"},
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("Login request body:", body); // Log the incoming data

//     // Send the login request to Go backend
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_GO_API_URL}/login`, // Your Go backend URL
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     // Handle the response from Go backend
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("API Error Response from Go:", errorText);
//       throw new Error("Login failed");
//     }

//     // Parse the successful response
//     const data = await response.json();

//     // Forward the response to the frontend
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error("POST Request Error:", error);
//     return NextResponse.json(
//       { message: "Login failed" },
//       { status: 500 }
//     );
//   }
// }
