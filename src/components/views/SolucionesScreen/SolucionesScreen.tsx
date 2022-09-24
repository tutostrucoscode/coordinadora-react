import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import AppBar2 from "../../common/AppBar";
import Typography from "@mui/material/Typography";

const SolucionesScreen = () => {
  return (
    <div>
      <AppBar2>
        <Paper elevation={3}>
          <div style={{padding:20}}>
            <div>
              <Typography variant="subtitle1" component="h2" color={"#6E8577"}>
                Lorem ipsum dolor sit amet.
              </Typography>
            </div>
            <div>
              <Typography
                variant="subtitle1"
                component="h2"
                color={"#9FA2CC"}
                textAlign="end"
              >
                Lorem ipsum dolor sit amet.
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle1" component="h2" color={"#6E8577"}>
                Lorem ipsum dolor sit amet.
              </Typography>
            </div>
            <div>
              <Typography
                variant="subtitle1"
                component="h2"
                color={"#9FA2CC"}
                textAlign="end"
              >
                Lorem ipsum dolor sit amet.
              </Typography>
            </div>
          </div>
          <div style={{display:"flex", justifyContent:"center"}}>
            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Mensaje
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                value={""}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
        </Paper>
      </AppBar2>
    </div>
  );
};

export default SolucionesScreen;
