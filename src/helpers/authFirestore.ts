import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const getAuthFirestore = async (code: string) => {
  const userInformation = { name: "" };
  const usersQuery = query(collection(db, "users"), where("code", "==", code));
  const usersSnapshot = await getDocs(usersQuery);

  if (usersSnapshot.size == 1) {
    usersSnapshot.forEach((user) => {
        userInformation.name = user.data().name;
    });
    return userInformation;
  } else {
    return userInformation;
  }
};
