"use client";

import { reatomComponent } from "@reatom/npm-react";
import { FavoriteButton } from "./FavoriteButton";
import React from "react";
import { Favorite } from "@prisma/client";
import { userAtom } from "../../../../../atoms/user.atom";
import { Button, Popconfirm, Space } from "antd";
import { deleteAdvertisement } from "../../../(withUser)/profile/advertisements/api/deleteAdvertisement";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";

type Props = {
  creatorId: string;
  favorites: Favorite[],
  advertisementId: string;
  onChangeFavorite: (favorite: boolean) => void;
  compact?: boolean;
}

export const ActionButtons: React.FC<Props> = reatomComponent(({
                                                                 ctx,
                                                                 favorites,
                                                                 advertisementId,
                                                                 creatorId,
                                                                 onChangeFavorite,
                                                                 compact
                                                               }) => {
  const user = ctx.spy(userAtom);
  const router = useRouter();

  if (!user) {
    return null;
  }

  const isMine = user.id === creatorId;

  const handleChangeFavorite = (favorite: boolean) => {
    onChangeFavorite(favorite);
  };

  if (!isMine) {
    return <FavoriteButton onChange={handleChangeFavorite} favorites={favorites} advertisementId={advertisementId} />;
  }

  if (compact) {
    return <Link href={`/advertisements/edit/${advertisementId}`}>
      <Button type={"link"}>
        <EditOutlined style={{ fontSize: "24px" }} />
      </Button>
    </Link>;
  }

  const handleDelete = async () => {
    await deleteAdvertisement(advertisementId);
    router.push("/");
  };

  return <Space align={"start"}>
    <Link href={`/advertisements/edit/${advertisementId}`}>
      <Button type={"link"}>Изменить</Button>
    </Link>
    <Popconfirm
      placement={"bottom"}
      title="Удалить объявление"
      description="Вы уверены, что хотите удалить объявление?"
      onConfirm={handleDelete}
      okText="Да"
      cancelText="Отмена"
    >
      <Button danger>Удалить</Button>
    </Popconfirm>
  </Space>;
});