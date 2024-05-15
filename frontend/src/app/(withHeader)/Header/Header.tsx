'use client'
import {
    AppBar,
    Avatar,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography
} from "@mui/material";
import {reatomComponent, useAtom} from "@reatom/npm-react";
import {userAtom, userRequestedAtom} from "../../../atoms/user.atom";
import {reatomAsync} from "@reatom/async";
import {logout} from "./api/logout";
import Link from "next/link";
import {useSavedPage} from "../../../hooks/useSavedPage";
import {usePathname} from "next/navigation";
import LoginIcon from '@mui/icons-material/Login';
import {useRef, useState} from "react";

const fetchLogout = reatomAsync(async (ctx) => {
    await logout();

    userAtom(ctx, null);
});

const WhiteButton = styled(Button)({
    color: 'white'
}) as any;

export const Header = reatomComponent(({ctx}) => {
    const [user] = useAtom(userAtom);
    const [userRequested] = useAtom(userRequestedAtom);
    const [opened, setOpened] = useState(false);

    const handleOpen = () => {
        setOpened(true);
    }
    const handleClose = () => {
        setOpened(false);
    }

    const pathname = usePathname();

    const {setSavedPage} = useSavedPage();

    const onLogin = () => {
        setSavedPage(pathname);
    }

    const onLogout = () => {
        fetchLogout(ctx);
    }

    const avatarRef = useRef(null);

    return <AppBar color={'info'}>
        <Container maxWidth={'xl'}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Авто
                </Typography>
                {user ? (
                        <div>
                            <Link href={'/advertisements/create'}><Button variant={'contained'}>Создать
                                объявление</Button></Link>
                            <IconButton
                                onClick={handleOpen}
                                size="large"
                                ref={avatarRef}
                            >
                                <Avatar>{user.login.slice(0, 2)}</Avatar>
                            </IconButton>
                            <Menu
                                onClose={handleClose}
                                open={opened}
                                anchorEl={avatarRef.current}
                            >
                                <Link href={'/profile'}><MenuItem>Профиль</MenuItem></Link>
                                <Link href={'/profile/advertisements'}><MenuItem>Мои объявления</MenuItem></Link>
                                <MenuItem onClick={onLogout}>Выйти</MenuItem>
                            </Menu>
                        </div>
                    ) :
                    <>{userRequested ?
                        <Link
                            href={'/auth/login'}
                        >
                            <WhiteButton
                                startIcon={<LoginIcon/>}
                                color={'primary'}
                                onClick={onLogin}>
                                Войти
                            </WhiteButton>
                        </Link> : null}</>
                }
            </Toolbar>
        </Container>
    </AppBar>
})