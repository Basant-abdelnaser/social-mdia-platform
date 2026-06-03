import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
