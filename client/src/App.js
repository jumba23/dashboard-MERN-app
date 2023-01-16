import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./scenes/layout/index.jsx";
import Dashboard from "./scenes/dashboard/index.jsx";
import Products from "./scenes/products";

function App() {
  const mode = useSelector((state) => state.global.mode);

  //The useMemo hook is a React hook that is used to cache the value of a function that is expensive to compute.
  //It takes two arguments: the function to compute, and an array of dependencies.
  //The function is only re-computed if one of the dependencies changes.
  //The theme object is expensive to create because it involves processing of the themeSettings,
  // So, it's being wrapped with useMemo hook to make sure it's only created when the mode changes.
  //By using useMemo hook, we can make sure that the theme object is only re-created when the theme mode changes,
  // which is a more efficient way of managing the theme object.
  // [mode] is a dependency
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
