import React, { useState, useEffect, useContext } from "react";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { env } from "../../config";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../UserContext";

const EditProject = () => {
  const params = useParams();
  let context = useContext(UserContext);
  const { project, setProject } = useContext(UserContext);
  let navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [manager, setManager] = useState([]);
  const [member, setMember] = useState([]);

  useEffect(() => {
    getUser();
    editProject(params.id);
  }, []);

  let getUser = async () => {
    try {
      let response = await axios.get(`${env.api}/team/employees`);
      let emp = response.data;
      let project = ["Select"];
      let Employee = [];
      emp.forEach((el) => {
        if (el.position === "employee") {
          Employee.push(el.firstName);
        }
        if (el.position === "project manager") {
          project.push(el.firstName);
        }
      });
      setEmployee(Employee);
      setManager(project);
    } catch (err) {
      console.log(err);
    }
  };

  let editProject = async (id) => {
    try {
      let response = await axios.get(`${env.api}/projects/pro/${id}`);
      formik.setValues({
        projectName: response.data.projectName,
        state: response.data.state,
        startDate: response.data.startDate,
        endDate: response.data.endDate,
        projectManager: response.data.projectManager,
        projectTeam: response.data.projectTeam,
        description: response.data.description,
      });
    } catch (err) {
      console.log(err);
    }
  };

  let formik = useFormik({
    initialValues: {
      projectName: "",
      state: "",
      startDate: "",
      endDate: "",
      projectManager: "",
      projectTeam: [],
      description: "",
    },
    // validate: (values) => {
    //   let errors = {};
    //   if (values.projectName === "") {
    //     errors.projectName = "Please enter a user name ";
    //   }
    //   if (values.state === "") {
    //     errors.state = "Please enter state";
    //   }
    //   return errors;
    // },
    onSubmit: async (values) => {
      values.projectTeam = member;
      try {
        let user = await axios.put(
          `${env.api}/projects/pros/${params.id}`,
          values
        );
        if (user.status === 200) {
          alert("Project Updated");
          navigate("/portal/projectList");
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    },
  });
  return (
    <>
      <h3> Edit Project</h3>
      <div className="card p-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="inputState">
                <b>Project Name</b>
              </label>
              <input
                value={formik.values.projectName}
                onChange={formik.handleChange}
                name="projectName"
                type="text"
                id="inputState"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputState">
                <b>State</b>
              </label>
              <select
                value={formik.values.state}
                onChange={formik.handleChange}
                name="state"
                id="inputState"
                className="form-control"
              >
                <option value="start" selected>
                  start
                </option>
                <option value="pending">pending</option>
                <option value="hold">hold</option>
                <option value="success">success</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="inputState">
                <b>Start Date</b>
              </label>
              <input
                value={formik.values.startDate}
                onChange={formik.handleChange}
                name="startDate"
                type="date"
                className="form-control"
                placeholder="Start Date"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputState">
                <b>End Date</b>
              </label>
              <input
                value={formik.values.endDate}
                onChange={formik.handleChange}
                name="endDate"
                type="date"
                className="form-control"
                label="End Date"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputState">
                <b>Project Manager</b>
              </label>
              <select
                value={formik.values.projectManager}
                onChange={formik.handleChange}
                name="projectManager"
                id="inputState"
                placeholder="Project Manager"
                className="form-control"
              >
                {manager.map((el, i) => {
                  return (
                    <option key={i} value={`${el}`}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputState">
                <b>Project Team Member</b>
              </label>
              <Multiselect
                options={employee}
                onSelect={(e) => {
                  setMember(e);
                }}
                // onRemove={(e) => {
                //   console.log(e);
                // }}
                isObject={false}
              />
            </div>
            <div className="col-md-12 mt-3 mb-5">
              <label htmlFor="inputState">
                <b>Description</b>
              </label>
              <div>
                <textarea
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  name="description"
                  id="w3review"
                  rows="4"
                  cols="50"
                ></textarea>
              </div>
              {/* <TextEditor height={20} /> */}
            </div>
          </div>
          <div className="mt-3">
            <button
              onClick={() => {
                navigate("/portal/projectList");
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary mx-3">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProject;
