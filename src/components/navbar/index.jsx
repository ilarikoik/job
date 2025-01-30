import { Link } from "react-router-dom";
import { handleGoogleSignOut } from "../../firebase/auth";

export default function NavBar() {
  return (
    <div className="h-fit p-3 bg-neutral-200 w-full">
      <ul className="flex justify-around">
        <li className="text-slate-700 font-semibold text-lg">abc</li>
        <li className="text-slate-700 font-semibold text-lg">def</li>
        <li className="text-slate-700 font-semibold text-lg">ghj</li>
        <li className="text-slate-700 font-semibold text-lg">
          <Link to="/">
            <button onClick={handleGoogleSignOut} className="text-red-500">
              Kirajudu UIlod
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
