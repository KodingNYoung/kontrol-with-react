import React, { useState } from "react";
// modules
import { Switch, useHistory } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
// css
import "./Panel.css";

// components
import Sidebar from "./components/navigations/Sidebar";
import Topbar from "./components/topbar/Topbar";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
// views
import Dashboard from "./views/Dashboard";
import MessageView from "./views/Messages";
import Projects from "./views/Projects";

const Panel = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const history = useHistory();
  const { logout, currentUser } = useAuthContext();

  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  const handleLogout = () => {
    setError(null);

    logout()
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setError(`couldn't logout because ${err.message}`);
      });
  };
  const closeDropdown = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  const drawer = isDrawerOpen ? (
    <div className="drawer-scrim opened" onClick={closeDrawer}>
      <div className="side-drawer">
        <Sidebar closeDrawer={closeDrawer} />
      </div>
    </div>
  ) : (
    <div className="drawer-scrim" onClick={closeDrawer}>
      <div className="side-drawer">
        <Sidebar />
      </div>
      ;
    </div>
  );

  return (
    <div className="Panel" onClick={closeDropdown}>
      {drawer}
      <div className="page-content">
        <Topbar
          onBurgerClick={openDrawer}
          onLogoutBtnClick={handleLogout}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          currentUser={currentUser}
        />
        {error && <p>{error}</p>}
        <main>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/dashboard/messages" component={MessageView} />
            <PrivateRoute path="/dashboard/projects" component={Projects} />
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Panel;
