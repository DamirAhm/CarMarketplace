"use client";
import { Box, Paper, Typography } from "@mui/material";
import { ICreateAdvertisment } from "../../../../../../../common/interfaces/advertisments/createAdvertisment.interface";
import { createAdvertisement } from "./api/createAdvertisement";
import { useRouter } from "next/navigation";
import { AdvertismentsForm } from "../../../../../components/AdvertismentsForm";

export default function CreateAdvertisementsPage() {
  const router = useRouter();

  const onSubmit = async (data: ICreateAdvertisment) => {
    await createAdvertisement(data);
    router.push("/");
  };

  return <Box padding={"30px 0"}>
    <Typography variant={"h4"} color={"black"}>Создание объявления</Typography>
    <Box height={"20px"} />
    <Paper>
      <AdvertismentsForm onSubmit={onSubmit} />
    </Paper>
  </Box>;
}
