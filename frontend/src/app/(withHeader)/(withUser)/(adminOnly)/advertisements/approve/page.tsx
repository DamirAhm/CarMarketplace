import { Flex } from "antd";
import { Box, Typography } from "@mui/material";
import Empty from "antd/es/empty/empty";

export default function ApprovePage() {
  return <Box padding={"40px"}>
    <Flex vertical justify={"center"} align={"center"}>
      <Typography variant={"h4"}>
        Выберите объявление
      </Typography>
      <Box height={"40px"} />
      <Empty />
    </Flex>
  </Box>;
}