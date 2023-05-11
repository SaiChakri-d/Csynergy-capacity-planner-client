import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  TableBody,
  TableCell,
  TablePagination,
  TextField,
  TableRow,
  Toolbar,
} from "@mui/material";
import useTable from "../reusableComponents/UseTable";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Avatar from "../project/Avatar";
import axios from "axios";
import { env } from "../../config";
import UserContext from "../../UserContext.js";

const headCells = [
  { id: "#", label: "#" },
  { id: "profile", label: "Profile" },
  { id: "mobile", label: "Position" },
  { id: "email", label: "Email Address" },
  { id: "department", label: "Action", disableSorting: true },
];

const UserList = () => {
  let context = useContext(UserContext);
  const { employee, setEmployee } = context;
  const [alarm, setAlarm] = useState(false);
  const [records, setRecords] = useState([]);
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
        else return items.filter((x) => x.firstName.includes(target.value));
      },
    });
  };

  useEffect(() => {
    getUser();
  }, [alarm]);

  let getUser = async () => {
    try {
      let response = await axios.get(`${env.api}/team/employees`);
      setRecords(response.data);
      setEmployee(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  let userDelete = async (id) => {
    try {
      let response = await axios.delete(`${env.api}/team/del/${id}`);
      if (response.status === 200) {
        setAlarm(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h3>Employees</h3>
      <Paper className="overflow-auto">
        <Toolbar className="d-flex justify-content-between ">
          <Link
            to="/portal/createUser"
            type="button"
            className="btn btn-primary text-black"
          >
            <PersonAddIcon /> Add Employee
          </Link>
          <TextField
            className=""
            sx={{ bgcolor: "#f1f8fc", width: "25%" }}
            id="filled-multiline-flexible"
            label="Search"
            multiline
            maxRows={4}
            onChange={handleChange}
            variant="filled"
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((list, i) => {
              return (
                <TableRow key={i + 1}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <Avatar pic={list.profile} name={list.firstName} />
                  </TableCell>

                  <TableCell>{list.position}</TableCell>
                  <TableCell>{list.email}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Action
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={`/portal/editUser/${list._id}`}
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
        <TblPagination />
      </Paper>
    </>
  );
};

export default UserList;
