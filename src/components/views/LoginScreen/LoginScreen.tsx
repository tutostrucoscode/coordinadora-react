import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import logo2 from "../../../assets/logos/boltra-08.svg";

import { useAuth } from "../../../hooks/useAuth";

const LoginScreen = () => {
  const USER_DB = "helpcoor@unisabaneta.edu.co";
  const PW_DB = "YrQ@V39Q9mF@";

  const navigate = useNavigate();
  const auth = getAuth();
  const { isAuthFirestore } = useAuth();
  const [datosLogin, setdatosLogin] = useState({ email: "", code: "" });

  const onChange = (
    event: React.SyntheticEvent<Element, Event> | undefined
  ) => {
    if (event) {
      var { name, value } = event.currentTarget as HTMLInputElement;
      if (name == "email") setdatosLogin({ ...datosLogin, email: value });
      if (name == "code") setdatosLogin({ ...datosLogin, code: value });
    }
  };

  const onClick = () => {
    var { email, code } = datosLogin;
    if (email == "" || code == "") {
      alert("No hay datos de ingreso!");
    } else {
      signInWithEmailAndPassword(auth, USER_DB, PW_DB)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          const isAuth = await isAuthFirestore(email, code);
          if (isAuth == true) {
            if(email){
              console.log("Se guardo el email:",email);          
              localStorage.setItem('email-auth', email);
            }
            navigate(`/coordinadora-react/home`);
          } else {
            alert("Email o contraseña inconrrectos!");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Email o contraseña inconrrectos!");
        });
    }
  };

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
          width: "328px",
          height: "312px",
          padding: "24px",
          gap: "24px",
          boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
          borderRadius: "12px",
        }}
      >
        <div>
          <img
            src={logo2}
            alt=""
            width="181px"
            style={{ margin: "-69px 0px" }}
          />
        </div>
        <div>
          <TextField
            name="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={onChange}
            sx={{ width: "280px", height: "56px" }}
          />
        </div>
        <div>
          <TextField
            name="code"
            id="outlined-basic"
            label="Codigo"
            variant="outlined"
            onChange={onChange}
            sx={{ width: "280px", height: "56px" }}
          />
        </div>
        <div
          style={{
            marginTop: "25px",
          }}
        >
          <Button variant="contained" onClick={onClick} sx={{width:"280px", height:"56px",borderRadius:"5px"}}>
            Ingresar
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default LoginScreen;
