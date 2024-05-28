"use client";

import { reatomComponent } from "@reatom/npm-react";
import { userAtom } from "../../../../../atoms/user.atom";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { addView } from "../api/addView";

export const AddView = reatomComponent(({ ctx }) => {
  const user = ctx.spy(userAtom);
  const { advertisementId } = useParams<{ advertisementId: string }>();

  useEffect(() => {
    try {
      addView(advertisementId);
    } catch { /* empty */
    }
  }, [user, advertisementId]);

  return null;
});