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

export const menu = [
  { id: 1, icon: <DashboardIcon />, title: 'Dashboard' },
  { id: 2, icon: <TimerIcon />, title: 'DS chờ' },
  { id: 3, icon: <ListAltIcon />, title: 'DS đã bán' },
  { id: 4, icon: <PersonIcon />, title: 'DS User' },
  { id: 5, icon: <AddBusinessIcon />, title: 'DS Shop' },
  { id: 6, icon: <AdminPanelSettingsIcon />, title: 'DS Admin' },

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
                <div className="sidebar_icon">{item.icon}</div>
                <div>{item.title}</div>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default SideBar;
