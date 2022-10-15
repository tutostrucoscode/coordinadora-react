import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";

export const useAuth = () => {
  const isAuthFirestore = async (email: string, code: string) => {
    const usersQuery = query(
      collection(db, "users"),
      where("email", "==", email),
      where("pin", "==", code)
    );
    const usersSnapshot = await getDocs(usersQuery);
    if (usersSnapshot.size == 1) {
      return true;
    } else {
      return false;
    }
  };
  return { isAuthFirestore };
};
