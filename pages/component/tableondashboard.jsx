import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { dateFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";
import { useState, useEffect } from 'react';
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function tbDashboard() {

    const [fullMoto, setFullMoto] = useState();

    useEffect(() => { 
      axios.get('http://localhost:8000/table_data_dashboard')
            .then(async (response) => {
              setFullMoto(response.data)
            }).catch(error => console.log(error))
     }, [])
            
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;
    const columns = [
        { 
            dataField: "Date", 
            text: "Date",
            headerClasses: "row",
            filter: dateFilter({
              className: 'd-flex justify-content-between text-dark col-12',
              withoutEmptyComparatorOption: true,
              comparatorClassName: '',
            })
        },
      { dataField: "Allcar", text: "Full_CAR" },
      { dataField: "actualcar", text: "Actual_CAR" },
      { dataField: "AllMoto", text: "Full_MOTO" },
      { dataField: "actualMoto", text: "Actual_MOTO" },
      
    ];

    const data = fullMoto || []
  
    return (
      <ToolkitProvider
        keyField="Date"
        data={data}
        columns={columns}
        CSVExport
      >
        {(props) => (
          <div>
            <hr />
            <ExportCSVButton className='bg-success text-white' {...props.csvProps}>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable
              {...props.baseProps}
              data={data}
              columns={columns}
              noDataIndication="There is no data"
              pagination={paginationFactory()}
              headerClasses="bg-dark text-white"
              filter={ filterFactory()}
            >
            
            </BootstrapTable>
          </div>
        )}
      </ToolkitProvider>
    );
  }