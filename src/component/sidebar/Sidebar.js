import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const adminMenuItems = [
    { label: "Publish News", path: "/dashboard" },
    { label: "Publish Video", path: "/publish_video" },
    { label: "Publish Podcast", path: "/publish_podcast" },
    { label: "Custom Ads", path: "/custom-ads" },
    { label: "Spotify Playlist", path: "/spotify-playlist" },
    { label: "Administrators", path: "/administrators" },
    { label: "About Us", path: "/about" },
    { label: "Career", path: "/career" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Logout", path: "/logout" },
  ];

  const publisherMenuItems = [
    { label: "Publish News", path: "/dashboard" },
    { label: "Publish Video", path: "/publish_video" },
    { label: "Publish Podcast", path: "/publish_podcast" },
    { label: "Logout", path: "/logout" },
  ];

  const menuItems = role === "Publisher" ? publisherMenuItems : adminMenuItems;

  return (
    <div
      style={{
        width: collapsed ? "60px" : "220px",
        background: "#003049",
        color: "#fff",
        minHeight: "100vh",
        transition: "width 0.3s ease",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: collapsed ? "center" : "space-between",
          alignItems: "center",
        }}
      >
        {!collapsed && (
          <h3 style={{ color: "#fff", margin: 0, fontSize: "18px" }}>
            XDiaspora Media
          </h3>
        )}
        <MenuOutlined
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: "20px", color: "#fff", cursor: "pointer" }}
        />
      </div>

      <nav style={{ marginTop: "20px" }}>
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            style={{
              color: "#fff",
              display: "block",
              padding: "12px 20px",
              background:
                location.pathname === item.path ? "#1a659e" : "transparent",
              textDecoration: "none",
              fontSize: "15px",
            }}
          >
            {collapsed ? item.label.charAt(0) : item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
