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
import AddJobToList from "./addJobModal";
import EditJobToList from "./editJobModal";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

export default function DataGrid({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const showModal = (job) => {
    setSelectedJob(job);
    console.log(JSON.stringify(job) + "jjjjjj")
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const [colDefs, setColDefs] = useState([
    { field: "jobTitle" },
    { field: "company" },
    { field: "location" },
    { field: "dateApplied" },
    { field: "importance" },
    { field: "jobLink" },
    {
      field: "Edit",
      cellRenderer: (params) => (
        <button
          className="bg-blue-400 text-white h-8 w-full p-1 rounded flex justify-center items-center"
          onClick={() => showModal(params.data)}
        >
          Edit
        </button>
      ),
    },
  ]);

 

  return (
    <div className="flex justify-center items-center mt-7">
      {/* <button onClick={() => console.log(rowData)}>ssssssssssssss</button> */}
      {isModalOpen && <EditJobToList job={selectedJob} setModalClose={closeModal}></EditJobToList>}
      <div className="ag-theme-alpine h-[800px] w-full">
        <AgGridReact rowData={data} columnDefs={colDefs}></AgGridReact>
      </div>
    </div>
  );
}
