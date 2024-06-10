"use client";

import { Box, Grid, Paper, Typography } from "@mui/material";
import { AdvertismentComponent, AdWithIncludes } from "../../../components/AdvertisementComponent";
import React, { useEffect, useState } from "react";
import { getFavorites } from "./api/getFavorites";
import { reatomComponent } from "@reatom/npm-react";
import { userAtom } from "../../../../../atoms/user.atom";
import { Flex } from "antd";
import Empty from "antd/es/empty/empty";

const FavoritesPage = reatomComponent(({ ctx }) => {
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
            <Grid container rowGap={"20px"}>
              {(ads)?.map(ad =>
                <Grid key={ad.id} xs={3} item><AdvertismentComponent onChangeFavorite={onChangeFavorite}
                                                                     key={ad.id} {...ad} /></Grid>
              )}
            </Grid>
          </>
          : <Flex vertical align={"center"} justify={"center"}>
            <Typography gutterBottom variant={"h4"} color={"black"}>К сожалению вам пока ничего не
              понравилось</Typography>
            <Box height={"40px"} />
            <Empty />
          </Flex>
        }
      </Box>
    </Paper>
  </Box>;
});

export default FavoritesPage;