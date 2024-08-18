import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Stack from '@mui/material/Stack';
import './CustomAccordion.css'; // Import your CSS for styling
import { useParams, useNavigate } from "react-router-dom";
function HorizontalMenu() {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    setOpen(!open);
  };

  const handleStockClick = () => {
    setSecondOpen(!secondOpen);
  };

  const handleProductClick = () => {
    navigate("/saleproduct")
  };
  return (
    <Stack direction="row" className="stackContainer">
    <List className="horizontal-menu"  height={50}>
      <ListItem  onClick={handleDashboardClick} className="dashboard-button">
        <Stack direction="row" alignItems="center" spacing={1}>
          <ArrowForwardIosIcon />
          <ListItemText primary="Dashboard" />
        </Stack>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className="sub-items-container">
          <ListItem   onClick={handleProductClick} >
            <ArrowForwardIosIcon />
            <ListItemText primary="Product" />
          </ListItem>
          <ListItem onClick={handleStockClick}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <ArrowForwardIosIcon />
                <ListItemText primary="Stock" />
            </Stack>
          </ListItem>
          <Collapse in={secondOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className="sub-items-container">
              <ListItem >
                <ArrowForwardIosIcon />
                <ListItemText primary="color" />
              </ListItem>
              <ListItem >
                <ArrowForwardIosIcon />
                <ListItemText primary="company"  className="sub-item-button"/>
              </ListItem>
          
          {/* ... more options ... */}
        </List>
      </Collapse>
          {/* ... more options ... */}
        </List>
      </Collapse>
    </List>
    </Stack>
  );
}

export default HorizontalMenu;
