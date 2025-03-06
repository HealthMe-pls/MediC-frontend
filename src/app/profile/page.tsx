"use client"
import { useEffect, useState } from "react";

const Profile = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      {accessToken ? <p>Access Token: {accessToken}</p> : <p>Please log in</p>}
    </div>
  );
};

export default Profile;

