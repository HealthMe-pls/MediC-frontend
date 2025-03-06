import axios from "axios";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/login"; // Redirect ไป Go backend
  };

  return <button onClick={handleLogin}>Login with Infomaniak</button>;
};

export default LoginButton;
