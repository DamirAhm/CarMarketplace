"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { reatomComponent } from "@reatom/npm-react";
import { userAtom } from "../../../../atoms/user.atom";
import { getChats, MessageWithIncludes } from "./api/getChats";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Col, Space } from "antd";
import { ChatPreview } from "./components/ChatPreview";

const ChatLayout: React.FC<PropsWithChildren> = reatomComponent(({ ctx, children }) => {
  const user = ctx.spy(userAtom);
  const [chats, setChats] = useState<Record<string, MessageWithIncludes> | null>(null);

  useEffect(() => {
    if (user) {
      (async () => {
        const chats = await getChats();

        setChats(chats);
      })();
    }
  }, [user]);

  return <Box padding={"40px 0 0 0"} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
    <Paper>
      <Box width={"1440px"} minHeight={"calc(100vh - 200px)"} padding={"30px"}>
        <Grid container height={"calc(100vh - 190px)"} gap={"70px"}>
          <Grid item xs={3}>
            <Col>
              <Typography variant={"h4"} gutterBottom>Ваши чаты</Typography>
              <Box height={"20px"} />
              <Space style={{ width: "100%" }} direction={"vertical"}>
                {
                  (chats ? Object.values(chats) : []).map((chat) => {
                    return <ChatPreview key={chat.id} {...chat} />;
                  })
                }
              </Space>
            </Col>
          </Grid>
          <Grid item xs={8} height={"100%"}>{children}</Grid>
        </Grid>
      </Box>
    </Paper>
  </Box>
    ;
});

export default ChatLayout;