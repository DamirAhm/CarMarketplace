"use client";

import {
  ICreateAdvertisment
} from "../../../../../../../../../common/interfaces/advertisments/createAdvertisment.interface";
import React from "react";
import { reatomComponent } from "@reatom/npm-react";
import { AdvertismentsForm } from "../../../../../../../components/AdvertismentsForm";
import { editAdvertisement } from "../api/editAdvertisement";
import { useParams, useRouter } from "next/navigation";

type Props = {
  defaultValues: ICreateAdvertisment;
}

export const EditForm: React.FC<Props> = reatomComponent(({ defaultValues, ctx }) => {
  const { advertisementId } = useParams() as { advertisementId: string };
  const router = useRouter();

  const handleSubmit = async (data: ICreateAdvertisment) => {
    await editAdvertisement(advertisementId, data);
    router.push(`/advertisements/${advertisementId}`);
  };

  const handleDecline = () => {
    router.push(`/advertisements/${advertisementId}`);
  };

  return <AdvertismentsForm
    submitText={"Изменить"}
    onSubmit={handleSubmit}
    onDecline={handleDecline}
    defaultValues={defaultValues}
  />;
});