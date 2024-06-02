"use client";

import { reatomComponent } from "@reatom/npm-react";
import { Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import Link from "next/link";
import React from "react";
import { userAtom } from "../../../../../atoms/user.atom";

type Props = {
  creatorId: string;
}

export const ChatLink: React.FC<Props> = reatomComponent(({ ctx, creatorId }) => {
  const user = ctx.spy(userAtom);

  if (!user || creatorId === user.id) {
    return null;
  }

  return <Link href={`/chat/${creatorId}`}>
    <Button style={{ padding: "5px" }}>
      <ChatIcon style={{ color: "gray" }} />
    </Button>
  </Link>;
});