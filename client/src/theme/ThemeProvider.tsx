import React, { createContext, FC, ReactNode, useState } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { themeCreator } from "./base";
import {} from "@mui/material";

export const ThemeContext = createContext((themeName: string): void => {});

const ThemeProviderWrapper = (props: { children: ReactNode }) => {
  const curThemeName = localStorage.getItem("appTheme") || "PureLightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
