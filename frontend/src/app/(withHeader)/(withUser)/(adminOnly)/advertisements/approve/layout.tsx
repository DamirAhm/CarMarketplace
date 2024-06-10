import React, { PropsWithChildren } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Col, Space } from "antd";
import { getUnapproved } from "./api/getUnapproved";
import { AdvertisementPreview } from "./components/AdvertisementPreview";

const ApproveLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const unapprovedAdvertisements = await getUnapproved();

  return <Box padding={"40px 0 0 0"} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
    <Paper>
      <Box width={"1440px"} minHeight={"calc(100vh - 200px)"} padding={"30px"}>
        <Grid container height={"calc(100vh - 190px)"} gap={"70px"}>
          <Grid item xs={3}>
            <Col>
              <Typography variant={"h5"} gutterBottom>Объявления на проверку</Typography>
              <Box height={"20px"} />
              <Space style={{ width: "100%" }} direction={"vertical"}>
                {unapprovedAdvertisements.map(ad =>
                  <AdvertisementPreview key={ad.id} {...ad} />
                )}
              </Space>
            </Col>
          </Grid>
          <Grid item xs={8} height={"100%"}>{children}</Grid>
        </Grid>
      </Box>
    </Paper>
  </Box>;
};

export default ApproveLayout;