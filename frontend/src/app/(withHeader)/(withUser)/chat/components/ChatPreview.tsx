import { Avatar, Button, Col, Image, Row } from "antd";
import { Box, Typography } from "@mui/material";
import { getImageUrl } from "../../../../../utils/getImageUrl";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { MessageWithIncludes } from "../api/getChats";
import { reatomComponent } from "@reatom/npm-react";
import { userAtom } from "../../../../../atoms/user.atom";

export const ChatPreview: React.FC<MessageWithIncludes> = reatomComponent(({
                                                                             ctx,
                                                                             createdAt,
                                                                             receiver,
                                                                             receiverId,
                                                                             message,
                                                                             senderId
                                                                           }) => {
  const user = ctx.spy(userAtom);
  const isLastMine = senderId === user?.id;

  const date = new Date(createdAt);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const dateStr = `${hours}:${minutes}`;

  return <Link href={`/chat/${receiverId}`}>
    <Button style={{ width: "100%", height: "fit-content" }}>
      <Box padding={"5px"}>
        <Col>
          <Row>
            <Box width={"30px"} height={"30px"}>
              {receiver.avatar
                ?
                <Image preview={false} style={{ borderRadius: "50%" }}
                       src={getImageUrl(receiver.avatar)}
                       width={30}
                       height={30} />
                : <Avatar size={{ xs: 30 }} style={{ borderRadius: "50%" }} icon={<UserOutlined />} />
              }
            </Box>
            <Box width={"20px"} />
            <Typography variant={"h6"} color={"gray"}>{receiver.login}</Typography>
          </Row>
          <Box height={"10px"} />
          <Row justify={"space-between"} align={"middle"}>
            <Typography
              style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "calc(100% - 6rem)" }}
              variant={"body1"}
              color={"gray"}>
              {isLastMine && <>Вы:</>} {message}
            </Typography>
            <Typography variant={"body2"} color={"darkgray"}>{dateStr}</Typography>
          </Row>
        </Col>
      </Box>
    </Button>
  </Link>;
});