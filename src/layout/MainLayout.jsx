import React from "react";
import Topbar from "../components/TopBar"; // Import your Topbar component
import { Outlet } from "react-router-dom"; // Outlet renders the nested routes

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet /> {/* This renders the nested routes */}
      </div>
    </div>
  );
};

export default MainLayout;