"use client";

import { useState } from "react";
import { loginEntrepreneur, AuthResponse } from "@/utility/login"; // Make sure to import your login function

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error

    const response: AuthResponse = await loginEntrepreneur({
      username,
      password,
    });

    if (response.error) {
      setError(response.error);
    } else {
      setToken(response.token || "");
      // Store token in localStorage or cookies
      if (response.token) {
        localStorage.setItem("authToken", response.token); // Or use cookies for better security
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {token && (
        <div style={{ color: "green" }}>
          Login successful! Your token: {token}
        </div>
      )}
    </div>
  );
};

export default Login;
