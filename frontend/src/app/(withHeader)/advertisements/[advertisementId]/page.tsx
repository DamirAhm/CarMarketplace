import { getAdvertisement } from "./api/getAdvertisement";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Button, Row } from "antd";
import { AddView } from "./components/AddView";
import { AdvertismentComponent } from "../../components/AdvertisementComponent";
import { getAdvertisments } from "../../api/getAdvertisments";
import { ActionButtons } from "./components/ActionButtons";
import { AdvertisementView } from "../../../../components/AdvertisementView";
import Link from "next/link";

export default async function AdvertismentPage({ params: { advertisementId } }: {
  params: { advertisementId: string }
}) {
  const advertisement = await getAdvertisement(advertisementId);
  const {
    id,
    favorites,
    creator: {
      id: creatorId
    },
    car: {
      id: carId,
      model, brand
    }
  } = advertisement;

  const recommendationsRes = await getAdvertisments({
    model,
    brand
  });
  const recommendations = recommendationsRes.filter(ad => ad.id !== id);

  return <>
    <AddView />
    <Box padding={"40px 0"} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Paper>
        <Box width={"1440px"} padding={"30px"}>
          <Row wrap={false}>
            <Box maxWidth={"calc(100% - 180px)"}>
              <AdvertisementView advertisement={advertisement} />
              <Box height={"20px"} />
              <Link href={`/cars/${carId}`}>
                <Button type={"primary"} size={"large"}>
                  Подробнее об автомобиле
                </Button>
              </Link>
              {recommendations.length > 0 && <>
                <Box height={"40px"} />
                <Typography gutterBottom variant="h5">
                  Также рекомендуем
                </Typography>
                <Grid container rowGap={"20px"}>
                  {(recommendations)?.map(ad =>
                    <Grid key={ad.id} xs={3} item><AdvertismentComponent key={ad.id} {...ad} /></Grid>
                  )}
                </Grid>
              </>
              }
            </Box>
            <ActionButtons creatorId={creatorId} favorites={favorites} advertisementId={advertisementId} />
          </Row>
        </Box>
      </Paper>
    </Box>
  </>;
}