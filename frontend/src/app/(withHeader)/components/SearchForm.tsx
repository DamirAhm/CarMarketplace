"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Currencies } from "../../../../../common/interfaces/advertisments/createAdvertisment.interface";
import { Box, Button, Grid } from "@mui/material";
import { SelectField } from "../../../components/form/SelectField";
import { Bodies, Brands, EngineTypes, Transmissions } from "../../../../../common/constants/CarFeatures";
import { InputField } from "../../../components/form/InputField";
import React from "react";
import { ISearchAdvertisments } from "../../../../../common/interfaces/advertisments/searchAdvertisments.interface";
import { getAdvertisments } from "../api/getAdvertisments";
import { AdWithIncludes } from "./AdvertisementComponent";

const currentYear = new Date().getFullYear();
const Years = Array.from({ length: 50 }, (_, i) => currentYear - i).map((value) => ({
  value,
  title: String(value)
}));

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSuccess: (ads: AdWithIncludes[]) => void;
}

export const SearchForm: React.FC<Props> = ({ onSuccess }) => {
  const methods = useForm<ISearchAdvertisments>();
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const ads = await getAdvertisments(data);

      onSuccess(ads);
    } catch {
    }
  });

  return <FormProvider {...methods}>
    <form onSubmit={onSubmit}>
      <Box gap={"10px"} display={"flex"} flexDirection={"column"} padding={"20px"}>
        <Grid container spacing={2} width={"100%"}>
          <Grid item xs={3}>
            <SelectField fullWidth name={"brand"} label={"Марка"} options={Brands} />
          </Grid>
          <Grid item xs={3}>
            <InputField fullWidth name={"model"} label={"Модель"} />
          </Grid>
          <Grid item xs={3}>
            <SelectField name={"year"} label={"Год выпуска от"} options={Years} />
          </Grid>
          <Grid item xs={3}>
            <SelectField name={"yearTo"} label={"до"} options={Years} />
          </Grid>
        </Grid>
        <Grid container spacing={2} width={"100%"}>
          <Grid item xs={4}>
            <SelectField name={"body"} label={"Кузов"} options={Bodies} />
          </Grid>
          <Grid item xs={4}>
            <SelectField name={"engineType"} label={"Двигатель"} options={EngineTypes} />
          </Grid>
          <Grid item xs={4}>
            <SelectField name={"transmission"} label={"Коробка передач"} options={Transmissions} />
          </Grid>
        </Grid>
        <Grid container spacing={2} width={"100%"}>
          <Grid item xs={3}>
            <InputField fullWidth name={"engineVolume"} label={"Объем двигателя от"} type={"number"} />
          </Grid>
          <Grid item xs={3}>
            <InputField fullWidth name={"engineVolumeTo"} label={"до"} type={"number"} />
          </Grid>
          <Grid item xs={3}>
            <InputField fullWidth name={"mileage"} label={"Пробег от"} type={"number"} />
          </Grid>
          <Grid item xs={3}>
            <InputField fullWidth name={"mileageTo"} label={"до"} type={"number"} />
          </Grid>
        </Grid>
        <Grid container spacing={2} width={"100%"}>
          <Grid item xs={4}>
            <InputField fullWidth name={"cost"} label={"Сумма от"} type={"number"} />
          </Grid>
          <Grid item xs={4}>
            <InputField fullWidth name={"costTo"} label={"до"} type={"number"} />
          </Grid>
          <Grid item xs={2}>
            <SelectField fullWidth defaultValue={Currencies.RUB} name={"currency"}
                         label={"Валюта"}
                         options={Object.values(Currencies)} />
          </Grid>
          <Grid item xs={2}>
            <Button type={"submit"} variant={"contained"} fullWidth style={{ height: "100%" }}>Найти</Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  </FormProvider>;

};