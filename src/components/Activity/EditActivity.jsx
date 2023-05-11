import React, { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../config";
import UserContext from "../../UserContext.js";
import { useFormik } from "formik";

const EditActivity = () => {
  let navigate = useNavigate();
  const params = useParams();
  let context = useContext(UserContext);
  const { projectId, setProjectId } = context;
  useEffect(() => {
    editTask(params.id);
  }, []);

  let editTask = async (id) => {
    try {
      let response = await axios.get(`${env.api}/task/findActivity/${id}`);
      formik.setValues({
        projectId: "Type",
        status: response.data.status,
        task: response.data.task,
        date: response.data.date,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        description: response.data.description,
      });
    } catch (err) {
      console.log(err);
    }
  };

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
      values.projectId = projectId;
      try {
        let user = await axios.put(
          `${env.api}/task/activityUpdate/${params.id}`,
          values
        );
        if (user.status === 200) {
          alert("Activity Updated");
          navigate(`/portal/viewProject/${projectId}`);
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    },
  });
  return (
    <div>
      <form className="mx-4" onSubmit={formik.handleSubmit}>
        <Modal.Header>
          <Modal.Title>Edit Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 ">
              <div className="col mb-3 mt-3 ">
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
              <div className="col mb-3">
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
                  {/* {project.map((el, i) => {
                return (
                  <>
                    <option value="select">select</option>
                    <option key={i} value={el.taskName}>
                      {el.taskName}
                    </option>
                  </>
                );
              })} */}
                </select>
              </div>
              <div className="col mb-3">
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
              <div className="col mb-3">
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
              <div className="col">
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
          </div>
        </Modal.Body>
        <div className="mt-3">
          <Button
            as={Link}
            to={`/portal/viewProject/${projectId}`}
            variant="secondary"
          >
            Close
          </Button>
          <Button className="mx-3" type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditActivity;
