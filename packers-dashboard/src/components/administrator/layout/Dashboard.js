import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import MainContent from "./MainContent";
import { useLocation } from "react-router";

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const route = useLocation();

  // Check if state exists and extract companyid safely
  const companyid =
    route.state?.companyid || localStorage.getItem("global_companyid") || "";

  useEffect(() => {
    if (companyid) {
      localStorage.setItem("global_companyid", companyid);
    }
  }, [companyid]);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar onToggleDrawer={toggleDrawer} />
      <Drawer mobileOpen={mobileOpen} onToggleDrawer={toggleDrawer} />
      <MainContent />
    </Box>
  );
};

export default Dashboard;
