import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";

interface Props {
  titleModal: string;
  children: JSX.Element[] | JSX.Element;
  actions: JSX.Element[] | JSX.Element;
  openModal: boolean;
  onCloseModal: any;
}

const Modal = (props: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.openModal}
      onClose={props.onCloseModal}
      aria-labelledby="responsive-dialog-title"
      sx={{
        borderRadius: "12px",
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
        "& .MuiPaper-root": {
          borderRadius: "12px",
          width: "312px",
          height: "380px",
          padding: "24px 14px 12px 14px",
          background: "#FAFAFA",
          boxShadow:
            "0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "26px",
          padding: "0px",
          textAlign: "left",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          marginBottom:"15px"
        }}
      >
        {props.titleModal}
      </DialogTitle>
      <DialogContent sx={{ padding: "0px" }}>{props.children}</DialogContent>
      <DialogActions sx={{ padding: "0px", width: "272px", height: "35px" }}>
        {props.actions}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;