"use client";

import React, { useState } from "react";
import { Button, Col, Input, InputProps, Popover } from "antd";
import { Box } from "@mui/material";
import { rejectAdvertisement } from "./api/rejectAdvertisement";
import { useRouter } from "next/navigation";

type Props = {
  advertisementId: string;
}

export const RejectButton: React.FC<Props> = ({ advertisementId }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const router = useRouter();

  const handleChangeComment: InputProps["onChange"] = (e) => {
    setComment(e.target.value);
  };
  const handleReject = async () => {
    await rejectAdvertisement(advertisementId, comment);
    router.push("/advertisements/approve");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return <Popover
    content={<Col>
      <Box height={"10px"} />
      <Input onChange={handleChangeComment} placeholder={"Опишите что не так с объявлением"} />
      <Box height={"20px"} />
      <Button onClick={handleReject}>Подтвердить</Button>
    </Col>}
    title="По какой причине вы отклоняете это объявление?"
    trigger="click"
    open={open}
    onOpenChange={handleOpenChange}
  >
    <Button type={"primary"} danger size={"large"}>Отклонить</Button>
  </Popover>;
};