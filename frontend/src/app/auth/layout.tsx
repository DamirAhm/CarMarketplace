import {Box, Container, Paper} from "@mui/material";
import {PropsWithChildren} from "react";

export default function AuthLayout({children}: PropsWithChildren) {
    return <Box
        bgcolor={'white'}
        justifyContent={'center'}
        alignContent={'center'}
        minWidth={'100vw'}
        minHeight={'100vh'}>
        <Container maxWidth={'sm'}>
            <Paper elevation={10} sx={{padding: '30px'}}>
                {children}
            </Paper>
        </Container>
    </Box>
}