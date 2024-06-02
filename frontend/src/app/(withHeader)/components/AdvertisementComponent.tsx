"use client";

import { Advertisment, Car, Favorite, View } from "@prisma/client";
import React from "react";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import { UserWithAvatar } from "../../../atoms/user.atom";
import { Button, Col, Row } from "antd";
import { getImageUrl } from "../../../utils/getImageUrl";
import { ActionButtons } from "../advertisements/[advertisementId]/components/ActionButtons";

export type AdWithIncludes = Advertisment & {
  imageIds: string[],
  car: Car,
  views: View[],
  favorites: Favorite[]
  creator: UserWithAvatar;
};

export const AdvertismentComponent: React.FC<AdWithIncludes & {
  // eslint-disable-next-line no-unused-vars
  onDelete?: (id: string) => void,
  // eslint-disable-next-line no-unused-vars
  onChangeFavorite?: (id: string, isFavorite: boolean) => void
}> = ({
        car: { model, brand },
        imageIds,
        description,
        cost,
        currency,
        onDelete,
        onChangeFavorite,
        id,
        favorites,
        userId
      }) => {

  const handleChangeFavorite = (isFavorite: boolean) => {
    onChangeFavorite?.(id, isFavorite);
  };

  return <Card sx={{ margin: "10px", height: "100%" }}>
    <Link style={{ height: "100%" }} href={`/advertisements/${id}`}>
      <CardActionArea style={{
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
        flexDirection: "column"
      }}>
        <CardMedia
          component={"img"}
          image={getImageUrl(imageIds[0])}
          height="200"
        />
      </CardActionArea>
    </Link>
    <CardContent style={{ width: "100%", paddingBottom: "0" }}>
      <Col>

        <Row align={"bottom"} justify={"space-between"}>
          <Typography gutterBottom variant="h5" component="div">
            {brand} {model}
          </Typography>

          <ActionButtons creatorId={userId} favorites={favorites} advertisementId={id}
                         onChangeFavorite={handleChangeFavorite} compact />
        </Row>
        <Typography gutterBottom variant="body2" color="gray">
          {description}
        </Typography>
        <Box height={"10px"} />
        <Typography variant="body1" style={{ color: "#33bb33" }} gutterBottom component="span">
          {cost} {currency}
        </Typography>
        <Box height={"10px"} />
        {onDelete &&
          <Button onClick={() => onDelete(id)} size={"middle"} type={"primary"} danger>Удалить</Button>}
      </Col>
    </CardContent>
  </Card>;
};