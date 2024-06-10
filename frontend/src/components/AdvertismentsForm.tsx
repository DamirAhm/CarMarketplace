"use client";

import { Box, Grid, Typography } from "@mui/material";
import { SelectField } from "./form/SelectField";
import { Bodies, Brands, EngineTypes, Transmissions } from "../../../common/constants/CarFeatures";
import { InputField } from "./form/InputField";
import { Currencies, ICreateAdvertisment } from "../../../common/interfaces/advertisments/createAdvertisment.interface";
import { ImageField } from "./form/ImageField";
import { FormProvider, useForm } from "react-hook-form";
import React from "react";
import { Button, Row } from "antd";
import { ImageGroup } from "./ImageGroup/ImageGroup";

type Props = {
  defaultValues?: ICreateAdvertisment;
  onSubmit: (data: ICreateAdvertisment) => void;
  onDecline?: () => void;
  submitText?: string;
}

const currentYear = new Date().getFullYear();
const Years = Array.from({ length: 50 }, (_, i) => currentYear - i).map((value) => ({
  value,
  title: String(value)
}));

export const AdvertismentsForm: React.FC<Props> = ({
                                                     submitText,
                                                     defaultValues,
                                                     onDecline,
                                                     onSubmit
                                                   }) => {
  const methods = useForm<ICreateAdvertisment>({
    defaultValues
  });

  const images = methods.watch("imageIds");

  const handleSubmit = methods.handleSubmit(async (data) => {
    onSubmit(data);
  });

  const handleDeleteImage = (id: string) => {
    methods.setValue("imageIds", images?.filter(im => im !== id));
  };

  const models = ["1111 Ока", "2101", "2102", "2103", "2104", "2105", "2106", "2107", "2108", "2109", "21099", "2110", "2111", "2112", "2113", "2114", "2115", "2120 Надежда", "2121 (4x4)", "2131 (4x4)", "Granta", "Kalina", "Largus", "Niva", "Niva Legend", "Priora", "Vesta", "XRAY"];

  return <FormProvider {...methods}>
    <form onSubmit={handleSubmit}>
      <Box gap={"10px"} display={"flex"} flexDirection={"column"} padding={"20px"}>
        <Typography variant={"h6"} color={"black"}>Заполните информацию о выставляемой
          машине</Typography>
        <SelectField name={"brand"} label={"Марка *"} options={Brands} required />
        <SelectField name={"model"} label={"Модель"} options={models} required />
        <Box height={"10px"} />
        <Typography variant={"h6"} color={"black"}>Характеристики</Typography>
        <SelectField required name={"year"} label={"Год выпуска *"} options={Years} />
        <SelectField required name={"engineType"} label={"Двигатель *"} options={EngineTypes} />
        <SelectField required name={"transmission"} label={"Коробка передач *"}
                     options={Transmissions} />
        <SelectField name={"body"} label={"Кузов"} options={Bodies} />
        <InputField name={"engineVolume"} label={"Объем двигателя"} type={"number"} />
        <InputField name={"mileage"} label={"Пробег"} type={"number"} />
        <Box height={"10px"} />
        <Typography variant={"h6"} color={"black"}>Цена</Typography>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <InputField required fullWidth name={"cost"} label={"Сумма"} type={"number"} />
          </Grid>
          <Grid item xs={2}>
            <SelectField required fullWidth defaultValue={Currencies.RUB} name={"currency"}
                         label={"Валюта"}
                         options={Object.values(Currencies)} />
          </Grid>
        </Grid>
        <Box height={"10px"} />
        <Typography variant={"h6"} color={"black"}>Информация о машине</Typography>
        <Box height={"10px"} />
        <InputField multiline name={"description"} label={"Описание"}
                    placeholder={"Кратко опишите свою машину"} />
        <Typography variant={"h6"} color={"black"}>Фотографии</Typography>
        <ImageGroup onDelete={handleDeleteImage} images={images || []} />
        <ImageField display={false} name={"imageIds"} />
        <Box height={"10px"} />
        <Row>
          <Button onClick={handleSubmit} type={"primary"} size={"large"}>{submitText ?? "Создать"}</Button>
          <Button type={"text"} danger size={"large"} onClick={onDecline}>Отмена</Button>
        </Row>
      </Box>
    </form>
  </FormProvider>;
};