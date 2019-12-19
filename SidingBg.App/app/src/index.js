import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "components/Routes/PrivateRoute.js";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/cms/Login.js";
import Logout from "views/cms/Logout.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage";
import CreateRoutePage from "views/examples/CreateRoutePage";
import CreatePage from "views/cms/CreatePage";
import CMSIndex from "views/cms/Index";
import Page from "views/PageViews/Page";
import CreateGallery from "views/cms/CreatePage.Gallery";


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
        <PrivateRoute path='/cms/create-route' component={CreateRoutePage} />
        <PrivateRoute path='/cms/create-page/:id' component={CreatePage} />
        <PrivateRoute path='path="/cms/create-gallery/:id"' component={CreateGallery} />
        <PrivateRoute path='/cms/index' component={CMSIndex} />
        <PrivateRoute path='/cms/logout' component={Logout}/>
        <Route
          path="/cms/login"
          render={props => <LoginPage {...props}></LoginPage>}
        ></Route>
        <Route path="/login-page" render={props => <LoginPage {...props} />} />
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
