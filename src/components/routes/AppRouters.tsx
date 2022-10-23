import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { login, startLogout } from "../../redux/actions/auth";
import { setNotification } from "../../redux/actions/ui";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import LoginScreen from "../views/LoginScreen/LoginScreen";
import ReportesScreen from "../views/ReportesScreen/ReportesScreen";
import ReportesSupportScreen from "../views/ReportesSupportScreen/ReportesSupportScreen";
import { RequireAuth } from "./PrivateRouter";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import NewsScreen from "../views/NewsScreen/NewsScreen";

const AppRouters = () => {
  const { notification } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Se inicio el ciclo de vida en useEffect - AppRouters");
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        const { photoURL, email, uid, displayName } = user;
        if (uid) {
          console.log(
            "🟢[AppRouters] - las credenciales si existen en onAuthStateChanged:",
            email
          );
          const code_auth =
            localStorage.getItem("code-auth") == null
              ? uid
              : localStorage.getItem("code-auth");
          dispatch(
            login(code_auth, displayName, email, photoURL, "result.roleId")
          );
        } else {
          console.log("🔴[AppRouters] - No hay credenciales del usuario");
          dispatch(startLogout());
        }
      } else {
        console.log("🔴useEffect onAuthStateChanged NO USER");
        dispatch(startLogout());
      }
    });
    console.log("Se termino el ciclo de vida en useEffect - AppRouters");
    return () => {
      console.log("Se retorno el ciclo de vida en useEffect - AppRouters");
      unregisterAuthObserver();
    };
  }, [dispatch]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    dispatch(setNotification(false, "", "success"));
  };

  if (loading) {
    return <>Cargando datos...</>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/coordinadora-react/home" replace={true} />}
          />
          <Route
            path="*"
            element={<Navigate to="/coordinadora-react/home" replace={true} />}
          />
          <Route path="/coordinadora-react/login" element={<LoginScreen />} />
          <Route
            path="/coordinadora-react/home"
            element={
              <RequireAuth>
                <ReportesScreen />
              </RequireAuth>
            }
          />
          <Route
            path="/coordinadora-react/asignados"
            element={
              <RequireAuth>
                <ReportesSupportScreen />
              </RequireAuth>
            }
          />
          <Route
            path="/coordinadora-react/noticias"
            element={
              <RequireAuth>
                <NewsScreen />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <Snackbar
        open={notification.active}
        autoHideDuration={7000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={notification.notyType}
          sx={{ width: "100%" }}
        >
          {notification.text}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AppRouters;
