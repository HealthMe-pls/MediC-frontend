"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginEntrepreneur, AuthResponse } from "@/utility/login";
import styles from "./login.module.css";
import Logo from "../../../public/assets/logo.png";
import Image from "next/image";
import { AxiosError, isAxiosError } from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response: AuthResponse = await loginEntrepreneur({
        username: email,
        password,
      });
  
      if (response.error) {
        setError("รหัสผ่านหรือ username ไม่ถูกต้อง");
      } else {
        setToken(response.token || "");
        if (response.token) {
          // บันทึก token ลง localStorage
          localStorage.setItem("authToken", response.token);
          // หาก response มีข้อมูลผู้ใช้ (response.user) ให้เก็บ entrepreneurId ด้วย
          if (response.user) {
            const user = response.user;
            localStorage.setItem("entrepreneurId", user.id.toString());  // เก็บ entrepreneurId ที่ถูกต้อง
            localStorage.setItem("username", user.username);
            localStorage.setItem("password", user.password);
          }
          router.push("/vendor");
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const err = error as AxiosError;
        if (err.response) {
          setError("เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง");
        } else {
          setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
        }
      } else {
        setError("เกิดข้อผิดพลาดบางประการ");
      }
    }
  };
  
  
  const handleForgotPassword = () => {
    router.push("/vendor/contactToAdmin");
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
            <Image
              src={Logo}
              alt="Logo"
              className={styles.logo}
              width={100}
              height={100}
            />
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
              <div className={styles.successMessage}>Login successful!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
