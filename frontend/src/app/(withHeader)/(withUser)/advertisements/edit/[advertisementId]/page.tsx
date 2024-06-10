import { Box, Paper, Typography } from "@mui/material";
import { getAdvertisement } from "../../../../advertisements/[advertisementId]/api/getAdvertisement";
import { EditForm } from "./components/EditForm";
import { redirect } from "next/navigation";
import { getMe } from "../../../../../../api/getMe";

export default async function EditAdvertisementsPage({ params }: { params: Record<string, string> }) {
  const { advertisementId } = params;
  const advertisement = await getAdvertisement(advertisementId).catch(() => null);

  console.log(await getMe());

  if (!advertisement) {
    redirect("/");
  }

  return <Box padding={"30px 0"}>
    <Typography variant={"h4"} color={"black"}>Изменить объявление</Typography>
    <Box height={"20px"} />
    <Paper>
      <EditForm advertisement={advertisement} />
    </Paper>
  </Box>;
}
