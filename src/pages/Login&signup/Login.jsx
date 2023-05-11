import React, { useState, useContext } from "react";
import "./Login.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import meet from "../../Asset/meet.svg";
import work from "../../Asset/work.svg";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { env } from "../../config";
import axios from "axios";
import UserContext from "../../UserContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Login = () => {
  let navigate = useNavigate();
  let context = useContext(UserContext);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [SignAdmin, setSignAdmin] = useState(false);
  const { admin, setAdmin, setUserName, signIn, setSignIn } =
    useContext(UserContext);

  const SignInHandleClick = (e) => {
    e.preventDefault();
    setSignIn(true);
  };
  const SignUpHandleClick = (e) => {
    e.preventDefault();
    setSignIn(false);
  };

  // SignUp formik
  let formik = useFormik({
    initialValues: {
      Name: "",
      email: "",
      password: "",
      AdminKey: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.Name === "") {
        errors.Name = "Please enter a user name ";
      }
      if (values.email === "") {
        errors.email = "Please enter email";
      }
      if (values.password.length < 9) {
        errors.password =
          "The password should be Greater than 9 alphanumeric letter";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        let user = await axios.post(`${env.api}/users/register`, values, {
          headers: {
            Authorization: window.localStorage.getItem("app-token"),
          },
        });
        if (user.status === 200) {
          setUserName(values);
          alert("User Created");
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    },
  });

  // login formik
  let SignFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      AdminKey: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.email === "") {
        errors.email = "Please enter email";
      }
      if (values.password.length < 9) {
        errors.password = "The password that you've entered is incorrect";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        let loginData = await axios.post(`${env.api}/users/login`, values);
        if (loginData.status === 200) {
          window.localStorage.setItem(
            "app-token",
            loginData.data.userValues.token
          );

          if (values.AdminKey) {
            window.localStorage.setItem("Admin", values.AdminKey);
            setAdmin(true);
          }

          // window.localStorage.setItem("user", loginData.data.userValues.name);
          // setUser(values);
          navigate("/portal");
        } else {
          navigate("/notfound");
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    },
  });
  return (
    <>
      <div className={`cont ${signIn ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={SignFormik.handleSubmit} className="sign-in-form">
              <h2 className="title">Sign In</h2>
              <div className="input-field">
                <PersonIcon className="i" />
                <input
                  value={SignFormik.values.email}
                  onChange={SignFormik.handleChange}
                  name="email"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div style={{ color: "red" }}>{SignFormik.errors.email}</div>
              <div className="input-field">
                <LockIcon className="i" />
                <input
                  value={SignFormik.values.password}
                  onChange={SignFormik.handleChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div style={{ color: "red" }}>{SignFormik.errors.password}</div>
              {SignAdmin && (
                <div className="input-field">
                  <AdminPanelSettingsIcon className="i" />
                  <input
                    type="password"
                    placeholder="Admin key"
                    name="AdminKey"
                    value={SignFormik.values.AdminKey}
                    onChange={SignFormik.handleChange}
                  />
                </div>
              )}
              <span>
                <Checkbox onClick={() => setSignAdmin(!SignAdmin)} /> Are you an Admin?
              </span>
              <br />
              <input type="submit" value="Login" className="btn-solid" />
            </form>
            {/* SignUp Form */}
            <form onSubmit={formik.handleSubmit} className="sign-up-form">
              <h2 className="title">Sign Up</h2>
              <div className="input-field">
                <PersonIcon className="i" />
                <input
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  name="Name"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div style={{ color: "red" }}>{formik.errors.Name}</div>
              <div className="input-field">
                <EmailIcon className="i" />
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div style={{ color: "red" }}>{formik.errors.email}</div>
              <div className="input-field">
                <LockIcon className="i" />
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div style={{ color: "red" }}>{formik.errors.password}</div>
              {checkAdmin && (
                <div className="input-field">
                  <AdminPanelSettingsIcon className="i" />
                  <input
                    type="password"
                    placeholder="Admin key"
                    name="AdminKey"
                    value={formik.values.AdminKey}
                    onChange={formik.handleChange}
                  />
                </div>
              )}
              <span>
                <Checkbox onClick={() => setCheckAdmin(!checkAdmin)} /> Are you an Admin?
              </span>
              <br />
              <input type="submit" value="Sign Up" className={`btn-solid }`} />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Welcome</h3>
              <p>Planning ahead can save you up to ten hours of work.</p>
              <button
                className="btn-solid transparent"
                id="sign-up-btn"
                onClick={SignInHandleClick}
              >
                Sign Up
              </button>
            </div>
            <img src={meet} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Welcome</h3>
              <p>
              Productivity never happens by chance. It is always the outcome of a dedication to excellence, wise preparation, and determined effort.
              </p>
              <button
                className="btn-solid transparent"
                onClick={SignUpHandleClick}
                id="sign-in-btn"
              >
                Sign In
              </button>
            </div>
            <img src={work} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
