import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './header.sass';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector } from 'react-redux';
import { menu } from 'common/sidebar/sidebar';
import { Link } from 'react-router-dom';

function Header({ cls }) {
  const navCurrentId = useSelector((state) => state.app.navCurrentId);

  return (
    <div className={`header_container ${cls ? 'header_scroll' : ''}`}>
      <div className="header_navCurrent">
        <div>
          {menu[navCurrentId - 1].icon}
        </div>
        <div>
          {menu[navCurrentId - 1].title}
        </div>
      </div>
      <div className="header_action">
        <div>
          <TextField label="Search heare" size="small" fullWidth color="primary" />
        </div>
        <div>
          <Link to="/login">
            <AccountCircleIcon />
          </Link>
        </div>
        <div>
          <SettingsIcon />
        </div>
        <div>
          <NotificationsIcon />
        </div>
      </div>
    </div>
  );
}

export default Header;
