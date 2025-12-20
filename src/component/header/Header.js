import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    try {
      const res = await axios.get(
        "http://192.168.31.169:5001/api/admins/" + localStorage.getItem("id"),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // Check admin status
      const data = res?.data?.admins[0];
      console.log("Admin status check:", data);

      if (data.status !== "Active") {
        console.warn("Admin status is not Active — logging out.");
        window.location.href = "/logout";
      }
    } catch (err) {
      console.error("API error caught:", err);

      if (err.response) {
        if (err.response.status === 401) {
          console.warn("401 Unauthorized — logging out.");
          window.location.href = "/logout";
        } else {
          console.error("API error with status:", err.response.status);
        }
      } else {
        console.error("No response received. Possible network or CORS error.");
      }
    }
  };

  useEffect(() => {
    fetchMessage();

    const interval = setInterval(() => {
      fetchMessage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "60px",
        background: "#EAE2B7",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#fff",
      }}
    >
      <h2
        style={{
          flex: 1,
          textAlign: "center",
          margin: 0,
          fontSize: "20px",
          color: "#000000",
        }}
      >
        Corper News Admin Panel
      </h2>

      <div style={{ fontSize: "14px", color: "#000000" }}>
        Welcome, {localStorage.getItem("name") || "Admin"}
      </div>
    </div>
  );
};

export default Header;
