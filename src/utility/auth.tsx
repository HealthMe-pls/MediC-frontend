import axios from 'axios';

interface OAuthLoginResponse {
  success: boolean;
  error?: string;
  token?: string;
}

export const loginWithInfomaniak = async (email: string, password: string) => {
    try {
        const url = `/api/auth/oauth/login`
      // Make the POST request to the backend
      const response = await axios.post<OAuthLoginResponse>(url, { email, password });
  
      // Check if the backend response is successful
      if (response.data.success && response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("oauthToken", response.data.token);
        return { success: true };  // Return success if login is successful
      } else {
        return { success: false, error: response.data.error || "Login failed" }; // Return failure and error if login fails
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, error: "An error occurred while logging in." };  // Return error if any exception occurs
    }
  };

export const logoutWithInfomaniak = async () => {
  try {
    const url = `/api/auth/oauth/logout`
    // ส่ง request ไปที่ backend ของคุณเพื่อ logout
    await axios.post(url);

    // ลบ token ที่เก็บไว้ใน localStorage
    localStorage.removeItem("oauthToken");

    console.log("Logged out successfully.");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:80',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const loginWithInfomaniak = async (email: string, password: string) => {
//   try {
//     const response = await apiClient.post('/api/auth/oauth/login', {
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error during login:', error);
//     throw error;
//   }
// };

// export const logoutWithInfomaniak = async () => {
//   try {
//     const response = await apiClient.post('/api/auth/oauth/logout');
//     return response.data;
//   } catch (error) {
//     console.error('Error during logout:', error);
//     throw error;
//   }
// };
export const exchangeCodeForToken = async (code: string) => {
  try {
    const url = `/api/auth/callback`
    const response = await axios.post(url, { code });

    // ใช้ Type Assertion เพื่อบอก TypeScript ว่าค่าของ response.data ควรเป็นชนิดใด
    const token = (response.data as { token?: string }).token;

    if (token) {
      localStorage.setItem("access_token", token);
    }

    return response.data;
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    throw error;
  }
};
