import React, { PropsWithChildren } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Button, Dropdown, MenuProps } from "antd";
import { MoreVert } from "@mui/icons-material";
import styles from "./Message.module.css";

type Props = {
  id: string;
  fromMe: boolean;
  createdAt: Date;
  onDelete: (id: string) => void;
  onInitChange: (id: string) => void;
}

export const Message: React.FC<PropsWithChildren<Props>> = ({
                                                              id,
                                                              fromMe,
                                                              createdAt,
                                                              onDelete,
                                                              onInitChange,
                                                              children
                                                            }) => {
  const date = new Date(createdAt);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const dateStr = `${hours}:${minutes}`;

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

  return <Box width={"100%"} marginBottom={"20px"}>
    <Box className={styles.message} display={"flex"} alignItems={"center"}
         flexDirection={fromMe ? "row-reverse" : "row"}>
      {fromMe &&
        <Dropdown className={styles.more} menu={{ items }}>
          <MoreVert />
        </Dropdown>
      }
      <Box width={"10px"} />
      <Paper sx={{ background: "#ddddff" }}>
        <Box minWidth={"100px"} maxWidth={"400px"} padding={"5px 10px"}>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography style={{ wordBreak: "break-word" }} variant={"subtitle1"}>
              {children}
            </Typography>
            <Box display={"flex"} alignSelf={"flex-end"}>
              <Typography style={{ verticalAlign: "bottom" }} display={"flex"} alignItems={"bottom"} variant={"body2"}
                          color={"gray"}>
                {dateStr}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  </Box>;
};