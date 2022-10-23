import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { login } from "../redux/actions/auth";
import { useAppDispatch } from "../redux/hooks/hooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthFirestore = async (email: string, code: string) => {
    const usersQuery = query(
      collection(db, "users"),
      where("email", "==", email),
      where("pin", "==", code)
    );
    const usersSnapshot = await getDocs(usersQuery);
    if (usersSnapshot.size == 1) {
      usersSnapshot.forEach((user) => {
        console.log("user.data().code:",user.data().code);
        
        dispatch(login(user.data().code, user.data().name, user.data().email, null, null));
        localStorage.setItem('email-auth', user.data().email);
        localStorage.setItem('code-auth', user.data().code);
      })
      return true;
    } else {
      return false;
    }
  };
  return { isAuthFirestore };
};
