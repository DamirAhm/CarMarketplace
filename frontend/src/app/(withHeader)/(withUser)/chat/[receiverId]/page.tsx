"use client";

import React, { useEffect, useRef, useState } from "react";
import { reatomComponent } from "@reatom/npm-react";
import { userAtom } from "../../../../../atoms/user.atom";
import { getMessages } from "./api/getMessages";
import { MessageWithIncludes } from "../api/getChats";
import { Box, Typography } from "@mui/material";
import { Message } from "./components/Message/Message";
import { Button, Col, Flex, Input, InputProps, InputRef, Row } from "antd";
import Compact from "antd/es/space/Compact";
import { SendOutlined } from "@ant-design/icons";
import Empty from "antd/es/empty/empty";
import { deleteMessage } from "./api/deleteMessage";
import { editMessage } from "./api/editMessage";
import { io } from "socket.io-client";
import { sendMessage } from "./api/sendMessage";
import { ISendMessageWebsocket } from "../../../../../../../common/interfaces/messages/SendMessageWebsocket.interface";
import { IEditMessageWebsocket } from "../../../../../../../common/interfaces/messages/EditMessageWebsocket.interface";
import {
  IDeleteMessageWebsocket
} from "../../../../../../../common/interfaces/messages/DeleteMessageWebsocket.interface";

const ChatPage: React.FC<{ params: Record<string, string> }> = reatomComponent(({ ctx, params: { receiverId } }) => {
  const [messages, setMessages] = useState<MessageWithIncludes[]>([]);
  const [socket] = useState(() => io("ws://localhost:3000"));
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      console.log("Connected");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessage = ({ newMessage, to }: ISendMessageWebsocket) => {
      if (to === receiverId) {
        setMessages(prev => [...prev, newMessage]);
      }
    };

    const onEdit = ({ changedMessage, to }: IEditMessageWebsocket) => {
      if (to === receiverId) {
        setMessages(prev => prev.map(m => m.id === changedMessage.id ? changedMessage : m));
      }
    };

    const onDelete = ({ id, to }: IDeleteMessageWebsocket) => {
      if (to === receiverId) {
        setMessages(prev => prev.filter(m => m.id !== id));
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("edit", onEdit);
    socket.on("delete", onDelete);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.off("delete", onDelete);
      socket.off("edit", onEdit);
    };
  }, [receiverId, socket]);

  const [messageInput, setMessageInput] = useState("");
  const [messageToChange, setMessageToChange] = useState<MessageWithIncludes | null>(null);

  const inputRef = useRef<InputRef>(null);

  const user = ctx.spy(userAtom);

  useEffect(() => {
    if (user && isConnected) {
      socket.emit("join", { userId: user.id });
    }
  }, [user, socket, isConnected]);

  const handleMessage: InputProps["onChange"] = (e) => {
    if (messageToChange) {
      setMessageToChange({
        ...messageToChange,
        message: e.target.value
      });

      return;
    }

    setMessageInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (messageInput.length === 0 && !messageToChange?.message.length) {
      return;
    }

    if (messageToChange) {
      await editMessage(messageToChange.id, messageToChange.message);

      setMessages((prev) => prev.map(m => m.id === messageToChange.id ? messageToChange : m));
      setMessageToChange(null);
      socket.emit("edit", {
        to: receiverId,
        changedMessage: messageToChange
      });
      return;
    }

    const newMessage = await sendMessage(messageInput, receiverId);
    setMessages((prev) => prev.concat([newMessage]));
    setMessageInput("");
    socket.emit("message", {
      to: receiverId,
      newMessage
    });
  };

  const handleDelete = async (id: string) => {
    await deleteMessage(id);

    setMessages((prev) => prev.filter((mes) => mes.id !== id));
    socket.emit("delete", {
      to: receiverId,
      id
    });
  };

  const handleInitChange = (id: string) => {
    const message = messages.find((mes) => mes.id === id);

    if (!message) {
      return;
    }

    inputRef.current?.focus();
    setMessageToChange(message);
  };

  useEffect(() => {
    const handleExit = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMessageToChange(null);
      }
    };

    window.addEventListener("keydown", handleExit);

    return () => window.removeEventListener("keydown", handleExit);
  }, []);

  useEffect(() => {
    if (user) {
      (async () => {
        const messages = await getMessages(receiverId);

        setMessages(messages);
      })();
    }
  }, [receiverId, user]);

  return <Box height={"100%"} padding={"40px"}>
    <Col style={{ height: "100%", overflow: "auto" }}>
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
        messages?.map((message) => {
          return <Message
            key={message.id}
            id={message.id}
            fromMe={message.senderId === user?.id}
            createdAt={message.createdAt}
            onDelete={handleDelete}
            onInitChange={handleInitChange}
          >
            {message.message}
          </Message>;
        })
      }
    </Col>
    <Row>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Compact style={{ width: "100%" }}>
          <Input ref={inputRef} value={messageToChange?.message ?? messageInput} onChange={handleMessage} size={"large"}
                 placeholder="Введите свое сообщение" />
          <Button disabled={messageInput.length === 0 && !messageToChange} size={"large"} onClick={handleSubmit}
                  type="primary"><SendOutlined /></Button>
        </Compact>
      </form>
    </Row>
  </Box>;
});

export default ChatPage;