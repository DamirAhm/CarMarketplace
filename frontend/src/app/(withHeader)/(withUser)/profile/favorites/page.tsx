"use client";

import { Box, Grid, Paper, Typography } from "@mui/material";
import { AdvertismentComponent, AdWithIncludes } from "../../../components/AdvertisementComponent";
import React, { useEffect, useState } from "react";
import { getFavorites } from "./api/getFavorites";
import { reatomComponent } from "@reatom/npm-react";
import { userAtom } from "../../../../../atoms/user.atom";

const FavoritesPages = reatomComponent(({ ctx }) => {
  const [ads, setAds] = useState<AdWithIncludes[] | null>(null);
  const user = ctx.spy(userAtom);

  useEffect(() => {
    if (user) {
      (async () => {
        const res = await getFavorites();

        setAds(res);
      })();
    }
  }, [user]);

  const onChangeFavorite = (id: string, isFavorite: boolean) => {
    if (!isFavorite) {
      setAds(ads => ads && ads.filter((ad) => ad.id !== id));
    }
  };

  return <Box padding={"30px 0"}>
    <Paper>
      <Box padding={"40px"} style={{ minHeight: "calc(100vh - 150px)" }}>
        {ads?.length ?
          <>
            <Typography gutterBottom variant={"h4"} color={"black"}>Понравившиеся вам объявления</Typography>
            <Grid container>
              {(ads)?.map(ad =>
                <Grid key={ad.id} xs={3} item><AdvertismentComponent onChangeFavorite={onChangeFavorite}
                                                                     key={ad.id} {...ad} /></Grid>
              )}
            </Grid>
          </>
          :
          <Typography gutterBottom variant={"h4"} color={"black"}>К сожалению вам пока ничего не
            понравилось</Typography>
        }
      </Box>
    </Paper>
  </Box>;
});

export default FavoritesPages;