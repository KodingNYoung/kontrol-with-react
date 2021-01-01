import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

import { AuthProvider } from "./contexts/AuthContext";

import Login from "./Login";
import Panel from "./Panel";

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/dashboard" component={Panel} />
        </Switch>
      </AuthProvider>
    </div>
  );
};

export default App;
