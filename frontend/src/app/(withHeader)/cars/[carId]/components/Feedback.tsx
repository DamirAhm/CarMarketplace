import { Feedback } from "@prisma/client";
import React from "react";
import { Box, Card, CardContent, Rating, Typography } from "@mui/material";

type Props = Feedback;

export const FeedbackComponent: React.FC<Props> = ({ title, text, rating }: Props) => {
  return <Box padding={"0 10px"}>
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Rating value={rating} readOnly />
        <Box height={"20px"} />
        <Typography variant="body1">
          {text}
        </Typography>
      </CardContent>
    </Card>
  </Box>;
};