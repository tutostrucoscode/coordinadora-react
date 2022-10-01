import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useListReports } from "../../../hooks/useListReports";
import AppBar2 from "../../common/AppBar";

function createData(
  Asunto: string,
  Reporte: string,
  Encargado: string,
  Estado: string
) {
  return { Asunto, Reporte, Encargado, Estado };
}

const rows = [
  createData(
    "Fallo lectura",
    "Está fallando la lectura de códigos QR con los celulares",
    "Jose Florez",
    "Activo"
  ),
  createData(
    "Fallo impresión",
    "No sé esa generando las etiquetas de envió para las cajas",
    "",
    "Inactivo"
  ),
];

const ReportesScreen = () => {
  const { getListReports } = useListReports();
  const { searchReports, tikects } = getListReports();

  useEffect(() => {
    searchReports();
    console.log("Cantidad de datos obtenidos:",tikects.length)
  }, []);
  console.log("Cantidad de datos obtenidos-v2:",tikects.length)

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
                    <TableCell>{row.Estado}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AppBar2>
    </div>
  );
};

export default ReportesScreen;
