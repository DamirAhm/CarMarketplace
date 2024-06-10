"use client";

import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { approveAdvertisement } from "./api/approveAdvertisement";

type Props = {
  advertisementId: string;
}

export const ApproveButton: React.FC<Props> = ({ advertisementId }) => {
  const router = useRouter();

  const handleApprove = async () => {
    await approveAdvertisement(advertisementId);
    router.push("/advertisements/approve");
  };

  return <Button onClick={handleApprove} type={"primary"} size={"large"}>Подтверить</Button>;
};