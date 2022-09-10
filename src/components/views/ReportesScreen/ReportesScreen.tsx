import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
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
  return (
    <div>
      <AppBar2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{backgroundColor:"#9097BB"}}>
              <TableRow>
                <TableCell>Asunto</TableCell>
                <TableCell>Reporte</TableCell>
                <TableCell>Encargado</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.Asunto}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.Asunto}</TableCell>
                  <TableCell>{row.Reporte}</TableCell>
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
