import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppRenderer from "./AppRenderer";
import Login from "./Login";

import { Route, Switch, Redirect } from "react-router-dom";

export default function App() {
  return (
    <main>
      <Switch>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/channels/:gid/:id">
          <AppRenderer />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </main>
  )
}