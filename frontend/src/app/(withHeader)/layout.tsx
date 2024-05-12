import {PropsWithChildren} from "react";
import {Box, Container} from "@mui/material";
import {Header} from "./Header/Header";

export default function WithHeaderLayout({children}: PropsWithChildren) {
    return <Box
        bgcolor={'white'}
        minWidth={'100vw'}
        minHeight={'100vh'}>
        <Header/>
        <Container maxWidth={'lg'}>
            {children}
        </Container>
    </Box>
}