import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useListReportsQuery } from "../../../hooks/useListReports";
import AppBar2 from "../../common/AppBar";
import IconButton from "@mui/material/IconButton";
import { db } from "../../../firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const ReportesSupportScreen = () => {
  const { getListReports } = useListReportsQuery();
  const { searchReports, tikects } = getListReports();

  useEffect(() => {
    searchReports("2555");
    console.log("Cantidad de datos obtenidos:", tikects);
  }, []);

  const onClickAddReport = async (IdRep: string) => {
    const ticketsRef = doc(db, "tickets", IdRep);
    await updateDoc(ticketsRef, {
      receiverCode: "2555",
      state: "PROCESO",
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

  return (
    <div>
      <AppBar2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "#9097BB" }}>
              <TableRow>
                <TableCell>Asunto</TableCell>
                {/* <TableCell>Reporte</TableCell> */}
                <TableCell>Reportante</TableCell>
                <TableCell>Encargado</TableCell>
                <TableCell>Estado</TableCell>
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
                    <TableCell>{row.Asunto}</TableCell>
                    <TableCell>{row.Reportante}</TableCell>
                    <TableCell>{row.Encargado}</TableCell>
                    <TableCell>{dictionaryStatus(row.Estado)}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="add_report"
                        onClick={() => onClickAddReport(row.IdRep)}
                      >
                        <LibraryAddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AppBar2>
    </div>
  );
};

export default ReportesSupportScreen;
