import { Box, Container, Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return <Box
    bgcolor={"white"}
    justifyContent={"center"}
    alignContent={"center"}
    width={"100vw"}
    height={"100vh"}>
    <Container style={{ height: "100vh", display: "flex", alignItems: "center" }} maxWidth={"sm"}>
      <Paper elevation={10} sx={{ padding: "30px" }}>
        {children}
      </Paper>
    </Container>
  </Box>;
}