"use client";

import { createCtx } from "@reatom/core";
import { reatomContext } from "@reatom/npm-react";
import { PropsWithChildren } from "react";
import { UserFetcher } from "./UserFetcher";
import { createTheme, ThemeProvider } from "@mui/material";

const ctx = createCtx();

const theme = createTheme({
  palette: {
    text: {
      primary: "#000",
      secondary: "#ccc",
      disabled: "#eee"
    }
  }
});

export const Providers = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>
    <reatomContext.Provider value={ctx}>
      <UserFetcher />
      {children}
    </reatomContext.Provider>
  </ThemeProvider>;
};