import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

export default function tbVisitor() {

    const [datas, setData] = useState();

    useEffect(() => { 
        axios.get('http://127.0.0.1:8000/table_visitor')
          .then(async (response) => {setData(response.data)})
          .catch(error => console.log(error))
       }, [])

    const columns = [
        { name: 'Date', selector: "Date" },
        { name: 'OnPass', selector: "OnPass" },
        { name: 'Visitor', selector: "Visitor" },
      ];

    const data = datas || [];

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