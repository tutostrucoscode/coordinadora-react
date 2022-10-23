import { types } from "../types/types";

interface AuthState {
  uid: string;
  name: string | null;
  email: string | null;
  urlimage: string | null;
  roleId: string | null;
}

const initialState: AuthState = {
  uid: "",
  name: null,
  email: null,
  urlimage: null,
  roleId: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.login:
      //Contienen la estructura de la data que se recibe del action sobre el inicio de sesión
      const objetoLogin = {
        ...state,
        uid: action.payload.uid,
        name: action.payload.name,
        email: action.payload.email,
        urlimage: action.payload.urlimage,
        roleId: action.payload.roleId,
      };
      return objetoLogin;
    case types.logout:
      return initialState;
    default:
      return state;
  }
};