import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

// React Notification
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import Home from "Home";
import Analyse from "main";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/home" render={(props) => <Home {...props} />} />
      <Route path="/analyse" render={(props) => <Analyse {...props} />} />
      <Redirect from="/" to="/home" />
    </Switch>
    {/* <NotificationContainer /> */}
    <ToastContainer position="top-right"/>
  </BrowserRouter>
);

serviceWorkerRegistration.register();
