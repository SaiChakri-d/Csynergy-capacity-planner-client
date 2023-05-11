import React, { useState, useContext } from "react";
import LogoImage from "../../Asset/logo.png";
import "../../App.css";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  let navigate = useNavigate();
  let context = useContext(UserContext);
  const { signIn, setSignIn } = useContext(UserContext);
  const [side, setSide] = useState(false);
  const SignInHandleClick = (e) => {
    e.preventDefault();
    setSignIn(false);
    navigate("login");
  };
  const SignUpHandleClick = (e) => {
    e.preventDefault();
    setSignIn(true);
    navigate("login");
  };
  return (
    <div>
      <header className="m-5">
        <div className="contain">
          <div className="logo">
            <img src={LogoImage} alt="Logo" />
            <h3>A Capacity Planning Tool for Offices</h3>
          </div>
          <div className="links">
            <ul>
              <li>
                <Link onClick={SignInHandleClick} className="btn btn-primary btn-lg">
                  Log In
                </Link>
              </li>
              <li>
                <Link onClick={SignUpHandleClick} className="btn  btn-primary btn-lg">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div
            onClick={() => {
              setSide(!side);
            }}
            className="hamburger-menu"
          >
            <div className="bar"></div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default TopBar;
