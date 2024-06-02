import { getAdvertisement } from "./api/getAdvertisement";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Avatar, Button, Col, Image, Row, Space, Statistic } from "antd";
import { AddView } from "./components/AddView";
import { UserOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import { getImageUrl } from "../../../../utils/getImageUrl";
import { ImageGroup } from "../../../../components/ImageGroup/ImageGroup";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { TransmissionIcon } from "./components/TransmissionIcon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import { EngineIcon } from "./components/EngineIcon";
import Link from "next/link";
import { AdvertismentComponent } from "../../components/AdvertisementComponent";
import { getAdvertisments } from "../../api/getAdvertisments";
import { ChatLink } from "./components/ChatLink";
import { ActionButtons } from "./components/ActionButtons";

export default async function AdvertismentPage({ params: { advertisementId } }: {
  params: { advertisementId: string }
}) {
  const {
    id,
    imageIds,
    cost,
    currency,
    views,
    favorites,
    description,
    creator: {
      id: creatorId,
      login,
      phoneNumber,
      avatar
    },
    car: {
      id: carId,
      model, brand,
      body,
      engineType,
      engineVolume,
      year,
      transmission
    }
  } = await getAdvertisement(advertisementId);

  const recommendationsRes = await getAdvertisments({
    model,
    brand
  });
  const recommendations = recommendationsRes.filter(ad => ad.id !== id);

  const allViews = views.length;
  const todayViews = views.filter(({ createdAt }) => new Date(createdAt).getDate() === new Date().getDate()).length;

  return <>
    <AddView />
    <Box padding={"40px 0"} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Paper>
        <Box width={"1440px"} padding={"30px"}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography component={"span"} variant={"h4"}>{brand} {model} —</Typography>
              <Typography component={"span"}
                          variant={"h5"}>&nbsp;&nbsp;&nbsp;{cost} {currency}&nbsp;&nbsp;&nbsp;</Typography>
              <Typography component={"span"} variant={"body1"}
                          color={"gray"}>{allViews} просмотров
                ({todayViews} сегодня)&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
              <Paragraph type={"secondary"} copyable color={"#ccc"}>id: {id}</Paragraph>
            </Box>
            <ActionButtons creatorId={creatorId} favorites={favorites} advertisementId={advertisementId} />
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Box width={"30px"} height={"30px"}>
              {avatar
                ? <Image src={getImageUrl(avatar)} width={30} height={30} />
                : <Avatar size={{ xs: 30 }} icon={<UserOutlined />} />
              }
            </Box>
            <Box width={"20px"} />
            <Typography variant={"h6"} color={"gray"}>{login}&nbsp;&nbsp;&nbsp;{phoneNumber}</Typography>
            <Box width={"10px"} />
            <ChatLink creatorId={creatorId} />
          </Box>
          <Box height={"20px"} />
          <ImageGroup images={imageIds} />
          <Box height={"20px"} />
          <Row wrap={false} style={{ width: "100%" }}>
            <Col style={{ width: "300px" }}>
              <Typography gutterBottom variant="h5">
                Характеристики
              </Typography>
              <Box height={"20px"} />
              <Space direction={"vertical"}>
                <Typography sx={{ display: "flex", alignItems: "center" }} component={"div"} gutterBottom
                            variant="body1">
                  <LocalGasStationIcon style={{ fontSize: "48px" }} /> <Box width={"8px"} /> <Statistic title="Топливо"
                                                                                                        value={engineType} />
                </Typography>
                <Typography component={"div"} sx={{ display: "flex", alignItems: "center" }} gutterBottom
                            variant="body1">
                  <TransmissionIcon />
                  <Box width={"8px"} />
                  <Statistic title="Коробка передач" value={transmission} />
                </Typography>
                <Typography component={"div"} sx={{ display: "flex", alignItems: "center" }} gutterBottom
                            variant="body1">
                  <CalendarMonthIcon style={{ fontSize: "48px" }} /><Box width={"8px"} /><Statistic title="Год выпуска"
                                                                                                    value={year} />
                </Typography>
                {engineVolume &&
                  <Typography component={"div"} sx={{ display: "flex", alignItems: "center" }}>
                    <EngineIcon /> <Box width={"8px"} /> <Statistic title="Объем двигателя" value={engineVolume} />
                  </Typography>
                }
                {body &&
                  <Typography component={"div"} sx={{ display: "flex", alignItems: "center" }}>
                    <TimeToLeaveIcon style={{ fontSize: "48px" }} /> <Box width={"8px"} />
                    <Statistic title="Кузов" value={body} />
                  </Typography>}
                <Box height={"20px"} />
                <Link href={`/cars/${carId}`}>
                  <Button type={"primary"} size={"large"}>
                    Подробнее об автомобиле
                  </Button>
                </Link>
              </Space>
            </Col>
            <Col>
              <Typography gutterBottom variant="h5">
                Описание
              </Typography>
              <Box height={"20px"} />
              <Typography style={{ wordBreak: "break-word", width: "100%", maxWidth: "650px" }} gutterBottom
                          variant="h6">
                {description}
                {description}
                {description}
                {description}
                {description}
                {description}
                {description}
              </Typography>
            </Col>
          </Row>
          <Box height={"40px"} />
          {recommendations.length > 0 && <>
            <Typography gutterBottom variant="h5">
              Также рекомендуем
            </Typography>
            <Grid container>
              {(recommendations)?.map(ad =>
                <Grid key={ad.id} xs={3} item><AdvertismentComponent key={ad.id} {...ad} /></Grid>
              )}
            </Grid>
          </>
          }
        </Box>
      </Paper>
    </Box>
  </>;
}