import axios from "axios";

const LogoutButton = () => {
  const handleLogout = async () => {
    await axios.get("http://localhost:8080/logout");
    alert("Logged out successfully");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
