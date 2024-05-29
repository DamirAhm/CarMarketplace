import { UserWithAvatar } from "../../../../../../atoms/user.atom";
import React, { PropsWithChildren } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Avatar, Image } from "antd";
import { getImageUrl } from "../../../../../../utils/getImageUrl";
import { UserOutlined } from "@ant-design/icons";

type Props = {
  fromMe: boolean;
  firstOfChunk: boolean;
  sender: UserWithAvatar;
  createdAt: Date;
}

export const Message: React.FC<PropsWithChildren<Props>> = ({
                                                              fromMe,
                                                              firstOfChunk,
                                                              sender,
                                                              createdAt,
                                                              children
                                                            }) => {
  const date = new Date(createdAt);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const dateStr = `${hours}:${minutes}`;
  return <Box width={"100%"} marginBottom={"20px"}>
    {firstOfChunk && <>
      <Box display={"flex"} flexDirection={fromMe ? "row-reverse" : "row"}>
        <Box width={"30px"} height={"30px"}>
          {sender.avatar
            ?
            <Image preview={false} style={{ borderRadius: "50%" }}
                   src={getImageUrl(sender.avatar)}
                   width={30}
                   height={30} />
            : <Avatar size={{ xs: 30 }} style={{ borderRadius: "50%" }} icon={<UserOutlined />} />
          }
        </Box>
        <Box width={"20px"} />
        <Typography variant={"h6"} color={"gray"}>{sender.login}</Typography>
      </Box>
      <Box height={"20px"} />
    </>
    }
    <Box display={"flex"} flexDirection={fromMe ? "row-reverse" : "row"}>
      <Box width={"30px"} />
      <Paper>
        <Box minWidth={"100px"} maxWidth={"400px"} padding={"5px 10px"}>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography style={{ wordBreak: "break-all" }} variant={"subtitle1"}>
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