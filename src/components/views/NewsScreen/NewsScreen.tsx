import React, { useEffect, useState } from "react";
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
import { CardHeader, FormControl, TextField } from "@mui/material";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { setNotification } from "../../../redux/actions/ui";

const NewsScreen = () => {
  const dispatch = useAppDispatch();

  const { getListReportsQuery } = useListReportsQuery();
  const { searchNews, news } = getListReportsQuery();

  const [solution, setSolution] = useState({
    description: "",
    image: "",
    title: "",
  });

  function checkURL(url: string) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  const handleChangeSolution = (
    event: React.SyntheticEvent<Element, Event>
  ) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    console.log("datos del imput team:", { name, value });
    switch (name) {
      case "description":
        if (value !== "") {
          console.log("La description asignado es:", value);
          setSolution({ ...solution, description: value });
        } else {
          console.error("Erro en la description");
        }
        break;
      case "image":
        if (value !== "") {
          if (checkURL(value)) {
            console.log("La image asignado es:", value);
            setSolution({ ...solution, image: value });
          } else {
            console.error("Erro en la image");
          }
        } else {
          console.error("Erro en la image");
        }
        break;
      case "titulo":
        if (value !== "") {
          console.log("El titulo asignado es:", value);
          setSolution({ ...solution, title: value });
        } else {
          console.error("Erro en el titulo");
        }
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    const newsReference = collection(db, "news");
    addDoc(newsReference, { ...solution, state: 1 }).then((value)=>{
      dispatch(
        setNotification(
          true,
          "Se creo correctamente la noticia",
          "success"
        )
      );
    })
  };

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
            <CardHeader title="Nueva Noticia" />
            <CardContent>
              <>
                <FormControl fullWidth>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      id="standard-multiline-flexible"
                      label="titulo"
                      name="titulo"
                      onChange={handleChangeSolution}
                      variant="filled"
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      id="standard-multiline-flexible"
                      label="description"
                      name="description"
                      multiline
                      maxRows={4}
                      onChange={handleChangeSolution}
                      variant="filled"
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      id="standard-multiline-flexible"
                      label="image"
                      name="image"
                      onChange={handleChangeSolution}
                      variant="filled"
                    />
                  </div>
                </FormControl>
              </>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleClick}>
                Crear
              </Button>
            </CardActions>
          </Card>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <Card sx={{ maxWidth: 345 }}>
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
          </Card> */}
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
