import { getCar } from "./api/getCar";
import { Box, Container, ImageList, ImageListItem, Paper, Typography } from "@mui/material";
import { Image } from "../../../../components/Image";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { FeedbackSection } from "./components/FeedbackSection";

export default async function CarPage({ params: { carId } }: { params: { carId: string } }) {
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
  } = await getCar(carId);

  const rating = feedbacks.length ? feedbacks.reduce((acc, c) => acc + c.rating, 0) / feedbacks.length : null;

  return <Container maxWidth={"xl"}>
    <Box padding={"40px 0"} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Paper>
        <Box width={"1440px"} padding={"30px"}>
          <ImageList sx={{ width: "100%", height: 500 }} cols={3} rowHeight={500}>
            {images.map((item) => (
              <ImageListItem key={item}>
                <Image size={480} id={item} />
              </ImageListItem>
            ))}
          </ImageList>
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
          <Typography gutterBottom variant="h6">
            Сейчас на сайте {advertisements} объявлений о продаже такой машины
          </Typography>
          <Box height={"30px"} />
          <FeedbackSection carId={carId} initialFeedbacks={feedbacks} />
        </Box>
      </Paper>
    </Box>
  </Container>;
}