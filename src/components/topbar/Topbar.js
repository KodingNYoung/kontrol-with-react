import React, { useState, useEffect } from "react";
import useFireStoreToGetDatum from "../../firebase/hooks/useFirestoreToGetDatum";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import "./Topbar.css";

const UserDetail = ({
  onLogoutBtnClick,
  dropdownOpen,
  setDropdownOpen,
  currentUser,
}) => {
  const { doc } = useFireStoreToGetDatum("dashboard", "anybody@anywhere.com");
  const [userData, setUserData] = useState({});

  const [dropdownClassname, setDropdownClassname] = useState("logout-btn");

  useEffect(() => {
    if (doc.contact !== undefined) {
      setUserData(doc);
    }
    setDropdownClassname(dropdownOpen ? "visible" : "");
  }, [dropdownOpen, doc]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="user-detail">
      {userData.contact ? (
        <button onClick={toggleDropdown} className="details">
          <div className="user-info">
            <p className="name">{userData.name}</p>
            <p className="email">{currentUser.email}</p>
          </div>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
      ) : null}
      <DropdownMenu
        onLogout={onLogoutBtnClick}
        className={dropdownClassname}
        currentUser={currentUser}
      />
    </div>
  );
};
const Burger = ({ onClick }) => {
  return (
    <button className="burger" onClick={onClick}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </button>
  );
};

const DropdownMenu = ({ className, onLogout }) => {
  return (
    <div className={`dropdown-menu ${className}`}>
      <div className="dropdown-item">
        <button onClick={onLogout} className="logout-btn dropdown-btn">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const Topbar = ({
  onBurgerClick,
  onLogoutBtnClick,
  dropdownOpen,
  setDropdownOpen,
  currentUser,
}) => {
  return (
    <div className="top-bar">
      <Burger onClick={onBurgerClick} />
      <UserDetail
        onLogoutBtnClick={onLogoutBtnClick}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Topbar;
