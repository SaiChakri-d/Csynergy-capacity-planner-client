import React, { useState, useEffect, useContext } from "react";
import Avatar from "./Avatar";
import Description from "./Description";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TaskTable from "./TaskTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextEditor from "../quill/TextEditor";
import Progress from "./Progress";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../config";
import UserContext from "../../UserContext.js";
import { useFormik } from "formik";

const ViewProject = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [never, setNever] = useState(false);
  const [show, setShow] = useState(false);
  const [member, setMember] = useState([]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  let context = useContext(UserContext);
  const {
    employee,
    setEmployee,
    passTaskTable,
    setPassTaskTable,
    particular,
    setParticular,
    projectId,
    setProjectId,
  } = context;
  const [teams, setTeams] = useState([]);

  // Getting the Particular project
  useEffect(() => {
    getPro(params.id);
    setProjectId(params.id);
  }, [alert]);

  let getPro = async (id) => {
    try {
      let response = await axios.get(`${env.api}/projects/pro/${id}`);
      setParticular(response.data);
      let totalMember = response.data.projectTeam;
      setMember(["Select", ...totalMember]);
      setPassTaskTable(["Select", ...totalMember]);
      setTeams(AvatarCreator(employee, response.data.projectTeam));
    } catch (err) {
      console.log(err);
    }
  };
  let AvatarCreator = (employee, team) => {
    let final = [];
    for (let i = 0; i < team.length; i++) {
      for (let j = 0; j < employee.length; j++) {
        if (team[i] === employee[j].firstName) {
          final.push(employee[j]);
        }
      }
    }
    return final;
  };
  let formik = useFormik({
    initialValues: {
      taskName: "",
      hrs: "",
      employee: "",
      description: "",
      status: "",
      projectId: "",
      project: [],
    },
    validate: (values) => {
      let errors = {};
      if (values.taskName === "") {
        errors.taskName = "Please enter a task ";
      }
      if (values.description === "") {
        errors.description = "Please enter description";
      }

      return errors;
    },
    onSubmit: async (values) => {
      values.projectId = params.id;
      values.project = particular;
      try {
        let user = await axios.post(`${env.api}/task/tasking`, values);
        if (user.status === 200) {
          alert("task Created");
          // setNever(true);
          navigate(`/portal/projectList`);
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    },
  });
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h3>About Project</h3>
      </div>
      <Description particular={particular} />
      <div className="row  mx-1">
        <div
          className="col-md-12 col-xl-3 card mt-5"
          style={{ borderTop: "solid #1976D2" }}
        >
          <b className="card-title mt-3">Team Member/s</b>
          <div className="card-body">
            {teams.map((el, i) => {
              return <Avatar key={i} pic={el.profile} name={el.firstName} />;
            })}
          </div>
        </div>
        <div
          className="col-md-12 mt-5 col-xl-9 card "
          style={{ borderTop: "solid #1976D2" }}
        >
          <div className="mt-3 d-flex justify-content-between">
            <b className="card-title ">Task List</b>
            <button
              className="d-flex justify-content-between btn btn-primary"
              onClick={handleShow}
            >
              <AddBoxIcon />
              New Task
            </button>
            <>
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
              >
                <form onSubmit={formik.handleSubmit}>
                  <Modal.Header closeButton>
                    <Modal.Title>Assign Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      value={formik.values.taskName}
                      onChange={formik.handleChange}
                      name="taskName"
                      className="form-control form-control-sm "
                      type="text"
                      placeholder="Task"
                    />
                    <span style={{ color: "red" }}>
                      {formik.errors.taskName}
                    </span>

                    <input
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      name="date"
                      type="date"
                      className="form-control form-control-sm mt-3"
                    />

                    <input
                      value={formik.values.hrs}
                      onChange={formik.handleChange}
                      name="hrs"
                      className="form-control form-control-sm mt-3"
                      type="text"
                      placeholder="Hours/day"
                    />
                    <div className="form-group mt-3">
                      <label htmlFor="exampleFormControlSelect1">
                        Team Members
                      </label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        value={formik.values.employee}
                        onChange={formik.handleChange}
                        name="employee"
                      >
                        {member.map((el, i) => {
                          return (
                            <>
                              <option key={i}>{el}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mt-3">Description</div>
                    <div>
                      <textarea
                        style={{ width: "100%" }}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name="description"
                        id="w3review"
                        rows="4"
                        cols="50"
                      ></textarea>
                      <span style={{ color: "red" }}>
                        {formik.errors.description}
                      </span>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="exampleFormControlSelect1">Status</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        name="status"
                      >
                        <option>select</option>
                        <option value="pending">pending</option>
                        <option value="success">success</option>
                      </select>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={handleClose}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>
            </>
          </div>
          <div className="card-body">
            <TaskTable id={params.id} />
          </div>
        </div>
        <Progress />
      </div>
    </div>
  );
};

export default ViewProject;
