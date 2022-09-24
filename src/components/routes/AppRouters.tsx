import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "../views/LoginScreen/LoginScreen";
import ReportesScreen from "../views/ReportesScreen/ReportesScreen";
import SolucionesScreen from "../views/SolucionesScreen/SolucionesScreen";

const AppRouters = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/coordinadora-react/login" replace={true} />} />
          <Route path="*" element={<Navigate to="/coordinadora-react/login" replace={true} />} />
          <Route path="/coordinadora-react/home" element={<ReportesScreen />} />
          <Route path="/coordinadora-react/login" element={<LoginScreen />} />
          <Route path="/coordinadora-react/soluciones" element={<SolucionesScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouters;
