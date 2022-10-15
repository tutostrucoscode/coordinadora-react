import { query, collection, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { getAuthFirestore } from "../helpers/authFirestore";
import { Ticket } from "../models/Ticket";

export const useListReports = () => {
  const getListReports = () => {
    const [tikects, setTikects] = useState<Ticket[]>([]);

    const searchReports = async () => {
      const ticketsQuery = query(collection(db, "tickets"), where("receiverCode", "==", null));
      const ticketsSnapshot = await getDocs(ticketsQuery);
      if (ticketsSnapshot.size > 0) {
        const reportsList: Ticket[] = [];

        for (let index = 0; index < ticketsSnapshot.docs.length; index++) {
          const ticket: Ticket = ticketsSnapshot.docs[index].data() as Ticket;
          ticket.sederName = await getUserName(ticket.sederCode);
          (ticket.receiverCode != null) ? ticket.receiverName = await getUserName(ticket.receiverCode) : ticket.receiverName = "Sin asignar";
          reportsList.push(ticket);
        }

        console.log("reportsList:", reportsList.length);
        setTikects(reportsList);
      }
    };

    return { searchReports, tikects };
  };

  return { getListReports };
};
const getUserName = async (code: string): Promise<string | null> => {
  return getDocs(query(collection(db, "users"), where("code", "==", code)))
    .then((result) => {
      return result.docs[0].data().name;
    }).catch((err) => {
      console.error(err);
      return null;
    });
};



export const useListReportsQuery = () => {
  const getListReportsQuery = () => {
    const [tikects, setTikects] = useState<Ticket[]>([]);

    const searchReports = async (receiverCode: string) => {
      const ticketsQuery = query(
        collection(db, "tickets"),
        where("state", "==", 2),
        where("receiverCode", "==", receiverCode),
      );
      const ticketsSnapshot = await getDocs(ticketsQuery);
      if (ticketsSnapshot.size > 0) {
        const reportsList: Ticket[] = [];

        for (let index = 0; index < ticketsSnapshot.docs.length; index++) {
          const ticket: Ticket = ticketsSnapshot.docs[index].data() as Ticket;
          ticket.sederName = await getUserName(ticket.sederCode);
          (ticket.receiverCode != null) ? ticket.receiverName = await getUserName(ticket.receiverCode) : ticket.receiverName = "Sin asignar";
          reportsList.push(ticket);
        }

        console.log("reportsList:", reportsList.length);
        setTikects(reportsList);
      }
    };

    return { searchReports, tikects };
  };

  return { getListReportsQuery };
};

