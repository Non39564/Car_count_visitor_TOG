import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { dateFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";
import { useState } from 'react';
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export default function tbVisitor() {

    const [datas, setData] = useState();

    useEffect(() => { 
        axios.get('http://127.0.0.1:8000/table_visitor')
          .then(async (response) => {setData(response.data)})
          .catch(error => console.log(error))
       }, [])

    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;
    const columns = [
        { dataField: "Date", text: "Date", 
        headerClasses:"bg-dark col-2",
        filter: dateFilter({
            className: 'd-flex justify-content-evenly text-dark  px-0',
            withoutEmptyComparatorOption: true,
          })  },
        { dataField: "OnPass", text: "On Passed",
        headerClasses:"bg-dark col-2 ",
      },
        { dataField: "Visitor", text: "Visitor",
        headerClasses:"bg-dark col-2",
      },
    ];

    const data = datas || [];

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
                    <div className="d-flex justify-content-between">
                        <ExportCSVButton className='bg-success text-white' {...props.csvProps}>Export CSV!!</ExportCSVButton>
                        <MDBBtn color='info' href="/addVisitor">Add</MDBBtn>
                    </div>
                    <hr />
                    <BootstrapTable
                        {...props.baseProps}
                        keyField="date"
                        data={data}
                        columns={columns}
                        noDataIndication="There is no solution"
                        pagination={paginationFactory()}
                        headerClasses="bg-dark text-white"
                        filter={ filterFactory()}
                    />
                </div>
      )}
    </ToolkitProvider>
    );
}