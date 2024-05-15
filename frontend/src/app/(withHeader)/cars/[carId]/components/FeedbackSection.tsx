"use client";

import { CreateFeedbackButton } from "./CreateFeedbackButton";
import { Box, Grid } from "@mui/material";
import { FeedbackComponent } from "./Feedback";
import React, { useState } from "react";
import { CarWithImages } from "../api/getCar";

type Props = {
  carId: string;
  initialFeedbacks: CarWithImages["feedbacks"];
}

export const FeedbackSection: React.FC<Props> = ({ carId, initialFeedbacks }) => {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);

  return <>
    <CreateFeedbackButton setFeedbacks={setFeedbacks} carId={carId} />
    <Box height={"30px"} />
    <Grid container width={"100%"}>
      {feedbacks.map((feedback) =>
        <Grid item xs={4} key={feedback.id}>
          <FeedbackComponent {...feedback} />
        </Grid>)
      }
    </Grid>
  </>;
};