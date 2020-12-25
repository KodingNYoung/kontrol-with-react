import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavLink = ({ route, activeRoute, onClick}) => {
  const activeView = activeRoute.split('/')[2] || activeRoute.split('/')[1];
  const visitedView = route.route.split('/')[1] || route.route.split('/')[0];
  
  return (
    visitedView === activeView
    ?  <li className="nav-link-item active" key={route.route} onClick={onClick}>
        <Link to={`/${route.route}`}>
          <FontAwesomeIcon icon={route.icon} />
          <span> {route.name} </span>
        </Link>
      </li>
    : <li className="nav-link-item" key={route.route} onClick={onClick}>
        <Link to={`/${route.route}`}>
          <FontAwesomeIcon icon={route.icon} />
          <span> {route.name} </span>
        </Link>
      </li> 
    )
}

export default NavLink