import { Avatar as AntdAvatar, Flex, Image } from "antd";
import { getImageUrl } from "../utils/getImageUrl";
import { UserOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import React from "react";
import { SUPPORT_AVATAR } from "../../../common/constants/ServiceUser";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

type Props = {
  avatar?: string
}

export const Avatar: React.FC<Props> = ({ avatar }) => {
  return <Box width={"30px"} height={"30px"}>
    {avatar
      ? <>
        {avatar === SUPPORT_AVATAR
          ? <Flex style={{ height: "100%" }} align={"center"} justify={"center"}>
            <SupportAgentIcon />
          </Flex>
          : <Image preview={false} style={{ borderRadius: "50%" }}
                   src={getImageUrl(avatar)}
                   width={30}
                   height={30} />
        }
      </>
      : <AntdAvatar size={{ xs: 30 }} style={{ borderRadius: "50%" }} icon={<UserOutlined />} />
    }
  </Box>;
};