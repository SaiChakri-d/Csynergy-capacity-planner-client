import React from "react";
import TopBar from "../components/landingPage/TopBar";
import Goal from "../Asset/29.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="big-wrapper">
      <TopBar />
      <div className="showcase-area">
        <div className="contain">
          <div className="left">
            <div className="big-title">
              <h1>Integrate your people and projects into a single dynamic timeline</h1>
            </div>
            <p className="text">
            Learn everything you need to plan projects and assign tasks based on team capabilities. 
            </p>
            <p className="text">
              <p>
                <b>Credentials</b>
              </p>
              <b>username: </b>dscharki9@gmail.com
              <br />
              <b>password: </b>dsc117cool <br />
              <b>adminkey: </b>117
            </p>
            <div className="cta">
              <Link to="login" className="btn btn-info btn-lg">
                Sign Up, It's Free
              </Link>
            </div>
          </div>
          <div className="right ">
            <img src={Goal} alt="per" className="person" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
