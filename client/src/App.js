import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { decodeToken } from "react-jwt";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./scenes/login/";

import HomeLayout from "./scenes/home/HomeLayout";
import Home from "./scenes/home/";

import StudioLayout from "./scenes/studio/StudioLayout";
import Studio from "./scenes/studio";

import Page404 from "./components/Page404";
import Noroute from "./components/Noroute";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = useSelector((state) => state.global.token);
  const decodedToken = !token ? null : decodeToken(token);
  const videoId = useSelector((state) => state.global.videoId);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home/*" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
            </Route>
            <Route element={<StudioLayout />}>
              <Route path="/studio" element={<Navigate to={token ? `/studio/${decodedToken?.id}` : `/login`} replace />} />
              <Route path={`/studio/video/edit/${videoId}`} element={<Studio />} />
              <Route path={`/studio/${decodedToken?.id}`} element={<Studio />} />
            </Route>
            <Route path={`/noroute`} element={<Noroute />} />
            <Route path={`/*`} element={<Page404 />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
