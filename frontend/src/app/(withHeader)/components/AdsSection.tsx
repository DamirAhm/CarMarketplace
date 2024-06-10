"use client";

import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { SearchForm } from "./SearchForm";
import { AdvertismentComponent, AdWithIncludes } from "./AdvertisementComponent";

type Props = {
  recommendations: AdWithIncludes[];
}

export const AdsSection: React.FC<Props> = ({ recommendations }) => {
  const [advertisments, setAdvertisments] = useState<AdWithIncludes[] | null>(null);

  const handleSearch = (ads: AdWithIncludes[]) => {
    setAdvertisments(ads);
  };

  return <>
    <Typography variant={"h4"} color={"black"}>Поиск</Typography>
    <SearchForm onSuccess={handleSearch} />
    <Box height={"20px"} />
    <Typography variant={"h4"} color={"black"}>
      {advertisments
        ?
        `Найдено ${advertisments.length} предложений`

        : `Рекомендации`
      }
    </Typography>
    <Box height={"20px"} />
    <Grid container rowGap={"20px"}>
      {(advertisments || recommendations)?.map(ad =>
        <Grid key={ad.id} xs={3} item><AdvertismentComponent key={ad.id} {...ad} /></Grid>
      )}
    </Grid>
  </>;
};