import React from "react";

// reactstrap components
import {
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";

// sections for this page
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import BasicTemplate from "views/PageViews/BasicTemplate.js";

function Index() {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <LandingPageHeader></LandingPageHeader>
        <div className="main">
       
        <BasicTemplate alias="Index"></BasicTemplate>
        
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
