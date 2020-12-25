import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuthContext();

  const render = props => {
    return currentUser ? <Component {...props} /> : <Redirect to="/" />
  }

  return (
    <Route {...rest} render={render} />
  )
}
export default PrivateRoute
