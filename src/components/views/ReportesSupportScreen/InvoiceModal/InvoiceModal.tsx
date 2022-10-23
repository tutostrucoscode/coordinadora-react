import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { db } from "../../../../firebase/firebase-config";
import { setNotification } from "../../../../redux/actions/ui";
import { useAppDispatch } from "../../../../redux/hooks/hooks";
import Modal from "../../../common/Modal";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  infoRemport: { idReport: string };
}

const InvoiceModal = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [solution, setSolution] = useState("");
  const [category, setCategory] = useState("");

  const handleClose = () => {
    props.setOpenModal(false);
    //navigate(`/asignados`);
  };

  const handleChangeSolution = (event: React.SyntheticEvent<Element, Event>) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    console.log("datos del imput team:", { name, value });
    if (name === "team") {
      if (value !== "") {
        console.log("El team asignado es:", Number(value));
        setSolution(value);
      } else {
        //alert("No se puede asignar este team al vehiculo.");
        console.error("No se puede asignar este team al vehiculo.");
      }
    }
  };

  const handleChangeCategory = (event: React.SyntheticEvent<Element, Event>) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    console.log("datos del imput team:", { name, value });
    if (name === "team") {
      if (value !== "") {
        console.log("El team asignado es:", Number(value));
        setCategory(value);
      } else {
        //alert("No se puede asignar este team al vehiculo.");
        console.error("No se puede asignar este team al vehiculo.");
      }
    }
  };

  const handleClick = () => {
    const travelsExpensesReference = doc(
      db,
      "tickets",
      props.infoRemport.idReport
    );
    updateDoc(travelsExpensesReference, {
      solution: solution,
      category: category,
      state: 3,
    })
      .then((value) => {
        console.log(
          "Se guardo la configuracion del vehiculo:",
          props.infoRemport.idReport
        );
        dispatch(
          setNotification(
            true,
            "El ticket se atendio correctamente.",
            "success"
          )
        );
        handleClose();
      })
      .catch((error) => {
        console.error("Se guardo la configuracion del vehiculo.");
        dispatch(
          setNotification(true, "No se pudo almacenar el ticket", "error")
        );
      });
  };

  return (
    <Modal
      titleModal={`ticket ${props.infoRemport.idReport}`}
      actions={
        <>
          <Button
            sx={{
              background: "none",
              padding: "5px",
              height: "auto",
              //Todo: Esta clase propia de Mui, controla el todo lo relacionado con el Ripple del boton.
              "& .MuiTouchRipple-root": {
                color: "secondary.main",
              },
            }}
            onClick={handleClose}
          >
            <Typography
              variant="body1"
              fontSize={"13px"}
              fontStyle="normal"
              textAlign="center"
              color="primary"
            >
              Cancelar
            </Typography>
          </Button>
          <Button
            onClick={handleClick}
            disabled={false}
            sx={{
              background: "none",
              padding: "5px",
              height: "auto",
              "& .MuiTouchRipple-root": {
                color: "secondary.main",
              },
            }}
          >
            <Typography
              variant="body1"
              fontSize={"13px"}
              fontStyle="normal"
              textAlign="center"
              color="primary"
              sx={{ whiteSpace: "pre" }}
            >
              Guardar
            </Typography>
          </Button>
        </>
      }
      openModal={props.openModal}
      onCloseModal={handleClose}
    >
      <>
        <FormControl fullWidth>
          <div style={{ marginTop: "10px",display:"flex",justifyContent:"center" }}>
            <TextField
              id="standard-multiline-flexible"
              label="mensaje"
              name="team"
              multiline
              maxRows={4}
              onChange={handleChangeSolution}
              variant="filled"
            />
          </div>
          <div style={{ marginTop: "20px",display:"flex",justifyContent:"center" }}>
            <TextField
              id="standard-multiline-flexible"
              label="categoria"
              name="team"
              onChange={handleChangeCategory}
              variant="filled"
            />
          </div>
        </FormControl>
      </>
    </Modal>
  );
};

export default InvoiceModal;
