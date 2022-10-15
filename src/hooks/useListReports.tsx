import { query, collection, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { getAuthFirestore } from "../helpers/authFirestore";

export const useListReports = () => {
  const getListReports = () => {
    const [tikects, setTikects] = useState<any[]>([]);

    const createData = (
      IdRep:string,
      Asunto: string,
      Reportante: string,
      Encargado: string,
      Estado: string
    ) => {
      return { IdRep, Asunto, Reportante, Encargado, Estado };
    };

    const searchReports = async () => {
      const ticketsQuery = query(collection(db, "tickets"));
      const ticketsSnapshot = await getDocs(ticketsQuery);
      if (ticketsSnapshot.size > 0) {
        const reportsList: any[] = [];
        ticketsSnapshot.forEach((tiket) => {
          let sederCode = tiket.data().sederCode;
          let state = tiket.data().state;
          let receiverCode = tiket.data().receiverCode;
          reportsList.push(createData(tiket.id,"Pendiente", sederCode, receiverCode, state));
        });
        console.log("reportsList:", reportsList.length);
        setTikects(reportsList);
      }
    };

    return { searchReports, tikects };
  };

  return { getListReports };
};

export const useListReportsQuery = () => {
  const getListReports = () => {
    const [tikects, setTikects] = useState<any[]>([]);

    const createData = (
      IdRep:string,
      Asunto: string,
      Reportante: string,
      Encargado: string,
      Estado: string
    ) => {
      return { IdRep, Asunto, Reportante, Encargado, Estado };
    };

    const searchReports = async (receiverCode:string) => {
      const ticketsQuery = query(
        collection(db, "tickets"),
        where("state", "==", 2),
        where("receiverCode", "==", receiverCode),
      );

      const ticketsSnapshot = await getDocs(ticketsQuery);
      if (ticketsSnapshot.size > 0) {
        const reportsList: any[] = [];
        ticketsSnapshot.forEach((tiket) => {
          let sederCode = tiket.data().sederCode;
          let state = tiket.data().state;
          reportsList.push(createData(tiket.id,"Pendiente", sederCode, "--", state));
        });
        console.log("reportsList:", reportsList.length);
        setTikects(reportsList);
      }
    };

    return { searchReports, tikects };
  };

  return { getListReports };
};
