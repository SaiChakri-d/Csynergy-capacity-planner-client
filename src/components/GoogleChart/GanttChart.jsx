import React from "react";
import { Chart } from "react-google-charts";

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

const rows = [
  [
    "The Web",
    "The Web",
    "spring",
    new Date(2022, 2, 22),
    new Date(2022, 5, 20),
    null,
    50,
    null,
  ],
  [
    "Front End for a pizza App",
    "Front End for a pizza App",
    "summer",
    new Date(2022, 10, 26),
    new Date(2022, 11, 3),
    null,
    9,
    null,
  ],
];

const data = [columns, ...rows];

const options = {
  height: 400,
  gantt: {
    trackHeight: 30,
  },
};

const GanttChart = () => {
  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="50%"
      data={data}
      options={options}
    />
  );
};

export default GanttChart;
