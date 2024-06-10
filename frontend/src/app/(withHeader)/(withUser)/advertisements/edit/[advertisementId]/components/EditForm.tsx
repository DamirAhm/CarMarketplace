"use client";

import {
  ICreateAdvertisment
} from "../../../../../../../../../common/interfaces/advertisments/createAdvertisment.interface";
import React from "react";
import { reatomComponent } from "@reatom/npm-react";
import { AdvertismentsForm } from "../../../../../../../components/AdvertismentsForm";
import { editAdvertisement } from "../api/editAdvertisement";
import { useParams, useRouter } from "next/navigation";
import { userAtom } from "../../../../../../../atoms/user.atom";
import { AdWithIncludes } from "../../../../../components/AdvertisementComponent";
import { UserRole } from "../../../../../../../../../common/constants/UserRole";

type Props = {
  advertisement: AdWithIncludes;
}

export const EditForm: React.FC<Props> = reatomComponent(({ advertisement, ctx }) => {
  const { advertisementId } = useParams() as { advertisementId: string };
  const router = useRouter();
  const user = ctx.spy(userAtom);

  if (!user) {
    return null;
  }

  if (advertisement.creator.id !== user.id && user.role !== UserRole.Admin) {
    router.push(`/advertisements/${advertisementId}`);
  }

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
    defaultValues={{
      ...advertisement,
      ...advertisement.car
    } as ICreateAdvertisment}
  />;
});