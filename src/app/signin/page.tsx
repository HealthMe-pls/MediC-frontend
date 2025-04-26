"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Perform authentication with Infomaniak
      const response = await signIn("infomaniak", {
        email,
        password,
        redirect: false, // Prevent auto-redirect
      });

      if (response?.error) {
        setError("Invalid credentials");
      } else {
        // Redirect to admin page on successful login
        router.push("/admin");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", fontSize: "16px", width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", fontSize: "16px", width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
            Sign In
          </button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
