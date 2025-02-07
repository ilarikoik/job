import { addUser } from "../../firebase/database";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; //
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
} from "../../firebase/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); // Käytetään useNavigate

  // Käyttäjän rekisteröinti
  //   const handleSignUp = async (e) => {
  //     e.preventDefault(); // Estetään sivun uudelleen lataus
  //     setIsSigningIn(true);
  //     setError(""); // Tyhjennetään mahdollinen virhe ennen uutta yrittämistä

  //     try {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //       console.log("User created");
  //       setUser(user);
  //     } catch (error) {
  //       setError(error.message); // Asetetaan virhetilanne
  //       console.error(error.message);
  //     } finally {
  //       setIsSigningIn(false);
  //     }
  //   };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsSigningIn(true);
      // Käynnistetään Google-tunnistautumisen popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user);
      setUser(user);
    } catch (error) {
      setError(error.message);
      console.error("Error during Google sign-in:", error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home"); // Ohjaa käyttäjä home-sivulle
      console.log(user);
      addUser(user);
    }
  }, [user, navigate]); // Kun user muuttuu, navigoi
  return (
    <>
      <div>
        {/* <Link to="/home">
          <button>ETUSIVULLE</button>
        </Link> */}
      </div>
      <div className="bg-neutral-300 min-h-screen flex justify-center items-center">
        <div className="bg-neutral-100 p-8 rounded-md w-96 h-96 flex justify-center items-center flex-col shadow-2xl shadow-neutral-500">
          <h1 className="text-4xl text-slate-700 font-bold mb-4">
            Kirjaudu sisään
          </h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {/* Virheilmoitus */}
          {/* <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Sähköposti
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Sähköposti"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Salasana
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Salasana"
                required
              />
            </div>

            <div className="flex flex-col">
              <button
                className={`w-full bg-blue-500 text-white p-2 rounded-md m-2 ${
                  isSigningIn ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Kirjaudu
              </button>
              <button
                type="submit"
                disabled={isSigningIn}
                className={`w-full bg-blue-500 text-white p-2 rounded-md m-2 ${
                  isSigningIn ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSigningIn ? "Rekisteröidään..." : "Rekisteröidy"}
              </button>
            </div>
          </form> */}
          <button
            onClick={handleGoogleSignIn}
            type="submit"
            disabled={isSigningIn}
            className={`w-full bg-white text-blue-500 border-2 border-blue-500 p-2 rounded-md m-2 flex flex-row justify-center${
              isSigningIn ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwexF4dGPnxZJZWRegir6y-_UDmyUn4oQ7iA&s"
              alt=""
              style={{ width: 30, height: 25 }}
            />
            <p>Tunnistaudu Googlella</p>
          </button>
        </div>
      </div>
    </>
  );
}
