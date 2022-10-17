import { useState, useEffect } from 'react';
import axios from "axios";
import { MDBBtn } from 'mdb-react-ui-kit';
import { useSession } from 'next-auth/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

export default function EX() {

  const [datas, setData] = useState();
  const { data: session } = useSession()

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/data_user')
      .then(async (response) => { setData(response.data) })
      .catch(error => console.log(error))
  }, [])

  const columns = [
    { name: 'No.Sticker', selector: "id" },
    { name: 'ทะเบียนรถ', selector: "car_regis" },
    { name: 'บัตร ปชช.', selector: "actualcar" },
    { name: 'รหัสพนักงาน', selector: "Employee_ID" },
    { name: 'ชื่อ-นามสกุล', selector: "Name" },
    { name: 'หน่วยงาน', selector: "Agency" },
    { name: 'ZONE', selector: "Zone" },
    { name: 'ประเภทรถ', selector: "type_vehicle" },
    { name: 'เบอร์โทร', selector: "Phone" },
    { name: 'ลงชื่อผู้รับ Sticker', selector: "recipName" },
    { name: 'วันที่', selector: "receive_sticker_Date" },
    { name: 'อยู่หอพักบริษัท', selector: "company_dormitory" }
  ];


  const data = datas || [];

  if (session) {

    return (
      <div className="">
        <MDBBtn color='info' href="/addUser">Add</MDBBtn>
        <MDBBtn className='mx-2' color='success' href="/editUser">Edit</MDBBtn>
        <br></br>
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
      </div>
    );

  } else {
    return (
      <div className="main">
        <DataTableExtensions
          columns={columns}
          data={data}
          print={false}
          export={false}
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
}
