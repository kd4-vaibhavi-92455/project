import React from "react";
import { useLocation } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import TopBar from "./userinterface/usercomponents/header/TopBar";
// import TopBar from "../userinterface/usercomponents/header/TopBar";
import SubHeader from "./userinterface/usercomponents/header/SubHeader";
// ./userinterface/usercomponents/header/SubHeader

/**
 * Layout Component
 * This wraps common UI elements (like TopBar and SubHeader) around page content.
 */
const Layout = ({ children }) => {
  const location = useLocation();

  // Check if current page is Home
  const isHomePage = location.pathname === "/";

  // Check for mobile view using MUI's responsive hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      {/* Always visible navigation bar */}
      <TopBar />

      {/* Conditionally render SubHeader only on home page for non-mobile screens */}
      {!isMobile && (
        <Box sx={{ marginTop: "66px" }}>{isHomePage && <SubHeader />}</Box>
      )}

      {/* Main Page Content */}
      <div>{children}</div>
    </div>
  );
};

export default Layout;