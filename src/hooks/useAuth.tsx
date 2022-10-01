import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";

export const useAuth = () => {
  const isAuthFirestore = async (email: string, code: string) => {
    // const [isAuth, setIsAuth] = useState(false);
    // const fetchUsers = async () => {
    //   const usersQuery = query(
    //     collection(db, "users"),
    //     where("email", "==", email),
    //     where("pin", "==", code)
    //   );
    //   const usersSnapshot = await getDocs(usersQuery);
    //   if (usersSnapshot.size == 1) {
    //     setIsAuth(true);
    //     return true;
    //   } else {
    //     setIsAuth(false);
    //     return false;
    //   }
    // };
    // useEffect(() => {
    //   fetchUsers();
    // }, [email, code]);
    // return { isAuth };

    const usersQuery = query(
      collection(db, "users"),
      where("email", "==", email),
      where("pin", "==", code)
    );
    const usersSnapshot = await getDocs(usersQuery);
    if (usersSnapshot.size == 1) {
      //setIsAuth(true);
      return true;
    } else {
      //setIsAuth(false);
      return false;
    }
  };
  return { isAuthFirestore };
};
