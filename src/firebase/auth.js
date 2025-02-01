import { signOut } from "firebase/auth";
import { auth } from "./firebase";


export const handleGoogleSignOut = async () => {
  try {
    await signOut(auth); // Sign out the user
    console.log("User signed out");
    setUser(null); // Clear user data
  } catch (error) {
    setError(error.message); // Set any sign-out errors
    console.error("Error during sign-out:", error.message);
  }
};
