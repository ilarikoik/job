import { Link } from "react-router-dom";
import { handleGoogleSignOut } from "../../firebase/auth";

export default function NavBar() {
  return (
    <div className="h-fit p-3 bg-neutral-200 w-full">
      <ul className="flex justify-around ">
        <li className="text-slate-700 font-semibold text-lg hover:underline">
          <a href="https://duunitori.fi/tyopaikat" target="_blank">
            Duunitori
          </a>
        </li>
        <li className="text-slate-700 font-semibold text-lg hover:underline">
          <a
            href="https://fi.indeed.com/?from=jobsearch-empty-whatwhere"
            target="_blank"
          >
            Indeed
          </a>
        </li>
        <li className="text-slate-700 font-semibold text-lg hover:underline">
          <a href="https://tyopaikat.oikotie.fi/" target="_blank">
            Oikotie
          </a>
        </li>
        <li className="text-slate-700 font-semibold text-lg ">
          <Link to="/">
            <button
              onClick={handleGoogleSignOut}
              className="text-red-500 hover:underline"
            >
              Kirjaudu ulos
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
