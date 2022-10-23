import { useState } from "react";
import Stack from "@mui/material/Stack";
import AppRouters from "./components/routes/AppRouters";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Stack sx={{ width: "100%" }}>
        <AppRouters />
      </Stack>
    </Provider>
  );
}

export default App;
