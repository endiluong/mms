import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { RecoilRoot } from "recoil";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import GuardedRoute from "boostrap/GuardedRoute";

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <Switch>
        <GuardedRoute path="/admin" component={AdminLayout} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth/index" />
      </Switch>
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById("root")
);
