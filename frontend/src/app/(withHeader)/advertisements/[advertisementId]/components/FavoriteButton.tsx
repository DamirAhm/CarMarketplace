"use client";

import { reatomComponent } from "@reatom/npm-react";
import { Button, ButtonProps } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { Favorite } from "@prisma/client";
import { userAtom } from "../../../../../atoms/user.atom";
import { changeFavorite } from "./api/changeFavorite";

type Props = {
  advertisementId: string;
  favorites: Favorite[];
  // eslint-disable-next-line
  onChange?: (isFavorite: boolean) => void;
}

export const FavoriteButton: React.FC<Props> = reatomComponent(({ ctx, onChange, favorites, advertisementId }) => {
  const user = ctx.spy(userAtom);


  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick: ButtonProps["onClick"] = async (e) => {
    e.stopPropagation();

    setIsFavorite(!isFavorite);
    onChange?.(!isFavorite);
    await changeFavorite(advertisementId, !isFavorite);
  };

  useEffect(() => {
    const isFavoriteByDefault = !!favorites?.find(({ userId }) => userId === user?.id);

    setIsFavorite(isFavoriteByDefault);
  }, [user, favorites]);


  return <Button style={{ height: "50px" }} size={"large"} onClick={handleClick}>
    {
      isFavorite ? <FavoriteIcon fontSize={"large"} color={"error"} /> :
        <FavoriteBorderIcon fontSize={"large"} color={"error"} />
    }
  </Button>;
});