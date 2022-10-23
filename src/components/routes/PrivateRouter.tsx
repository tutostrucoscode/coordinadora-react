import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();

  // Obtengo la uid del usuario que esta logueado en el momento.
  const { uid, email } = useAppSelector((state) => state.auth);

  // Si tengo uid significa que inicio sesion, sino no tengo una sesion creada.
  const isLoggedIn = !!uid;

  let location = useLocation();
 

  if (!isLoggedIn) {
    // Redirigirlos a la página de inicio de sesión, pero guardar la ubicación actual en la que estaban
    // tratando de ir a cuando fueron redirigidos. Esto nos permite enviarlos
    // junto a esa página después de iniciar sesión, que es una experiencia de usuario más agradable
    // que dejarlos en la página de inicio.
    console.log("🔴[RequireAuth] - No se encontro roleId en el aplicativo");
    return <Navigate to="/coordinadora-react/login" state={{ from: location }} replace />;
  } else {
    console.log("🟢[RequireAuth] - Si hay credenciales para del usuario:",email);
    return children;
  }
}