import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


import './Topbar.css'
import avatar from '../../img/avatar.png'

const UserDetail = ({ onLogoutBtnClick, logoutBtnEnable, setLogoutBtnEnable }) => {
  const [logoutBtnClassname, setLogoutBtnClassname] =useState('logout-btn')
  
  useEffect(() => {
    setLogoutBtnClassname(logoutBtnEnable ? 'logout-btn visible' : 'logout-btn');
  }, [logoutBtnEnable])

  const toggleBtnEnable = () => {
    setLogoutBtnEnable(!logoutBtnEnable);
  }
  return (
    <div className="user-detail">
      <button onClick={toggleBtnEnable} className="details">
        <div className="avatar">
          <img src={avatar} alt="avatar"/>
        </div>
        <FontAwesomeIcon icon={faCaretDown}/>
        <div className="user-info">
          <p className="name">KodingNYoung</p>
          <p className="email">abiodunadebambo44@gmail.com</p>
        </div>
      </button>
      <LogoutBtn onClick={onLogoutBtnClick} className={logoutBtnClassname}/>
    </div>
  )
}
const Burger = ({ onClick }) => {
  return (
    <button className="burger" onClick={onClick}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </button>
  )
} 
const LogoutBtn = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <FontAwesomeIcon icon={faSignOutAlt}/>
      <span>logout</span>
    </button>
  )
}
const Topbar = ({ onBurgerClick, onLogoutBtnClick, logoutBtnEnable, setLogoutBtnEnable }) => {
  
  return (
    <div className="top-bar">
      <Burger onClick={onBurgerClick} />
      <UserDetail 
      onLogoutBtnClick={onLogoutBtnClick}
      logoutBtnEnable={logoutBtnEnable}
      setLogoutBtnEnable={setLogoutBtnEnable}
      />
    </div>
  )
}

export default Topbar
