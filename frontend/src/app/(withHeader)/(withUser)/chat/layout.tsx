"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { reatomComponent } from "@reatom/npm-react";
import { userAtom } from "../../../../atoms/user.atom";
import { Chat, getChats } from "./api/getChats";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Avatar, Col, Image, Row } from "antd";
import { getImageUrl } from "../../../../utils/getImageUrl";
import { UserOutlined } from "@ant-design/icons";

const ChatLayout: React.FC<PropsWithChildren> = reatomComponent(({ ctx, children }) => {
  const user = ctx.spy(userAtom);
  const [chats, setChats] = useState<Record<string, Chat> | null>(null);

  useEffect(() => {
    if (user) {
      (async () => {
        const chats = await getChats();

        setChats(chats);
      })();
    }
  }, [user]);

  return <Box padding={"40px 0"} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
    <Paper>
      <Box width={"1440px"} minHeight={"calc(100vh - 150px)"} padding={"30px"}>
        <Grid container gap={"30px"}>
          <Grid item xs={3}>
            <Col>
              <Typography variant={"h4"} gutterBottom>Ваши чаты</Typography>
              <Box height={"20px"} />
              {
                (chats ? Object.values(chats) : []).map((chat) => {
                  const date = new Date(chat.createdAt);

                  const hours = date.getHours().toString().padStart(2, "0");
                  const minutes = date.getMinutes().toString().padStart(2, "0");

                  const dateStr = `${hours}:${minutes}`;

                  return <Paper key={chat.id}>
                    <Box padding={"10px"}>
                      <Col>
                        <Row>
                          <Box width={"30px"} height={"30px"}>
                            {chat.receiver.avatar
                              ?
                              <Image style={{ borderRadius: "50%" }} src={getImageUrl(chat.receiver.avatar)} width={30}
                                     height={30} />
                              : <Avatar size={{ xs: 30 }} style={{ borderRadius: "50%" }} icon={<UserOutlined />} />
                            }
                          </Box>
                          <Box width={"20px"} />
                          <Typography variant={"h6"} color={"gray"}>{chat.receiver.login}</Typography>
                        </Row>
                        <Box height={"10px"} />
                        <Row justify={"space-between"} align={"middle"}>
                          <Typography
                            style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "calc(100% - 6rem)" }}
                            variant={"body1"}
                            color={"gray"}>{chat.message}</Typography>
                          <Typography variant={"body2"} color={"darkgray"}>{dateStr}</Typography>
                        </Row>
                      </Col>
                    </Box>
                  </Paper>;
                })
              }
            </Col>
          </Grid>
          <Grid item xs={8}>{children}</Grid>
        </Grid>
      </Box>
    </Paper>
  </Box>
    ;
});

export default ChatLayout;