import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore, Inbox, Logout, StarBorder } from "@mui/icons-material";
import { MenuDataset } from "../../../utils/helper";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const MenuItems = () => {

  const [open, setOpen] = useState({});

  const handleClick = (index) => {
    setOpen((prev)=>({
      [index]: !prev[index]
    }))
  } 

   return (
    <div>      
      <List>
        {MenuDataset?.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton onClick={() => handleClick(index)}>
              <ListItemIcon>
                <ShoppingCartOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
              {open[index] ? <ExpandLess fontSize="18px"/> : <ExpandMore fontSize="18px" />}
            </ListItemButton>

            {item?.submenu.map((subitem,i) => (
              <Collapse key={i} in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    to={subitem.link}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={subitem.name} />
                  </ListItemButton>
                </List>
              </Collapse>
            ))}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      
     <List>
     <ListItemButton>
        <ListItemIcon>
        <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
     </List>
    </div>
  );
};

export default MenuItems;
