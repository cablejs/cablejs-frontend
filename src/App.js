import "./App.css";
import "react-bootstrap";
import AppRenderer from "./AppRenderer";
import { Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <main>
      <Switch>
        <Route path="/channels/:gid/:id">
          <AppRenderer />
        </Route>
      </Switch>
    </main>
  )
}