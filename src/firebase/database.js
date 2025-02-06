import { collection, addDoc, setDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const addUser = async (user) => {
  if (!user) return;
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
      },
      { merge: true }
    );
    console.log("Document written with ID: ", user.uid);
  } catch (e) {
    console.error("Error adding userRRRRRRRRR: ", e);
  }
};

export const addUsersJobApplication = async (hakemus) => {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await addDoc(collection(db, "users", user.uid, "jobs"), hakemus);
    console.log("TYÖPAIKKAHAKEMUS TALLENNETTU ");
  } catch (e) {
    console.error("Error adding JJOBBBBB: ", e);
  }
};

export const getUserJobData = async () => {
  const user = auth.currentUser;
  if (!user) return;
  try {

    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "jobs")
    );
    const jobData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Adding document ID for reference (optional)
      ...doc.data(), // Spread the document data into the object
    }));

    return jobData;
  } catch (error) {
    console.log("error fething data..", error);
  }
};


export const updateJobApplication = async (jobId, updatedData) => {
  
  console.log(updatedData)
  try { 
    const user = auth.currentUser.uid;
  
    if (!user) {
      console.error("Käyttäjä ei ole kirjautunut sisään!");
      return;
    }


    const jobRef = doc(db, "users", user, "jobs", jobId);
    await updateDoc(jobRef, updatedData);
    console.log("Työhakemus päivitetty Firebaseen!");
  } catch (error) {
    console.error("Päivitys epäonnistui:", error);
  }
};