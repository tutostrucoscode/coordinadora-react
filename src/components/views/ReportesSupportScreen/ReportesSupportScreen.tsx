import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BiLockOpenAlt } from "react-icons/bi";
import MessageIcon from "@mui/icons-material/Message";
import { useListReportsQuery } from "../../../hooks/useListReports";
import AppBar2 from "../../common/AppBar";
import IconButton from "@mui/material/IconButton";
import CircularIndeterminate from "../../common/Progress";
import { useAppSelector } from "../../../redux/hooks/hooks";
import InvoiceModal from "./InvoiceModal/InvoiceModal";
import { Ticket } from "../../../models/Ticket";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

const ReportesSupportScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [infoRemport, setInfoRemport] = useState({ idReport: "" });

  const { getListReportsQuery } = useListReportsQuery();
  const {
    searchReportsProcess,
    tikectsProcess,
    searchReportsClosed,
    tikectsClosed,
  } = getListReportsQuery();
  const { uid } = useAppSelector((state) => state.auth);

  useEffect(() => {
    searchReportsProcess(uid);
    searchReportsClosed(uid);
    console.log("Cantidad de datos obtenidos:", tikectsProcess);
  }, []);

  const onClickAddReport = async (tiket: Ticket) => {
    setInfoRemport({ idReport: tiket.uid });
    setOpenModal(true);
    console.log("onClickAddReport:", tiket);
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

  const componentStatus = (status: number) => {
    switch (status) {
      case 1:
        return (
          <>
            <Chip label="ABIERTO" color="primary" />
          </>
        );
      case 2:
        return (
          <>
            <Chip label="PROCESO" color="success" />
          </>
        );
      case 3:
        return (
          <>
            <Chip label="CERRADO" color="error" />
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div>
      <AppBar2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "#0059A6" }}>
              <TableRow>
                {/* <TableCell>Reporte</TableCell> */}
                <TableCell sx={{ color: "#FFFFFFFF" }}>Reportante</TableCell>
                <TableCell sx={{ color: "#FFFFFFFF" }}>Encargado</TableCell>
                <TableCell sx={{ color: "#FFFFFFFF" }} >Descripcion</TableCell>
                <TableCell sx={{ color: "#FFFFFFFF" }}>Estado</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(tikectsProcess) &&
                tikectsProcess.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.sederName}</TableCell>
                    <TableCell>{row.receiverName}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{componentStatus(row.state)}</TableCell>
                    <TableCell>
                      <Tooltip title="Atender">
                        <IconButton
                          aria-label="add_report"
                          onClick={() => onClickAddReport(row)}
                        >
                          <MessageIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {tikectsProcess.length == 0 ? <CircularIndeterminate /> : <div></div>}
        </TableContainer>
        <div style={{ marginTop: "50px" }}></div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "#0059A6" }}>
              <TableRow>
                {/* <TableCell>Reporte</TableCell> */}
                <TableCell sx={{ color: "#FFFFFFFF" }}>Reportante</TableCell>
                <TableCell sx={{ color: "#FFFFFFFF" }}>Encargado</TableCell>
                <TableCell sx={{ color: "#FFFFFFFF" }}>Estado</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(tikectsClosed) &&
                tikectsClosed.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.sederName}</TableCell>
                    <TableCell>{row.receiverName}</TableCell>
                    <TableCell>{componentStatus(row.state)}</TableCell>
                    <TableCell>
                      <Tooltip title="Reabrir">
                        <IconButton
                          aria-label="add_report"
                          onClick={() => onClickAddReport(row)}
                        >
                          <BiLockOpenAlt />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {tikectsClosed.length == 0 ? <CircularIndeterminate /> : <div></div>}
        </TableContainer>
        <InvoiceModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          infoRemport={infoRemport}
        />
      </AppBar2>
    </div>
  );
};

export default ReportesSupportScreen;
