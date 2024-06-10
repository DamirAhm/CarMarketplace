import { Button, Dropdown, Flex, MenuProps, Space } from "antd";
import { Avatar } from "../../../../../../components/Avatar";
import { Box, Paper, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import React from "react";
import { CommentWithIncludes } from "../../api/getCar";
import styles from "./Comment.module.css";

type Props = CommentWithIncludes & {
  onDelete: (id: string) => void;
  onInitChange: (id: string) => void;
  fromMe: boolean;
};

export const Comment: React.FC<Props> = ({ id, onDelete, onInitChange, fromMe, user, createdAt, text }) => {
  const date = new Date(createdAt);

  const formatter = new Intl.DateTimeFormat("ru-ru", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  const dateStr = formatter.format(date);

  const items: MenuProps["items"] = [
    {
      label: <Button type={"link"}>Редактировать</Button>,
      onClick: () => onInitChange(id),
      key: "0"
    },
    {
      label: <Button danger type={"link"}>Удалить</Button>,
      onClick: () => onDelete(id),
      key: "1"
    }
  ];

  return <Space className={styles.comment} direction={"vertical"} key={id}>
    <Space size={"middle"}>
      <Avatar avatar={user.avatar} />
      <Typography>
        {user.login}
      </Typography>
      <Typography variant={"body2"} color={"gray"}>
        {dateStr}
      </Typography>
    </Space>
    <Flex align={"center"}>
      <Paper sx={{ background: "#ddddff", width: "fit-content" }}>
        <Box minWidth={"100px"} maxWidth={"400px"} padding={"5px 10px"}>
          {text}
        </Box>
      </Paper>
      {fromMe &&
        <Dropdown trigger={"click" as any} className={styles.more} menu={{ items }}>
          <MoreVert style={{ cursor: "pointer" }} />
        </Dropdown>
      }
    </Flex>
  </Space>;
};