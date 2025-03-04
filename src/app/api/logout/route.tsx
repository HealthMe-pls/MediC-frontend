import axios from "axios";

export async function logout(token: string) {
  try {
    console.log("Logout request with token:", token); // Log the token for debugging

    // Send the logout request to the Go backend to blacklist the token
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_GO_API_URL}/logout`, // Your Go backend URL
      { token }, // Optionally, you can send the token in the request body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      }
    );

    // Handle the successful response
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    return { message: "Logout failed"};
  }
}
