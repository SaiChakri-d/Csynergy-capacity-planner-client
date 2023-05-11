import React, { useState, useRef } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useFormik } from "formik";
import { env } from "../../config";
import axios from "axios";
import UserContext from "../../UserContext";
import { useNavigate } from "react-router-dom";
const CreateUser = () => {
  let navigate = useNavigate();
  const inputRef = useRef(null);
  const [add, setAdd] = useState(
    "https://static.vecteezy.com/system/resources/previews/003/563/444/original/kids-faces-child-expression-faces-little-boys-girls-cartoon-avatars-collection-free-vector.jpg"
  );
  const SetImage = (event) => {
    event.preventDefault();
    setAdd(inputRef.current.value);
  };
  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      position: "",
      email: "",
      password: "",
      AdminKey: "",
      profile: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.firstName === "") {
        errors.firstName = "Please enter a user name ";
      }
      if (values.email === "") {
        errors.email = "Please enter email";
      }
      if (values.password.length < 9) {
        errors.password = "The password must be at least 9 characters";
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
          // setUserName(values);
          alert("User Created");
          navigate("/portal/userList");
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h3>New User</h3>
      <div className="form-row">
        <div className="row mb-3">
          <div className="form-group col-md-5 mb-3">
            <label htmlFor="inputEmail4">First Name</label>
            <input
              value={formik.values.firstName}
              onChange={formik.handleChange}
              name="firstName"
              type="text"
              className="form-control"
              id="inputEmail4"
            />
            <span style={{ color: "red" }}>{formik.errors.firstName}</span>
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="inputEmail3">Email</label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              type="email"
              className="form-control"
              id="inputEmail3"
            />
            <span style={{ color: "red" }}>{formik.errors.email}</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-md-5 mb-3">
            <label htmlFor="inputEmail2">Last Name</label>
            <input
              value={formik.values.lastName}
              onChange={formik.handleChange}
              name="lastName"
              type="text"
              className="form-control"
              id="inputEmail2"
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="inputPassword1">Password</label>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              type="password"
              className="form-control"
              id="inputPassword1"
            />
            <span style={{ color: "red" }}>{formik.errors.password}</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-md-5 mb-3">
            <label htmlFor="inputState">User Role</label>
            <select
              value={formik.values.position}
              onChange={formik.handleChange}
              name="position"
              id="inputState"
              className="form-control"
            >
              <option value="admin">Role</option>
              <option value="employee">Employee</option>
              <option value="project manager">Project Manager</option>
            </select>
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="inputPassword11">Confirm Password</label>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              type="password"
              className="form-control"
              id="inputPassword11"
            />
            <span style={{ color: "red" }}>{formik.errors.password}</span>
          </div>
        </div>
        <div className="row mb-3 d-flex align-items-center">
          <div className="form-group col-md-5">
            <label htmlFor="inputEmail0">Avatar</label>
            <input
              value={formik.values.profile}
              onChange={formik.handleChange}
              name="profile"
              type="text"
              ref={inputRef}
              className="form-control mb-2"
              id="inputEmail0"
              placeholder="Add url"
            />
          </div>
          <button onClick={SetImage} className="btn mt-2  col-md-1">
            <AddAPhotoIcon />
          </button>

          <div className=" col-md-5">
            <img
              src={add}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              alt="Avatar"
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button
        onClick={() => {
          navigate("/portal/userList");
        }}
        className="mx-3 btn btn-secondary"
      >
        Cancel
      </button>
    </form>
  );
};

export default CreateUser;
