import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import authorise from "../Utilities/authorise";
import Footer from "./Footer";

const Layout = (props) => {
  const [loginUser, setLoginUser] = useState("");
  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authorise(setLoginUser, setIsLoggedIn);
  }, []);

  return (
    <>
      <Navbar username={isLoggedin ? loginUser : ""} />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
