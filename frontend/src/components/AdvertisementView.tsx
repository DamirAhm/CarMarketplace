import { Col, Row, Space, Tooltip } from "antd";
import { Box, Typography } from "@mui/material";
import { ChatLink } from "../app/(withHeader)/advertisements/[advertisementId]/components/ChatLink";
import { ImageGroup } from "./ImageGroup/ImageGroup";
import { AdWithIncludes } from "../app/(withHeader)/components/AdvertisementComponent";
import React from "react";
import {
  AccessTimeOutlined,
  CalendarMonth,
  CheckCircleOutline,
  LocalGasStation,
  TimeToLeave
} from "@mui/icons-material";
import Paragraph from "antd/es/typography/Paragraph";
import { Avatar } from "./Avatar";
import Statistic from "antd/es/statistic/Statistic";
import { TransmissionIcon } from "./TransmissionIcon";
import { EngineIcon } from "./EngineIcon";
import { AdvertisementStatus } from "../../../common/constants/AdvertisementStatus";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

type Props = {
  advertisement: AdWithIncludes
}

const titleMap: Record<AdvertisementStatus, string> = {
  [AdvertisementStatus.Pending]: "Объявление еще проверяется",
  [AdvertisementStatus.Approved]: "Объявление подтверждено",
  [AdvertisementStatus.Rejected]: "Объявление было отклонено"
};

const iconMap: Record<AdvertisementStatus, React.ReactNode> = {
  [AdvertisementStatus.Pending]: <AccessTimeOutlined color={"warning"} />,
  [AdvertisementStatus.Approved]: <CheckCircleOutline color={"success"} />,
  [AdvertisementStatus.Rejected]: <CancelOutlinedIcon color={"error"} />
};

export const AdvertisementView: React.FC<Props> = ({ advertisement }) => {
  const {
    id,
    imageIds,
    cost,
    currency,
    views,
    description,
    status,
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
  } = advertisement;

  const allViews = views.length;
  const todayViews = views.filter(({ createdAt }) => new Date(createdAt).getDate() === new Date().getDate()).length;

  return (
    <>
      <Col>
        <Row align={"middle"}>
          <Typography component={"span"} variant={"h4"}>
            {brand} {model} —
          </Typography>
          <Box width={"20px"} />
          <Typography component={"span"} variant={"h5"}>
            {cost} {currency}
          </Typography>
          <Box width={"20px"} />
          <Typography component={"span"} variant={"body1"} color={"gray"}>
            {allViews} просмотров ({todayViews} сегодня)
          </Typography>
          <Box width={"20px"} />
          <Tooltip
            title={titleMap[status as AdvertisementStatus]}
          >
            {iconMap[status as AdvertisementStatus]}
          </Tooltip>
        </Row>
        <Paragraph type={"secondary"} copyable={{ text: id }} color={"#ccc"}>
          id: {id}
        </Paragraph>
      </Col>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Avatar avatar={avatar} />
        <Box width={"20px"} />
        <Typography variant={"h6"} color={"gray"}>
          {login}
          <Typography variant={"body1"} color={"gray"}>
            {phoneNumber}
          </Typography>
        </Typography>
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
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              component={"div"}
              gutterBottom
              variant="body1"
            >
              <LocalGasStation style={{ fontSize: "48px" }} />{" "}
              <Box width={"8px"} />{" "}
              <Statistic title="Топливо" value={engineType} />
            </Typography>
            <Typography
              component={"div"}
              sx={{ display: "flex", alignItems: "center" }}
              gutterBottom
              variant="body1"
            >
              <TransmissionIcon />
              <Box width={"8px"} />
              <Statistic title="Коробка передач" value={transmission} />
            </Typography>
            <Typography
              component={"div"}
              sx={{ display: "flex", alignItems: "center" }}
              gutterBottom
              variant="body1"
            >
              <CalendarMonth style={{ fontSize: "48px" }} />
              <Box width={"8px"} />
              <Statistic groupSeparator={""} title="Год выпуска" value={year} />
            </Typography>
            {engineVolume && (
              <Typography
                component={"div"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <EngineIcon /> <Box width={"8px"} />{" "}
                <Statistic title="Объем двигателя" value={engineVolume} />
              </Typography>
            )}
            {body && (
              <Typography
                component={"div"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <TimeToLeave style={{ fontSize: "48px" }} />
                <Box width={"8px"} />
                <Statistic title="Кузов" value={body} />
              </Typography>
            )}
          </Space>
        </Col>
        <Col>
          <Typography gutterBottom variant="h5">
            Описание
          </Typography>
          <Box height={"20px"} />
          <Typography
            style={{
              wordBreak: "break-word",
              width: "100%",
              maxWidth: "650px"
            }}
            gutterBottom
            variant="h6"
          >
            {description}
          </Typography>
        </Col>
      </Row>
    </>
  );
};
