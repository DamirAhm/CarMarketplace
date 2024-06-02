"use client";
import { AppBar, Button, Container, IconButton, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import { reatomComponent, useAtom } from "@reatom/npm-react";
import { userAtom, userRequestedAtom } from "../../../atoms/user.atom";
import { reatomAsync } from "@reatom/async";
import { logout } from "./api/logout";
import Link from "next/link";
import { useSavedPage } from "../../../hooks/useSavedPage";
import { usePathname } from "next/navigation";
import LoginIcon from "@mui/icons-material/Login";
import { useRef, useState } from "react";
import { Avatar, Flex, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getImageUrl } from "../../../utils/getImageUrl";
import { SUPPORT_USER_LOGIN } from "../../../../../common/constants/ServiceUser";

const fetchLogout = reatomAsync(async (ctx) => {
  await logout();

  userAtom(ctx, null);
});

const WhiteButton = styled(Button)({
  color: "white"
}) as any;

export const Header = reatomComponent(({ ctx }) => {
  const [user] = useAtom(userAtom);
  const [userRequested] = useAtom(userRequestedAtom);
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
  };
  const handleClose = () => {
    setOpened(false);
  };

  const pathname = usePathname();

  const { setSavedPage } = useSavedPage();

  const onLogin = () => {
    setSavedPage(pathname);
  };

  const onLogout = () => {
    fetchLogout(ctx);
  };

  const avatarRef = useRef(null);

  return <AppBar color={"info"}>
    <Container maxWidth={"xl"}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          <Link href={"/"}>
            Авто
          </Link>
        </Typography>
        <Space size={"large"}>
          <Link href={"/chat"}>
            <Typography variant="subtitle1" color={"white"}>
              Сообщения
            </Typography>
          </Link>
          <Link href={"/profile/favorites"}>
            <Typography variant="subtitle1" color={"white"}>
              Понравившиеся
            </Typography>
          </Link>
          <Link href={"/profile/advertisements"}>
            <Typography variant="subtitle1" color={"white"}>
              Мои объявления
            </Typography>
          </Link>
          <Link href={`/chat/${SUPPORT_USER_LOGIN}`}>
            <Typography variant="subtitle1" color={"white"}>
              Поддержка
            </Typography>
          </Link>
        </Space>
        {user ? (
            <div>
              <Link href={"/advertisements/create"}><Button variant={"contained"}>Создать
                объявление</Button></Link>
              <IconButton
                onClick={handleOpen}
                size="large"
                ref={avatarRef}
              >
                <Avatar icon={<UserOutlined />} src={user.avatar && getImageUrl(user.avatar)} />
              </IconButton>
              <Menu
                onClose={handleClose}
                open={opened}
                anchorEl={avatarRef.current}
              >
                <Link href={"/profile"}><MenuItem>Профиль</MenuItem></Link>
                <MenuItem onClick={onLogout}>Выйти</MenuItem>
              </Menu>
            </div>
          ) :
          <>{!user ?
            <Flex
              style={{ width: "261px", flexDirection: "row-reverse" }}
            >
              <Link
                href={"/auth/login"}
              >
                <WhiteButton
                  startIcon={<LoginIcon />}
                  color={"primary"}
                  onClick={onLogin}>
                  Войти
                </WhiteButton>
              </Link>
            </Flex>
            : null
            }
          </>
        }
      </Toolbar>
    </Container>
  </AppBar>;
});