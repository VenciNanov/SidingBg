import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage";
import CreateRoutePage from "views/examples/CreateRoutePage";
import CreatePage from "views/cms/CreatePage";
import CMSIndex from "views/cms/Index";
import Page from "views/PageViews/Page";

const api = "https://localhost:44353/api/"


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/index" render={props => <Index {...props} />} />
        <Route path="/page/:alias" render={props => <Page {...props} />} />

        <Route
          path="/nucleo-icons"
          render={props => <NucleoIcons {...props} />}
        />
        <Route
          path="/landing-page"
          render={props => <LandingPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={props => <ProfilePage {...props} />}
        />
         <Route
          path="/register-page"
          render={props => <RegisterPage {...props} />}
        />
        <Route
          path="/cms/create-route"
          render={props => <CreateRoutePage {...props} />}
        />
        <Route
          path="/cms/create-page/:id"
          render={props => <CreatePage {...props} />}
        />
        <Route
          path="/cms/index"
          render={props => <CMSIndex {...props} />}
        />
        <Route path="/login-page" render={props => <LoginPage {...props} />} />
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
