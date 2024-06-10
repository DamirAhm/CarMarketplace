"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import { InputField } from "../../../../../components/form/InputField";
import { FormProvider, useForm } from "react-hook-form";
import { ICreateFeedback } from "../../../../../../../common/interfaces/feedback/createFeedback.interface";
import { RatingField } from "../../../../../components/form/RatingField";
import { createFeedback } from "./api/createFeedback";
import { CarWithIncludes } from "../api/getCar";

type Props = {
  carId: string;
  setFeedbacks: Dispatch<SetStateAction<CarWithIncludes["feedbacks"]>>
}

export const CreateFeedbackButton: React.FC<Props> = ({ carId, setFeedbacks }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);
  const methods = useForm<ICreateFeedback>();

  const handleOpenModal = () => setModalOpened(true);
  const handleModalClose = () => setModalOpened(false);

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      const feedback = await createFeedback({
        ...data,
        carId
      });

      setFeedbacks((prev) => [...prev, feedback]);

      handleModalClose();
      methods.reset();
    } catch { /* empty */
    }
  });


  return <>
    <Button onClick={handleOpenModal} variant={"contained"}>Оставить отзыв</Button>
    <Modal
      open={modalOpened}
      onClose={handleModalClose}
    >
      <Box width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
            <Paper>
              <Box padding={"30px"}>
                <Typography variant={"h6"} color={"black"}>Опишите ваш опыт использование данной машины</Typography>
                <Box height={"30px"} />
                <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
                  <InputField name={"title"} label={"Заголовок"} />
                  <InputField minRows={5} multiline name={"text"} label={"Личный опыт"} />
                </Box>
                <Box height={"30px"} />
                <Typography gutterBottom variant={"h6"} color={"black"}>Поставьте оценку данной машине</Typography>
                <RatingField name={"rating"} label={"Оценка"} />
                <Box height="30px" />
                <Button variant={"contained"} type={"submit"}>Отправить</Button>
              </Box>
            </Paper>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  </>;
};