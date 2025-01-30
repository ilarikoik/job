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
  const [user, setUser] = useState(null);

  const setAddedHandler = () => {
    setAdded((prevAdded) => !prevAdded);
  };

  const navigate = useNavigate();

  // siis onAuthState change tunnistaa jos on käytetty google autentikointia ja sen avulla voidaaan pitää "sessio" käynnissä ?
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate("/"); // Navigate to home page if no user
      }
    });
    //  Kun auth.onAuthStateChanged on ajettu ja se on saanut tarvittavat tiedot (kuten user-objektin, jos käyttäjä on kirjautunut sisään), se ei enää tarvitse kuunnella käyttäjän autentikaatiotilaa ja se voidaan tryhjentää että se ei vie muistia
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      console.log("toimii");
      const data = await getUserJobData();
      console.log(data, "TOIMIIIKo");
      setData(data);
    };
    getData();
  }, [user]);

  return (
    <div className="bg-slate-700 min-h-screen p-4">
      {<NavBar></NavBar>}
      {<AddJobToList added={added} setAddedHandler={setAddedHandler} />}
      <DataGrid data={data}></DataGrid>
    </div>
  );
}
