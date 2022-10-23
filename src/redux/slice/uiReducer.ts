import { AlertColor } from "@mui/material/Alert";
import { types } from "../types/types";

interface CurrentPlaceState {
  notification: { active: boolean; text: string; notyType: AlertColor };
}

const initialState: CurrentPlaceState = {
  notification: { active: false, text: "", notyType: "success" },
};

export const uiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.setNotification:
      return {
        ...state,
        notification: action.payload.notification,
      };
    default:
      return state;
  }
};