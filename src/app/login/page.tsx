"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginEntrepreneur, AuthResponse } from "@/utility/login";
import styles from "./login.module.css";
const imgLogo = "/assets/logo.png"; // Assuming logo is in public/assets

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response: AuthResponse = await loginEntrepreneur({
      username: email, // Assuming email is used as username in your API
      password,
    });

    if (response.error) {
      setError(response.error);
    } else {
      setToken(response.token || "");
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        console.log("Token stored:", localStorage.getItem("authToken"));
        router.push("/entrepreneurLogin");
      }
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password feature is not implemented yet.");
  };

  return (
    <div>
      <div className="block md:hidden justify-center items-center min-h-screen">
        <div className={styles.container}>
          {/* Left Block */}

          {/* Login Container */}
          <div className={styles.loginContainer}>
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.inputGroup}>
                <h1 className={styles.loginTitle}>Log in</h1>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.inputField}
                />
                <div
                  onClick={handleForgotPassword}
                  className={styles.forgotPassword}
                >
                  Forgot your password?
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>
                Log in
              </button>
            </form>

            {error && <div className={styles.errorMessage}>{error}</div>}
            {token && (
              <div className={styles.successMessage}>
                Login successful! Token: {token}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className={styles.container}>
          {/* Left Block */}
          <div className={styles.leftBlock}>
            <img src={imgLogo} alt="Logo" className={styles.logo} />
          </div>

          {/* Login Container */}
          <div className={styles.loginContainer}>
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.inputGroup}>
                <h1 className={styles.loginTitle}>Log in</h1>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.inputField}
                />
                <div
                  onClick={handleForgotPassword}
                  className={styles.forgotPassword}
                >
                  Forgot your password?
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>
                Log in
              </button>
            </form>

            {error && <div className={styles.errorMessage}>{error}</div>}
            {token && (
              <div className={styles.successMessage}>
                Login successful! Token: {token}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
