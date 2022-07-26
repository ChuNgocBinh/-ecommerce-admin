import React, { useEffect, useState } from 'react';
import Header from 'common/header/header';
import SideBar from 'common/sidebar/sidebar';
import './layout.sass';
import useAuth from 'hook/useAuth';
import Login from 'views/login/login';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from 'redux/slice';

function Layout({ children }) {
  const [scroll, setScroll] = useState(false);
  const user = useAuth();

  const handleScroll = () => {
    if (window.scrollY !== 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="layout_container ">
      {
        user && (
          <div className="layout_sidebar ">
            <SideBar />
          </div>
        )
      }
      <div className={user && 'layout_children'}>
        {
          user && (
            <div className="layout_header">
              <Header cls={scroll} />
            </div>
          )
        }
        {children}
      </div>
    </div>
  );
}

export default Layout;
