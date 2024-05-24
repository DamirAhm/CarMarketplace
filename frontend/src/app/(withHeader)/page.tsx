import { Box } from "@mui/material";
import React from "react";
import { getRecommendations } from "./api/getRecommendations";
import { AdsSection } from "./components/AdsSection";

export default async function Page() {
  const recommendations = await getRecommendations();

  return <Box padding={"30px 0"}>
    <AdsSection recommendations={recommendations} />
  </Box>;
}