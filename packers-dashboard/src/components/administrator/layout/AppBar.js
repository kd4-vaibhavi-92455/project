import React from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const AppBar = ({ onToggleDrawer }) => {
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - 260px)` }, 
        ml: { sm: `240px` },
        backgroundColor:'#329980',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onToggleDrawer}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70px",
          }}
        >
          <div style={{backgroundColor:'#fff',borderRadius:'12px'}} ><img src="/assets/images/logo.png" width="50px" height="50px" /></div>
          <Typography
            fontSize={18}
            fontWeight={600}
            fontFamily={"poppins"}
            margin={"0 20px 0"}
          >
            G - Mart
          </Typography>
        </div>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
