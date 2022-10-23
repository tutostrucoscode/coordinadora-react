import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AppBar2 from "../../common/AppBar";
import TableBody from "@mui/material/TableBody";
import CircularIndeterminate from "../../common/Progress";
import { useListReportsQuery } from "../../../hooks/useListReports";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import ImageNotFound from "../../../assets/image-not-found.png";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CardHeader } from "@mui/material";

const NewsScreen = () => {
  const { getListReportsQuery } = useListReportsQuery();
  const { searchNews, news } = getListReportsQuery();

  useEffect(() => {
    searchNews();
    console.log("Cantidad de datos obtenidos:", news);
  }, []);

  const componentStatus = (status: number) => {
    switch (status) {
      case 1:
        return (
          <>
            <Chip label="ABIERTO" color="primary" />
          </>
        );
      default:
        return (
          <>
            <Chip label="CERRADO" color="error" />
          </>
        );
    }
  };

  return (
    <AppBar2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader title="Nueva Noticia"/>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={ImageNotFound}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ backgroundColor: "#0059A6" }}>
            <TableRow>
              <TableCell sx={{ color: "#FFFFFFFF" }}>Titulo</TableCell>
              <TableCell sx={{ color: "#FFFFFFFF" }}>Descripción</TableCell>
              <TableCell sx={{ color: "#FFFFFFFF" }}>Estado</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(news) &&
              news.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{componentStatus(row.state)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {news.length == 0 ? <CircularIndeterminate /> : <div></div>}
      </TableContainer>
    </AppBar2>
  );
};

export default NewsScreen;
