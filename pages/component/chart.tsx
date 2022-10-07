import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Barchart_Visitor() {
  const [labels, setlabels] = useState();
  const [data_actual, setData_actual] = useState();
  const [data_all, setData_all] = useState();
  // console.log(setData_actual.length);
  useEffect(() => { 
    (async () => {
      await axios
        .get("http://localhost:8000/chart_data_dashboard")
        .then((response) => {
          setlabels(response.data[0]);
          setData_actual(response.data[1])
          setData_all(response.data[2])
          // console.log(response.data[2])
        });
    })();
   }, [])
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  // var result = Object.keys(labels).map((key) => [Number(key), String[key]])

  var resultLab = labels || []
  var resultAll = data_all || []
  // console.log(resultLab.length)
  if (resultLab.length !== resultAll.length ) {
    for (let i=1; i < resultLab.length; i++) {
        resultAll.push(resultAll[0])
      }
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Full",
        data: data_all,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Actual",
        data: data_actual,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}