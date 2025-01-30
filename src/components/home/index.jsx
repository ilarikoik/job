import NavBar from "../navbar";
import AddJobToList from "./addJobModal";
import { getUserJobData } from "../../firebase/database";
import DataGrid from "./dataGrid";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; //
import { useLocation } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([{}]);
  const [added, setAdded] = useState(false);

  const setAddedHandler = () => {
    setAdded((prevAdded) => !prevAdded);
  };

  const navigate = useNavigate(); // Käytetään useNavigate

  useEffect(() => {
    const getData = async () => {
      console.log("toimii", auth.currentUser.uid);
      const user = auth.currentUser;
      if (user) {
        const data = await getUserJobData();
        console.log(data, "TOIMIIIKo");
        setData(data);
      }
    };
    getData();
  }, [added]);

  return (
    <div className="bg-slate-700 min-h-screen p-4">
      {<NavBar></NavBar>}
      {<AddJobToList added={added} setAddedHandler={setAddedHandler} />}
      <DataGrid data={data}></DataGrid>
    </div>
  );
}
