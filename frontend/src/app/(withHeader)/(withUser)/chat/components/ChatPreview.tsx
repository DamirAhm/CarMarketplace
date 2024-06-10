import { Button, Col, Row } from "antd";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { MessageWithIncludes } from "../api/getChats";
import { reatomComponent } from "@reatom/npm-react";
import { userAtom } from "../../../../../atoms/user.atom";
import { Avatar } from "../../../../../components/Avatar";
import { ADMIN_AVATAR, ADMIN_USER_ID } from "../../../../../../../common/constants/ServiceUser";

type Props = Omit<MessageWithIncludes, "createdAt"> & {
  createdAt: Date | null;
}

export const ChatPreview: React.FC<Props> = reatomComponent(({
                                                               ctx,
                                                               createdAt,
                                                               receiver,
                                                               receiverId,
                                                               message,
                                                               senderId
                                                             }) => {
  const user = ctx.spy(userAtom);
  const isLastMine = senderId === user?.id;

  const date = createdAt && new Date(createdAt);

  const hours = date?.getHours().toString().padStart(2, "0");
  const minutes = date?.getMinutes().toString().padStart(2, "0");

  const dateStr = createdAt ? `${hours}:${minutes}` : "";

  return <Link href={`/chat/${receiverId}`}>
    <Button style={{ width: "100%", height: "fit-content" }}>
      <Box padding={"5px"}>
        <Col>
          <Row>
            <Avatar avatar={receiver.id === ADMIN_USER_ID ? ADMIN_AVATAR : receiver?.avatar} />
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