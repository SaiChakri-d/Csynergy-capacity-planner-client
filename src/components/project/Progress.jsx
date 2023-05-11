import React, { useState, useEffect, useContext } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Modal from "react-bootstrap/Modal";
import TextEditor from "../quill/TextEditor";
import Button from "react-bootstrap/Button";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Activity from "../Activity/Activity";
import { useFormik } from "formik";
import axios from "axios";
import { env } from "../../config";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";

const Progress = ({}) => {
  const params = useParams();
  let navigate = useNavigate();
  let context = useContext(UserContext);
  const {
    project,
    setProject,
    employee,
    setEmployee,
    projectId,
    stack,
    setStack,
  } = useContext(UserContext);
  const [active, setActive] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let formik = useFormik({
    initialValues: {
      projectId: "",
      status: "",
      task: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
    },
    onSubmit: async (values) => {
      values.projectId = project[0].projectId;
      try {
        let user = await axios.post(`${env.api}/task/activity`, values);
        if (user.status === 200) {
          alert("Activity Created");
          navigate(`/portal/projectList`);
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    },
  });
  useEffect(() => {
    getActivity(params.id);
  }, []);

  let getActivity = async (id) => {
    try {
      let response = await axios.get(`${env.api}/task/activities/${id}`);
      setStack(response.data);
      setActive(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card mt-5">
      <p></p>
      <div className="d-flex justify-content-between">
        <b className="card-title ">Members progress/Activity</b>
        <button
          className="d-flex justify-content-between btn btn-primary"
          onClick={handleShow}
        >
          <AddBoxIcon />
          Documenting Activity
        </button>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                <CreateNewFolderIcon />
                New Progress
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-6">
                  <div className="col mb-3">
                    <div className="form-group ">
                      <label htmlFor="exampleFormControlSelect1">
                        <b>Status</b>
                      </label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        name="status"
                      >
                        <option value="select">select</option>
                        <option value="pending">pending</option>
                        <option value="success">success</option>
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="exampleFormControlSelect1">
                      <b>Task</b>
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      value={formik.values.task}
                      onChange={formik.handleChange}
                      name="task"
                    >
                      <option value="select">select</option>
                      {project.map((el, i) => {
                        return (
                          <>
                            <option key={i} value={el.taskName}>
                              {el.taskName}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="exampleFormControlSelect1">
                      <b>Date</b>
                    </label>
                    <input
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      name="date"
                      type="date"
                      className="form-control"
                    />
                  </div>
                  <div className="col mt-3">
                    <label htmlFor="exampleFormControlSelect1">
                      <b>Start Time</b>
                    </label>
                    <input
                      value={formik.values.startTime}
                      onChange={formik.handleChange}
                      name="startTime"
                      type="time"
                      className="form-control"
                    />
                  </div>
                  <div className="col mt-3">
                    <label htmlFor="exampleFormControlSelect1">
                      <b>End Time</b>
                    </label>
                    <input
                      value={formik.values.endTime}
                      onChange={formik.handleChange}
                      name="endTime"
                      type="time"
                      className="form-control"
                    />
                  </div>
                  <div className="col mt-3">
                    <label htmlFor="exampleFormControlSelect1">
                      <b>Hours/day</b>
                    </label>
                    <input
                      value={formik.values.hrs}
                      onChange={formik.handleChange}
                      name="hrs"
                      className="form-control form-control-sm "
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <b>Description</b>
                  <div>
                    <textarea
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      name="description"
                      id="w3review"
                      rows="4"
                      cols="40"
                    ></textarea>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      {active.map((el, i) => {
        return <Activity key={i} active={el} />;
      })}
    </div>
  );
};

export default Progress;
