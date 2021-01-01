import React, { useState, useEffect } from 'react';

// modules
import { useLocation } from 'react-router-dom';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faCode } from '@fortawesome/free-solid-svg-icons';

import Logo from '../Logo/Logo';

// css
import './Sidebar.css'

// components
import NavLink from '../Links/NavLink';

const NavLinks = ({ activeRoute, onLinkClick }) => {
  const routes = [
    { name:'dashboard', route: 'dashboard', icon:faUser },
    { name: 'message', route: 'dashboard/messages', icon:faEnvelope },
    { name: 'projects', route: 'dashboard/projects', icon:faCode }
  ];

  return (
    routes.map(route => {
      return (
        <NavLink route={route} activeRoute={activeRoute} key={route.route} onClick={onLinkClick}/>
      );
    })
  )
}
const NavLinkList = ({ onLinkClick }) => {
  const location = useLocation().pathname;

  const [activeRoute, setActiveRoutes] = useState(location);

  useEffect(() => {
    setActiveRoutes(location)
  }, [location])
  
  
  return (
    <ul className="nav-link-list">
      <NavLinks activeRoute={activeRoute} onLinkClick={onLinkClick}/>
    </ul>
  )
}

const Sidebar = ({ closeDrawer }) => {
  
  return (
    <div className="side-bar">
      <Logo/>
      <NavLinkList onLinkClick={closeDrawer}/>
    </div> 
  ) 
}

export default Sidebar;
