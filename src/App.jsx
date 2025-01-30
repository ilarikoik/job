import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import NavBar from "./components/navbar";
import { auth } from "./firebase/firebase";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   const user = auth.currentUser;
  //   if (!user || user === null) {
  //     Navigate("/");
  //   }
  // });
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
