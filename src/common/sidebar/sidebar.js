import React, { useState } from 'react';
import './sidebar.sass';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimerIcon from '@mui/icons-material/Timer';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useDispatch } from 'react-redux';
import { changeAppCurrent } from 'redux/slice';
import { Link } from 'react-router-dom';

export const menu = [
  {
    id: 1, link: '/', icon: <DashboardIcon />, title: 'Dashboard',
  },
  {
    id: 2, link: 'list-products-waiting', icon: <TimerIcon />, title: 'List products waiting',
  },
  {
    id: 3, link: 'list-products-accept', icon: <ListAltIcon />, title: 'List products accept',
  },
  {
    id: 4, link: 'list-user', icon: <PersonIcon />, title: 'List User',
  },
  {
    id: 5, link: 'list-shop-account', icon: <AddBusinessIcon />, title: 'List Shop',
  },
  {
    id: 6, link: '#', icon: <AdminPanelSettingsIcon />, title: 'List Admin',
  },

];

function SideBar() {
  const [itemActive, setItemActive] = useState(1);

  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(changeAppCurrent(id));
    setItemActive(id);
  };
  return (
    <div className="sidebar_container">
      <img src="/image/logo.png" alt="logo" className="sidebar_logo" />
      <div className="sidebar_groups">
        {
          menu.map((item) => (
            <div
              key={item.title}
              className={`sidebar_item ${itemActive === item.id ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
              aria-hidden="true"
            >
              <Link to={item.link}>
                <div className="sidebar_icon">{item.icon}</div>
                <div>{item.title}</div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default SideBar;
