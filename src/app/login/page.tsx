"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithInfomaniak } from "@/utility/auth"; // Import your utility function


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
  
    const handleLogin = async () => {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }
  
      try {
        // Call the login function (which makes the backend API request)
        const result = await loginWithInfomaniak(email, password);
  
        // Handle the result of the login attempt
        if (result.success) {
          // Redirect to dashboard if login is successful
          router.push("/profile");
        } else {
          setError(result.error || "Invalid credentials.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setError("An error occurred while logging in.");
      }
    };
  
    return (
      <div>
        <h1>Login</h1>
        {error && <div style={{ color: "red" }}>{error}</div>}
  
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
  
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };
  
  export default LoginPage;