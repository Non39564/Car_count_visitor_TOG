import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";
import { useState, useEffect } from 'react';
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MDBBtn } from 'mdb-react-ui-kit';

export default function EX() {

  const [datas, setData] = useState();

  useEffect(() => { 
    axios.get('http://127.0.0.1:8000/data_user')
          .then(async (response) => {setData(response.data)})
          .catch(error => console.log(error))
   }, [])

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const columns = [
    { dataField: "id", text: "No.Sticker", hidden: true,},
    { dataField: "car_regis", text: "ทะเบียนรถ" },
    { dataField: "", text: "บัตร ปชช." },
    { dataField: "Employee_ID", text: "รหัสพนักงาน" },
    { dataField: "Name", text: "ชื่อ-นามสกุล", },
    { dataField: "Agency", text: "หน่วยงาน" },
    { dataField: "Zone", text: "ZONE" },
    { dataField: "type_vehicle", text: "ประเภทรถ" },
    { dataField: "Phone", text: "เบอร์โทร" },
    { dataField: "recipName", text: "ลงชื่อผู้รับ Sticker" },
    { dataField: "receive_sticker_Date", text: "วันที่" },
    { dataField: "company_dormitory", text: "อยู่หอพักบริษัท" },
  ];


  const data = datas || [];
  console.log(data)


  return (
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={columns}
      search
      CSVExport
    >
      {(props) => (
        <div>
          <h3></h3>
          <Row className="d-flex flex-row-reverse">
            <Col md={3}>
              <SearchBar {...props.searchProps} />
            </Col>
          </Row>
          <hr />
          <div className="d-flex justify-content-between">
            <ExportCSVButton className='bg-success text-white' {...props.csvProps}>Export CSV!!</ExportCSVButton>
            <MDBBtn  color='info' href="/addUser">Add</MDBBtn>
          </div>
          <hr />
          <BootstrapTable
            {...props.baseProps}
            data={data}
            columns={columns}
            noDataIndication="There is no data"
            pagination={paginationFactory()}
            headerClasses="bg-dark text-white text-center "
          />
        </div>
      )}
    </ToolkitProvider>
  );
}
