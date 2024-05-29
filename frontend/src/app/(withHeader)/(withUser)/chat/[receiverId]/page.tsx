"use client";

import React, { useEffect, useState } from "react";
import { reatomComponent } from "@reatom/npm-react";
import { userAtom } from "../../../../../atoms/user.atom";
import { getMessages } from "./api/getMessages";
import { MessageWithIncludes } from "../api/getChats";
import { Box, Typography } from "@mui/material";
import { Message } from "./components/Message";
import { Button, Col, Flex, Input, InputProps, Row } from "antd";
import Compact from "antd/es/space/Compact";
import { SendOutlined } from "@ant-design/icons";
import { sendMessage } from "./api/sendMessage";
import Empty from "antd/es/empty/empty";

const ChatPage: React.FC<{ params: Record<string, string> }> = reatomComponent(({ ctx, params: { receiverId } }) => {
  const [messages, setMessages] = useState<MessageWithIncludes[]>([]);
  const [message, setMessage] = useState("");

  const user = ctx.spy(userAtom);

  const handleMessage: InputProps["onChange"] = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.length === 0) {
      return;
    }

    const newMessage = await sendMessage(message, receiverId);
    setMessages((prev) => prev.concat([newMessage]));
    setMessage("");
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const messages = await getMessages(receiverId);

        setMessages(messages);
      })();
    }
  }, [receiverId, user]);

  return <Box height={"100%"} padding={"40px"}>
    <Col style={{ height: "100%" }}>
      {
        messages.length === 0 && <Flex style={{ height: "100%" }} vertical align={"center"} justify={"center"}>
          <Typography variant={"h6"}>
            Тут еще нет ни одного сообщения, начните первым!
          </Typography>
          <Box height={"40px"} />
          <Empty />
        </Flex>
      }
      {
        messages?.map((message, i) => {
          return <Message
            key={message.id}
            sender={message.sender}
            fromMe={message.senderId === user?.id}
            firstOfChunk={i === 0 || messages.at(i - 1)!.senderId !== message.senderId}
            createdAt={message.createdAt}
          >
            {message.message}
          </Message>;
        })
      }
    </Col>
    <Row>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Compact style={{ width: "100%" }}>
          <Input value={message} onChange={handleMessage} size={"large"} placeholder="Введите свое сообщение" />
          <Button disabled={message.length === 0} size={"large"} onClick={handleSubmit} type="primary"><SendOutlined /></Button>
        </Compact>
      </form>
    </Row>
  </Box>;
});

export default ChatPage;