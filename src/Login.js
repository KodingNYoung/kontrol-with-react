import React, { useRef, useState } from "react";
// import authcontext hook for loging in
import { useAuthContext } from "./contexts/AuthContext";
import { useHistory } from "react-router-dom";

import Card from "./components/Cards/Card";
import Preloader from "./components/Preloader/Preloader";

import "./components/Modals/Modals.css";
import "./Login.css";

import { ReactComponent as LoginSVG } from "./img/login.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "./components/Logo/Logo";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const history = useHistory();

  const handleUserLogin = async (e) => {
    e.preventDefault();

    // set error to null
    setError(null);
    setLoading(true);

    login(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        setLoading(false);
        setTimeout(() => history.push("/dashboard"), 100);
      })
      .catch((err) => {
        setError(`Failed to log in because ${err.message}`);
        setLoading(false);
      });
  };

  return (
    <main className="login">
      <div className="login-topbar">
        <Logo />
        <a href="https://kodingnyoung.herokuapp.com/">
          <span>Go to main site</span>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </a>
      </div>

      <section className="login-card">
        <Card>
          <header>
            <h2>Admin login</h2>
          </header>
          <div className="card-content">
            <div className="login-svg">
              <LoginSVG />
            </div>
            <form
              onSubmit={handleUserLogin}
              autoComplete="on"
              className="form login-form"
            >
              {error && <p>{error}</p>}
              <div className="custom-field">
                <label htmlFor="email" className="icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  id="email"
                  className="value-input"
                  required
                />
                <span className="placeholder">Email</span>
                <span className="border"></span>
              </div>
              <div className="custom-field">
                <label htmlFor="password" className="icon">
                  <FontAwesomeIcon icon={faLock} />
                </label>
                <input
                  type="password"
                  id="password"
                  className="value-input"
                  ref={passwordRef}
                  required
                />
                <span className="placeholder">Password</span>
                <span className="border"></span>
              </div>
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <Preloader color="#ccc" size={10} border={2} />
                ) : (
                  "Log in"
                )}
              </button>
            </form>
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Login;
