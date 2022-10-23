import { useState } from "react";
import {
  query,
  collection,
  getDocs,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { Ticket } from "../models/Ticket";
import { News } from "../models/News";

export const useListReports = () => {
  const getListReports = () => {
    const [tikects, setTikects] = useState<Ticket[]>([]);

    const searchReports = async () => {
      const ticketsQuery = query(
        collection(db, "tickets"),
        where("receiverCode", "==", null)
      );
      const ticketsSnapshot = await getDocs(ticketsQuery);
      if (ticketsSnapshot.size > 0) {
        const reportsList: Ticket[] = [];

        for (let index = 0; index < ticketsSnapshot.docs.length; index++) {
          const ticket: Ticket = ticketsSnapshot.docs[index].data() as Ticket;
          ticket.sederName = await getUserName(ticket.sederCode);
          ticket.receiverCode != null
            ? (ticket.receiverName = await getUserName(ticket.receiverCode))
            : (ticket.receiverName = "Sin asignar");
          reportsList.push(ticket);
        }
        console.log("reportsList:", reportsList);
        console.log("reportsList.length:", reportsList.length);
        setTikects(reportsList);
      }
    };

    const searchReportsRealTime = () => {
      const ticketsQuery = query(
        collection(db, "tickets"),
        where("receiverCode", "==", null)
      );
      const unsubscribe = onSnapshot(ticketsQuery, async (ticketSnapshot) => {
        if (ticketSnapshot.size > 0) {
          const reportsList: Ticket[] = [];

          for (let index = 0; index < ticketSnapshot.docs.length; index++) {
            const ticket: Ticket = ticketSnapshot.docs[index].data() as Ticket;
            ticket.sederName = await getUserName(ticket.sederCode);
            ticket.receiverCode != null
              ? (ticket.receiverName = await getUserName(ticket.receiverCode))
              : (ticket.receiverName = "Sin asignar");
            reportsList.push(ticket);
          }
          console.log("reportsList:", reportsList);
          console.log("reportsList.length:", reportsList.length);
          setTikects(reportsList);
        }
      });

      return unsubscribe;
    };

    return { searchReports, searchReportsRealTime, tikects };
  };
  return { getListReports };
};

const getUserName = async (code: string): Promise<string | null> => {
  return getDocs(query(collection(db, "users"), where("code", "==", code)))
    .then((result) => {
      return result.docs[0].data().name;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};


export const useListReportsQuery = () => {
  const getListReportsQuery = () => {
    const [tikectsProcess, setTikectsProcess] = useState<Ticket[]>([]);
    const searchReportsProcess = async (receiverCode: string) => {
      const ticketsQuery = query(
        collection(db, "tickets"),
        where("state", "==", 2),
        where("receiverCode", "==", receiverCode)
      );
      const ticketsSnapshot = await getDocs(ticketsQuery);
      if (ticketsSnapshot.size > 0) {
        const reportsList: Ticket[] = [];

        for (let index = 0; index < ticketsSnapshot.docs.length; index++) {
          const ticket: Ticket = ticketsSnapshot.docs[index].data() as Ticket;
          ticket.sederName = await getUserName(ticket.sederCode);
          ticket.receiverCode != null
            ? (ticket.receiverName = await getUserName(ticket.receiverCode))
            : (ticket.receiverName = "Sin asignar");
          reportsList.push(ticket);
        }
        console.log("reportsList:", reportsList);
        console.log("reportsList.length:", reportsList.length);
        setTikectsProcess(reportsList);
      }
    };

    const [tikectsClosed, setTikectsClosed] = useState<Ticket[]>([]);
    const searchReportsClosed = async (receiverCode: string) => {
      const ticketsQuery = query(
        collection(db, "tickets"),
        where("state", "==", 3),
        where("receiverCode", "==", receiverCode)
      );
      const ticketsSnapshot = await getDocs(ticketsQuery);
      if (ticketsSnapshot.size > 0) {
        const reportsList: Ticket[] = [];

        for (let index = 0; index < ticketsSnapshot.docs.length; index++) {
          const ticket: Ticket = ticketsSnapshot.docs[index].data() as Ticket;
          ticket.sederName = await getUserName(ticket.sederCode);
          ticket.receiverCode != null
            ? (ticket.receiverName = await getUserName(ticket.receiverCode))
            : (ticket.receiverName = "Sin asignar");
          reportsList.push(ticket);
        }
        console.log("reportsList:", reportsList);
        console.log("reportsList.length:", reportsList.length);
        setTikectsClosed(reportsList);
      }
    };

    const [news, setNews] = useState<News[]>([]);
    const searchNews = async () => {
      const newsQuery = query(collection(db, "news"));
      const newsSnapshot = await getDocs(newsQuery);
      if (newsSnapshot.size > 0) {
        const reportsList: News[] = [];

        for (let index = 0; index < newsSnapshot.docs.length; index++) {
          const ticket = newsSnapshot.docs[index].data();
          const dataNews = {
            title: ticket.title,
            image: ticket.image,
            state: ticket.state,
            description: ticket.description,
          } as News;
          reportsList.push(dataNews);
        }
        console.log("reportsList:", reportsList);
        console.log("reportsList.length:", reportsList.length);
        setNews(reportsList);
      }
    };

    return {
      searchReportsProcess,
      searchReportsClosed,
      tikectsProcess,
      tikectsClosed,
      searchNews,
      news,
    };
  };

  return { getListReportsQuery };
};
