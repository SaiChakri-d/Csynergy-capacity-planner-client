import React, { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "../../config";
import UserContext from "../../UserContext.js";
import { useFormik } from "formik";

const EditTask = () => {
  let navigate = useNavigate();
  const params = useParams();
  let context = useContext(UserContext);
  const { passTaskTable, particular } = context;

  useEffect(() => {
    editTask(params.id);
  }, []);
  let editTask = async (id) => {
    try {
      let response = await axios.get(`${env.api}/task/findTask/${id}`);
      formik.setValues({
        taskName: response.data.taskName,
        employee: response.data.employee,
        hrs: response.data.hrs,
        description: response.data.description,
        status: response.data.status,
        projectId: "",
        project: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  let formik = useFormik({
    initialValues: {
      taskName: "",
      employee: "",
      hrs: "",
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
      values.projectId = particular._id;
      values.project = particular;
      try {
        let user = await axios.put(
          `${env.api}/task/update/${params.id}`,
          values
        );
        if (user.status === 200) {
          // setUserName(values);
          alert("task updated");
          navigate(`/portal/viewProject/${particular._id}`);
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    },
  });
  return (
    <div className="container">
      <form style={{ width: "80%" }} onSubmit={formik.handleSubmit}>
        <Modal.Header className="mb-3">
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={formik.values.taskName}
            onChange={formik.handleChange}
            name="taskName"
            className="form-control form-control-sm"
            type="text"
            placeholder="Task"
          />
          <span style={{ color: "red" }}>{formik.errors.taskName}</span>
          <input
            value={formik.values.hrs}
            onChange={formik.handleChange}
            name="hrs"
            className="form-control form-control-sm mt-3"
            type="text"
            placeholder="Hours/day"
          />
          <div className="form-group mt-3">
            <label htmlFor="exampleFormControlSelect1">Team Members</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              value={formik.values.employee}
              onChange={formik.handleChange}
              name="employee"
            >
              {passTaskTable.map((el, i) => {
                return (
                  <>
                    <option key={i}>{el}</option>
                  </>
                );
              })}
            </select>
          </div>
          <p className="mt-3">Description</p>
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
            <span style={{ color: "red" }}>{formik.errors.description}</span>
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
        <Modal.Footer className="mt-4">
          <Button
            className="mx-3"
            variant="secondary"
            onClick={() => {
              navigate(`/portal/viewProject/${particular._id}`);
            }}
          >
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default EditTask;
