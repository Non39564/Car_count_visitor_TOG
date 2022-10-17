import React, { useState, useEffect } from 'react';
import axios from "axios";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

export default function tbDashboard() {

  const [fullMoto, setFullMoto] = useState();

  useEffect(() => {
    axios.get('http://localhost:8000/table_data_dashboard')
      .then(async (response) => {
        setFullMoto(response.data)
      }).catch(error => console.log(error))
  }, [])

  const columns = [
    { name: 'Date', selector: "Date" },
    { name: 'Full_CAR', selector: "Allcar" },
    { name: 'Actual_CAR', selector: "actualcar" },
    { name: 'Full_MOTO', selector: "AllMoto" },
    { name: 'Actual_MOTO', selector: "actualMoto" }
  ];

  const data = fullMoto || []

  return (
    <div className="main">
        <DataTableExtensions
          columns={columns}
          data={data}
          print={false}
          export={true}
          exportHeaders={true}
        >
          <DataTable
            // columns={columns}
            // data={data}
            noHeader
            // defaultSortField="id"
            // defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
      </div>
  );
}