import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Stack from '@mui/material/Stack';
import './CustomAccordion.css'; // Import your CSS for styling

function HorizontalMenu() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0 });

  const handleDashboardClick = (event) => {
    setOpen(!open);
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({ left: rect.right, top: rect.top });
  };

  return (
    <Stack direction="row" className="stackContainer">
    <List className="horizontal-menu">
      <ListItem button onClick={handleDashboardClick} >
        <Stack direction="row" alignItems="center" spacing={1}>
          <ArrowForwardIosIcon />
          <ListItemText primary="Dashboard" />
        </Stack>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit style={position}>
        <List component="div" disablePadding className="sub-items-container">
          <ListItem button>
            <ArrowForwardIosIcon />
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button>
            <ArrowForwardIosIcon />
            <ListItemText primary="Products" />
          </ListItem>
          {/* ... more options ... */}
        </List>
      </Collapse>
    </List>
    </Stack>
  );
}

export default HorizontalMenu;
