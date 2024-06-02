import { Box, Paper, Typography } from "@mui/material";
import { getAdvertisement } from "../../../../advertisements/[advertisementId]/api/getAdvertisement";
import { EditForm } from "./components/EditForm";
import {
  ICreateAdvertisment
} from "../../../../../../../../common/interfaces/advertisments/createAdvertisment.interface";

export default async function CreateAdvertisementsPage({ params }: { params: Record<string, string> }) {
  const { advertisementId } = params;
  const { car, ...advertisement } = await getAdvertisement(advertisementId);

  return <Box padding={"30px 0"}>
    <Typography variant={"h4"} color={"black"}>Изменить объявление</Typography>
    <Box height={"20px"} />
    <Paper>
      <EditForm defaultValues={{ ...advertisement, ...car } as ICreateAdvertisment} />
    </Paper>
  </Box>;
}
