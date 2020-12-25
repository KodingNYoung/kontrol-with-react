import React, { useRef, useState } from 'react';
import './Login.css';

// import authcontext hook for loging in
import { useAuthContext } from './contexts/AuthContext';

import { useHistory } from 'react-router-dom';

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
      setTimeout(() => history.push('/dashboard'), 100);
    })
    .catch((err) => {
      setError(`Failed to log in because ${err.message}`);
      setLoading(false);
    })
  }

  return (
    <div className="login">
      {error && <p>{error}</p>}
      <form onSubmit={handleUserLogin} autoComplete='on'>
        <input type="email" placeholder="Email" ref={emailRef} required/>
        <input type="password" placeholder="Password" ref={passwordRef} required/>
        <button type="submit" disabled={loading}>Log in</button>
      </form>
    </div>
  );
}

export default Login;
