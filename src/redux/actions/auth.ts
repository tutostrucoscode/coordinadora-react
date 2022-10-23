import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { types } from "../types/types";

// hace la accion de login, almacena la data del usuario
export const login = (
  uid: string | null,
  name: string | null,
  email: string | null,
  urlimage: string | null,
  roleId: string | null
) => ({
  type: types.login,
  payload: {
    uid,
    name,
    email,
    urlimage,
    roleId
  },
});

// hace la accion de logout, elimina la data del usuario de redux y los del firebase auth
export const startLogout = () => {
  return async (dispatch: any) => {
    await signOut(auth);
    dispatch(logout());
  };
};

// se comunica con el reducer para eliminar la data del usuario
export const logout = () => ({
  type: types.logout,
});