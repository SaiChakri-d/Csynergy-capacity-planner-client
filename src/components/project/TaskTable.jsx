import {
  Paper,
  TableBody,
  TableCell,
  TablePagination,
  TextField,
  TableRow,
  Toolbar,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import useTable from "../reusableComponents/UseTable";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { env } from "../../config";
import UserContext from "../../UserContext";
const headCells = [
  { id: "serial", label: "#" },
  { id: "people", label: "Team" },
  { id: "script", label: "Description" },
  { id: "hrs", label: "Hours" },
  { id: "status", label: "Status" },
  { id: "Action", label: "Action", disableSorting: true },
];

const TaskTable = ({ id }) => {
  const [records, setRecords] = useState([]);
  const [alarm, setAlarm] = useState(false);
  let context = useContext(UserContext);
  const { project, setProject } = useContext(UserContext);
  const [value, setValue] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, value);

  const handleChange = (event) => {
    let target = event.target;
    setValue({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.fullName.includes(target.value));
      },
    });
  };
  useEffect(() => {
    getProject();
  }, [alarm]);

  let getProject = async () => {
    try {
      let response = await axios.get(`${env.api}/task/taskLists/${id}`);
      setRecords(response.data);
      setProject(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  let userDelete = async (id) => {
    try {
      let response = await axios.delete(`${env.api}/task/del/${id}`);
      if (response.status === 200) {
        setAlarm(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Paper className="overflow-auto">
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((list, i) => {
            return (
              <TableRow key={i + 1}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{list.employee}</TableCell>
                <TableCell>{list.description}</TableCell>
                <TableCell>{list.hrs}</TableCell>
                <TableCell>
                  <span className={`badge bg-${list.color}`}>
                    {list.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to={`/portal/editTask/${list._id}`}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          userDelete(list._id);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TblContainer>
    </Paper>
  );
};

export default TaskTable;
