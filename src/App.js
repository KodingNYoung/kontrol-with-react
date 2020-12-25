import React from 'react'
import { Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Login from './Login';
import Panel from './Panel';

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Panel} />
        </Switch>
      </AuthProvider>
    </div>
  )
}

export default App
