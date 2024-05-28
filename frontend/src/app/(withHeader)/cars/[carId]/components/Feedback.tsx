"use client";

import React, { useState } from "react";
import { Box, Button, Card, CardContent, Rating, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { FeedbackWithIncludes } from "../api/getCar";
import { useAtom } from "@reatom/npm-react";
import { userAtom } from "../../../../../atoms/user.atom";
import { Opinion } from "../../../../../../../common/types/Opinion";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { createReaction } from "./api/createReaction";
import { Reaction } from "@prisma/client";

type Props = FeedbackWithIncludes;

export const FeedbackComponent: React.FC<Props> = ({ id, title, text, rating, reactions: init }: Props) => {
  const [user] = useAtom(userAtom);

  const [reactions, setReactions] = useState(init);

  const isLiked = !!reactions?.find(({
                                       userId,
                                       opinion
                                     }) => userId === user?.id && opinion === Opinion.Positive);
  const isDisliked = !!reactions?.find(({
                                          userId,
                                          opinion
                                        }) => userId === user?.id && opinion === Opinion.Negative);

  const like = async () => {
    if (!isLiked) {
      await createReaction(id, Opinion.Positive);
      setReactions((prev) => prev.filter(({ userId }) => userId !== user!.id).concat([{
        userId: user!.id,
        opinion: Opinion.Positive
      } as Reaction]));
    }
  };

  const dislike = async () => {
    if (!isDisliked) {
      await createReaction(id, Opinion.Negative);
      setReactions((prev) => prev.filter(({ userId }) => userId !== user!.id).concat([{
        userId: user!.id,
        opinion: Opinion.Negative
      } as Reaction]));
    }
  };

  const likesCount = reactions.filter(({ opinion }) => opinion === Opinion.Positive).length;
  const dislikesCount = reactions.filter(({ opinion }) => opinion === Opinion.Negative).length;

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
        <Box height={"20px"} />
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Box>
            {likesCount}
            <Button onClick={like}>
              {isLiked
                ? <ThumbUpIcon />
                : <ThumbUpOffAltIcon />
              }
            </Button>
          </Box>
          <Box>
            {dislikesCount}
            <Button onClick={dislike}>
              {isDisliked
                ? <ThumbDownAltIcon />
                : <ThumbDownOffAltIcon />
              }
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Box>;
};