import React, { useState, useEffect, useContext } from "react";
import Line from "../charts/Line";
import { UserData } from "../charts/Data";
import DoughnutChart from "../charts/Doughnut";
import DashboardCard from "../dashboardItems/DashboardCard";
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
  { id: "1", label: "People" },
  { id: "2", label: "Capacity" },
  { id: "3", label: "Scheduled" },
  { id: "4", label: "Billable" },
  { id: "5", label: "Non-Billable" },
  { id: "6", label: "Overtime" },
  ,
];

const Report = () => {
  let context = useContext(UserContext);
  const [capacity, setCapacity] = useState(1232);
  const [scheduledPer, setScheduledPer] = useState("");
  const [unscheduled, setUnscheduled] = useState("");
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
  }, []);

  let scheduled = (arr) => {
    return arr.reduce((acc, item) => acc + item, 0);
  };

  let getUser = async () => {
    try {
      let response = await axios.get(`${env.api}/calc/calculation`);
      let respond = response.data;
      let SchedulePerPerson = respond.map((el) => {
        return el.scheduleTaskTime;
      });
      let calculationScheduled = scheduled(SchedulePerPerson);
      setScheduledPer(calculationScheduled);
      setUnscheduled(capacity - calculationScheduled);
      setRecords(respond);
    } catch (err) {
      console.log(err);
    }
  };

  let data = [
    {
      title: "Capacity",
      hours: capacity,
      month: true,
    },
    {
      title: "Scheduled",
      hours: scheduledPer,
      month: true,
    },
    {
      title: "Unscheduled",
      hours: unscheduled,
      month: true,
    },
  ];

  return (
    <div>
      <div className="row m-auto">
        <>
          <h3>Report</h3>
          <div className="row">
            {data.map((card, i) => {
              return <DashboardCard key={card.id} card={card} />;
            })}
          </div>
          <Paper className="overflow-auto">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((list, i) => {
                  return (
                    <TableRow key={i + 1}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{list.employeeName}</TableCell>
                      <TableCell>176</TableCell>
                      <TableCell>{list.scheduleTaskTime}</TableCell>
                      <TableCell>{list.activeTaskTime}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Paper>
        </>
        {/* <div style={{ width: "100%" }}><Line /> */}
        <div className=" m-auto" style={{ width: "500px" }}>
          {<DoughnutChart records={records} />}
        </div>
      </div>
    </div>
  );
};

export default Report;
