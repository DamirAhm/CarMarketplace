"use client";

import { Advertisment, Car, Favorite, View } from "@prisma/client";
import React from "react";
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import { UserWithAvatar } from "../../../atoms/user.atom";
import { FavoriteButton } from "../advertisements/[advertisementId]/components/FavoriteButton";
import { Row } from "antd";
import { getImageUrl } from "../../../utils/getImageUrl";

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
        favorites
      }) => {

  const handleChangeFavorite = (isFavorite: boolean) => {
    onChangeFavorite?.(id, isFavorite);
  };

  return <Card sx={{ height: "100%", maxWidth: 345 }}>
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
    <CardContent style={{ width: "100%" }}>
      <Row align={"bottom"} justify={"space-between"}>
        <Typography gutterBottom variant="h5" component="div">
          {brand} {model}
        </Typography>

        <FavoriteButton onChange={handleChangeFavorite} advertisementId={id} favorites={favorites || []} />
      </Row>
      <Typography gutterBottom variant="body2" color="text.secondary">
        {description}
      </Typography>
      <Typography variant="h6" color={"green"} gutterBottom component="div">
        {cost} {currency}
      </Typography>

      {onDelete &&
        <Button onClick={() => onDelete(id)} size={"small"} color={"error"}
                variant={"contained"}>Удалить</Button>}
    </CardContent>
  </Card>;
};