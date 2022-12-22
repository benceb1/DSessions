import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Venues from "./pages/Venues";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Session from "./pages/Session";

function App() {
  const theme = createTheme(themeSettings());

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/venues" element={<Venues />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/session" element={<Session />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
