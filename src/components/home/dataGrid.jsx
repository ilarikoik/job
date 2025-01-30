import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ClientSideRowModelModule,
} from "ag-grid-community";
import React, { useEffect, useState } from "react";
import { colorSchemeDark } from "ag-grid-community";
import { getUserJobData } from "../../firebase/database";
import { auth } from "../../firebase/firebase";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

export default function DataGrid({ data }) {
  //   const [rowData, setRowData] = useState([{}]);

  const [colDefs, setColDefs] = useState([
    { field: "jobTitle" },
    { field: "company" },
    { field: "location" },
    { field: "dateApplied" },
    { field: "importance" },
    { field: "jobLink" },
  ]);

  return (
    <div className="flex justify-center items-center mt-7">
      {/* <button onClick={() => console.log(rowData)}>ssssssssssssss</button> */}
      <div className="ag-theme-alpine h-[800px] w-[1200px]">
        <AgGridReact rowData={data} columnDefs={colDefs}></AgGridReact>
      </div>
    </div>
  );
}
