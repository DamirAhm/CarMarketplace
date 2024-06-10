import { getCar } from "./api/getCar";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { FeedbackSection } from "./components/FeedbackSection";
import { ImageGroup } from "../../../../components/ImageGroup/ImageGroup";
import { AdvertismentComponent } from "../../components/AdvertisementComponent";

export default async function CarPage({ params: { carId } }: { params: { carId: string } }) {
  const car = await getCar(carId);
  const {
    images,
    brand,
    model,
    body,
    engineType,
    engineVolume,
    year,
    transmission,
    feedbacks,
    advertisements
  } = car;

  const rating = feedbacks.length ? feedbacks.reduce((acc, c) => acc + c.rating, 0) / feedbacks.length : null;

  return <Container maxWidth={"xl"}>
    <Box padding={"40px 0"} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Paper>
        <Box width={"1440px"} padding={"30px"}>
          <ImageGroup images={images} />
          <Box height={"20px"} />
          <Typography gutterBottom variant="h4" display={"flex"} alignItems={"bottom"}>
            {brand} {model}&nbsp;&nbsp;<StarIcon fontSize={"large"} />&nbsp;{rating ?? "?"}
          </Typography>
          <Typography gutterBottom variant="h5">
            Характеристики
          </Typography>
          <Typography gutterBottom variant="body1">
            Бензин - {engineType} <br />
            Коробка передач - {transmission} <br />
            Год выпуска - {year} <br />
            {engineVolume &&
              <>Объем двигателя - {engineVolume} <br /></>
            }
            {body && <>Кузов - {body} <br /></>}
          </Typography>
          <Box height={"20px"} />
          <FeedbackSection carId={carId} initialFeedbacks={feedbacks} />
          <Box height={"30px"} />
          <Typography gutterBottom variant="h6">
            Сейчас на сайте {advertisements.length} объявлений о продаже такой машины
          </Typography>
          <Grid container rowGap={"20px"}>
            {advertisements.map(ad =>
              <Grid item xs={3} key={ad.id}>
                <AdvertismentComponent {...ad} car={car} />
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
    </Box>
  </Container>;
}