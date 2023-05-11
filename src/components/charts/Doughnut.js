import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const DoughnutChart = ({ records }) => {
  const employeeName = [];
  const scheduleTaskTime = [];
  records.map((el) => {
    employeeName.push(el.employeeName);
    scheduleTaskTime.push(el.scheduleTaskTime);
  });

  const data = {
    labels: [...employeeName],
    datasets: [
      {
        label: "My First Dataset",
        data: [...scheduleTaskTime],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(90,255,102)",
          "rgb(102,255,255)",
          "#0080ff",
          "rgb(255,128,0)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="mt-5" style={{ width: "400px" }}>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
