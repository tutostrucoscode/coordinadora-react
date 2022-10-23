import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useListReports } from "../../../hooks/useListReports";
import AppBar2 from "../../common/AppBar";
import IconButton from "@mui/material/IconButton";
import { db } from "../../../firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import CircularIndeterminate from "../../common/Progress";
import { useAppSelector } from "../../../redux/hooks/hooks";
import Chip from "@mui/material/Chip";

const ReportesScreen = () => {
  const { uid } = useAppSelector((state) => state.auth);

  const { getListReports } = useListReports();
  const { searchReports,searchReportsRealTime, tikects } = getListReports();

  useEffect(() => {
    //searchReports();
    const unsubscribe = searchReportsRealTime()
    console.log("Cantidad de datos obtenidos:", tikects);
    return () => {
      console.log("useConnectivityOnlineRealTime() useEffect(return)");
      unsubscribe();
    };
  }, []);


  

  const onClickAddReport = async (IdRep: string) => {
    const ticketsRef = doc(db, "tickets", IdRep);
    console.log("onClickAddReport.uid:",uid);
    await updateDoc(ticketsRef, {
      receiverCode: uid,
      state: 2,
    });
    console.log("onClickAddReport:", IdRep);
  };

  const dictionaryStatus = (status: number) => {
    switch (status) {
      case 1:
        return "ABIERTO";
      case 2:
        return "PROCESO";
      case 3:
        return "CERRADO";
      default:
        return "";
    }
  };

  const componentStatus = (status: number) =>{
    switch (status) {
      case 1:
        return <><Chip label="ABIERTO" color="primary" /></>;
      case 2:
        return <><Chip label="PROCESO" color="success" /></>;
      case 3:
        return <><Chip label="CERRADO" color="error"  /></>;
      default:
        return <></>;
    }
  }

  return (
    <div>
      <AppBar2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "#0059A6" }}>
              <TableRow>
                {/* <TableCell>Reporte</TableCell> */}
                <TableCell sx={{ color: "#FFFFFFFF" }} >Reportante</TableCell>
                <TableCell sx={{ color: "#FFFFFFFF" }} >Encargado</TableCell>
                <TableCell sx={{ color: "#FFFFFFFF" }} >Descripcion</TableCell>
                <TableCell sx={{ color: "#FFFFFFFF" }} >Estado</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(tikects) &&
                tikects.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.sederName}</TableCell>
                    <TableCell>{row.receiverName}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{componentStatus(row.state)}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="add_report"
                        onClick={() => onClickAddReport(row.uid)}
                      >
                        <LibraryAddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {(tikects.length == 0) ? <CircularIndeterminate /> : <div></div>}
        </TableContainer>
      </AppBar2>
    </div>
  );
};

export default ReportesScreen;
