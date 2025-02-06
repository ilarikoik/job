import NavBar from "../navbar";
import AddJobToList from "./addJobModal";
import { getUserJobData } from "../../firebase/database";
import DataGrid from "./dataGrid";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; //
import { useLocation } from "react-router-dom";
import { addUsersApply,getUserApply, deleteUserApply} from "../../firebase/database";

export default function Home() {
  const [data, setData] = useState([{}]);
  const [added, setAdded] = useState(false);
  const [user, setUser] = useState(null);
  const [apply, setApply] = useState();
  const [applyList, setApplyList] = useState([]);
  const [showApply, setShowApply] = useState(false);
  
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
      const data = await getUserJobData();
      const applyData = await getUserApply()
      setData(data);
      setApplyList(applyData)
    };
    getData();
  }, [user]);

  const addApply = async (link) => {
    const linkki = { link };
    await addUsersApply(linkki); 
    console.log("OK ", link);
    
  };

  // Lomakkeen submit käsittely
  const handleSubmit = (e) => {
    e.preventDefault(); // Estää lomakkeen uudelleenlataamisen
    if (apply.trim()) { 
      addApply(apply);
      setApply(""); 
    }
  };
  return (
    <div className="bg-slate-700 min-h-screen p-4">
      {<NavBar></NavBar>}

      
      <div className="h-fit w-full flex flex-col text-white">
        <p>Hae myöhemmin, tallenna linkki </p>
        <form onSubmit={handleSubmit}>
        <input 
        className="bg-neutal-300 w-96 h-10 border-none text-black"
        type="text"
        placeholder="Työilmoituksen linkki"
        onChange={(e) => setApply(e.target.value)}

        ></input>
        {/* <button type="submit" onClick={() => setApplyList([apply, ...applyList])}>Lisää</button> */}
        <button type="submit">Lisää</button>
        </form>
    <button onClick={() => setShowApply(prevApply => !prevApply)} > Näytä lista </button>
        {showApply && applyList.map((item,index) => (
          <div key={index}>{item.link} <button onClick={() => deleteUserApply(item.id)} className="text-red-500">Poista</button> </div>
        ))}
      </div>
      {<AddJobToList added={added} setAddedHandler={setAddedHandler} />}
      <div className="w-full h-fit flex justify-center items-center mt-5">
        <p className="font-semibold text-2xl text-white">{"Hakemuksia: " + data.length}</p>
      </div>
      <DataGrid data={data}></DataGrid>
    </div>
  );
}
