import style from "../ImageGroup.module.css";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";

type Props = {
  id: string;
  onDelete: (id: string) => void;
}

export const DeletableImage: React.FC<PropsWithChildren<Props>> = ({ children, id, onDelete }) => {
  const handleDelete = async () => {
    onDelete(id);
  };

  return <Box className={style.image}>
    {children}
    <Button onClick={handleDelete} type={"primary"} danger className={style.delete}>
      <DeleteOutlined />
    </Button>
  </Box>;
};