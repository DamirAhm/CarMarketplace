'use client'
import {AppBar, Avatar, Button, IconButton, Menu, MenuItem, styled, Toolbar, Typography} from "@mui/material";
import {reatomComponent, useAtom} from "@reatom/npm-react";
import {userAtom} from "../../../atoms/user.atom";
import {reatomAsync} from "@reatom/async";
import {logout} from "./api/logout";
import Link from "next/link";
import {useSavedPage} from "../../../hooks/useSavedPage";
import {usePathname} from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import {useState} from "react";

const fetchLogout = reatomAsync(async (ctx) => {
    await logout();

    userAtom(ctx, null);
});

const WhiteButton = styled(Button)({
    color: 'white'
})

export const Header = reatomComponent(({ctx}) => {
    const [user] = useAtom(userAtom);
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

    return <AppBar>
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Photos
            </Typography>
            {user ? (
                <div>
                    <IconButton
                        onClick={handleOpen}
                        size="large"
                    >
                        <Avatar>{user.login.slice(0, 2)}</Avatar>
                    </IconButton>
                    <Menu
                        onClose={handleClose}
                        open={opened}
                        id="menu-appbar"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem>Профиль</MenuItem>
                        <MenuItem onClick={onLogout}>Выйти</MenuItem>
                    </Menu>
                </div>
            ) : <WhiteButton
                startIcon={<LoginIcon/>}
                color={'primary'}
                onClick={onLogin}>
                <Link
                    href={'/auth/login'}
                >
                    Войти
                </Link>
            </WhiteButton>
            }
        </Toolbar>
    </AppBar>
})