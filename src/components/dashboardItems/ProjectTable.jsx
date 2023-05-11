import React, { useState, useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import axios from "axios";
import { env } from "../../config";

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Sample project", 40, "started"),
  createData("Sample project 102", 25, "onprogress"),
];

const data = ["#", "Project", "Progress", "Status", "Action"];

const ProjectTable = () => {
  let context = useContext(UserContext);
  const [project, setProject] = useState([]);

  // Getting all projects
  useEffect(() => {
    getProject();
  }, []);

  let getProject = async () => {
    try {
      let response = await axios.get(`${env.api}/projects/projectList`);
      setProject(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {data.map((el, i) => (
              <TableCell
                key={i}
                sx={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  fontFamily: "poppins",
                }}
                align="left"
              >
                {el}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {project.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                fontSize: "1rem",
                fontFamily: "poppins",
              }}
            >
              <TableCell align="left">{i + 1}</TableCell>
              <TableCell align="left" component="th" scope="row">
                <b>{row.projectName}</b>
              </TableCell>
              <TableCell align="left">
                <ProgressBar now="40" label={`${40}%`} />
              </TableCell>
              <TableCell align="left">
                <span className={`badge  bg-${row.color} `}>{row.state}</span>
              </TableCell>
              <TableCell align="left">
                <Link
                  to={`/portal/viewProject/${row._id}`}
                  className="btn btn-primary"
                  type="button"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
