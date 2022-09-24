import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";

const LoginScreen = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: "25vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
          padding:5
        }}
      >
        <div>
          <img src={logo} alt="" width={"100px"} />
        </div>
        <div>
          <TextField id="outlined-basic" label="Email" variant="outlined" />
        </div>
        <div
          style={{
            marginTop: "25px",
          }}
        >
          <TextField id="outlined-basic" label="Codigo" variant="outlined" />
        </div>
        <div
          style={{
            marginTop: "25px",
          }}
        >
          <Button variant="contained" onClick={()=>navigate(`/coordinadora-react/home`)}>Ingresar</Button>
        </div>
      </Paper>
    </div>
  );
};

export default LoginScreen;
