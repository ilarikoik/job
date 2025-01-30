import { Link } from "react-router-dom";
import NavBar from "../navbar";
import { useState } from "react";
import AddJobToList from "./addJobModal";
export default function Home() {
  return (
    <div className="bg-slate-700 min-h-screen p-4">
      {<NavBar></NavBar>}
      {<AddJobToList />}
    </div>
  );
}
