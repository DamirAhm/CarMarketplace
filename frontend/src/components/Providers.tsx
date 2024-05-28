"use client";

import { createCtx } from "@reatom/core";
import { reatomContext } from "@reatom/npm-react";
import { PropsWithChildren } from "react";
import { UserFetcher } from "./UserFetcher";
import { createTheme, ThemeProvider } from "@mui/material";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

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
    <AntdRegistry>
      <AppRouterCacheProvider>
        <reatomContext.Provider value={ctx}>
          <UserFetcher />
          {children}
        </reatomContext.Provider>
      </AppRouterCacheProvider>
    </AntdRegistry>
  </ThemeProvider>;
};