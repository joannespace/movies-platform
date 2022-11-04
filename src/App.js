import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { FetchContextProvider } from "./context/FetchContext";
import Router from "./routes/Router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8D2B00",
    },
  },
});

function App() {
  return (
    <FetchContextProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </FetchContextProvider>
  );
}

export default App;
