import React from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

const MainLayout = () => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ padding: "20px", flex: 1, overflow: "auto" }}>
        <Outlet />
      </div>
    </div>
  </div>
);

export default MainLayout;
