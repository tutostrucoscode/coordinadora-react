import { AlertColor } from "@mui/material/Alert";
import { types } from "../types/types";

export const setNotification = (
    active: boolean,
    text: string,
    notyType: AlertColor
  ) => {
    return {
      type: types.setNotification,
      payload: {
        notification: { active, text, notyType },
      },
    };
  };