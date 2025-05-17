import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
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

export const addUsersApply = async (linkki) => {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await addDoc(collection(db, "users", user.uid, "apply"), linkki);
    console.log("TYÖPAIKKA LINKKI TALLENNETTU ");
  } catch (e) {
    console.error("Error adding aplly linkki: ", e);
  }
};

export const getUserApply = async () => {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "apply")
    );
    const applyData = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Adding document ID for reference (optional)
      ...doc.data(), // Spread the document data into the object
    }));

    return applyData;
  } catch (error) {
    console.log("error fething data..", error);
  }
};

export const deleteUserApply = async (linkId) => {
  console.log(linkId + "häääää");
  const user = auth.currentUser;
  if (!user) return;
  try {
    const docRef = doc(db, "users", user.uid, "apply", linkId);
    await deleteDoc(docRef);
    console.log("Poistettu");
  } catch (error) {
    console.log("error deleting link..", error);
  }
};

export const updateJobApplication = async (jobId, updatedData) => {
  // console.log(updatedData)
  try {
    const user = auth.currentUser.uid;

    if (!user) {
      console.error("Käyttäjä ei ole kirjautunut sisään!");
      return;
    }
    const jobRef = doc(db, "users", user, "jobs", jobId); // pitää olla oikea polku jotta pääsee muokkaamaan ( polku määritetty firebasessa )
    await updateDoc(jobRef, updatedData); // oikea paikka mikä update ja sitten se itse tieto
    console.log("Työhakemus päivitetty Firebaseen!");
  } catch (error) {
    console.error("Päivitys epäonnistui:", error);
  }
};
