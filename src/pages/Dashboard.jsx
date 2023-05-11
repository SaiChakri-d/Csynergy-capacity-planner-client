import React from "react";
import ResponsiveDrawer from "../components/dashboardItems/ResponsiveDrawer";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
      <div>
        <ResponsiveDrawer />
      </div>
      <div className="out">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
