import React from "react";
import { Box,Drawer as MuiDrawer, Typography } from "@mui/material";
import MenuItems from "./Menuitems";

const Drawer = ({ mobileOpen, onToggleDrawer }) => {
  const drawerWidth = 260;

  const DisplayCard = () =>{
    return (
      <div
      style={{
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1), 0px 3px 5px rgba(0, 0, 0, 0.1)",
        // borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#fff",
        margin:"10px"
      }}
    >
      {/* Left Section: Image Container */}
      <div
        style={{
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius:"7px"
        }}
      >
        <img
          src="/assets/images/logo.png"
          alt="Company Logo"
          style={{
            width: "80%",
            height: "80%",
            borderRadius: "8px",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
  
      {/* Right Section: Details */}
      <div
        style={{
          flex: 1,
          padding: "12px",
          backgroundColor: "#fff",
          // border:'2px solid #329980',
          // borderRadius:'12px'
        }}
      >
        <Typography variant="h6" style={{ marginBottom: "4px", fontWeight: "600" }}>
          Ghazal Alagh 
        </Typography>
      </div>
    </div>
    );
  }

  const drawerContent = (
    <>
      <DisplayCard/>
      <MenuItems/>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ 
        width: { sm: drawerWidth }, 
        flexShrink: { sm: 0 }, 
        backgroundColor:"#000"
       }}
      aria-label="menu items"
    >
      {/* Mobile Drawer */}
      <MuiDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={onToggleDrawer}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </MuiDrawer>

      {/* Permanent Drawer */}
      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </MuiDrawer>
    </Box>
  );
};

export default Drawer;
