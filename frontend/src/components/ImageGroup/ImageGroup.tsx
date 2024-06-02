"use client";

import { Flex, Image, Space } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { getImageUrl } from "../../utils/getImageUrl";
import PreviewGroup from "antd/es/image/PreviewGroup";
import React from "react";
import { DeletableImage } from "./components/DeletableImage";

type Props = {
  images: string[],
  onDelete?: (id: string) => void

}

export const ImageGroup: React.FC<Props> = ({ images, onDelete }) => {
  return <PreviewGroup
    preview={{
      toolbarRender: (
        _,
        {
          transform: { scale },
          actions: { onZoomOut, onZoomIn }
        }
      ) => {
        return <Space size={12} className="toolbar-wrapper">
          <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
          <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
        </Space>;
      }
    }}>
    <Flex style={{ overflowX: "auto", whiteSpace: "nowrap", gap: "10px" }}>
      {images.map((item) => (
        onDelete ? <DeletableImage onDelete={onDelete} id={item} key={item}>
            <Image style={{ flexShrink: "0", width: "unset", borderRadius: "5px" }} src={getImageUrl(item)}
                   height={300} />
          </DeletableImage>
          : <Image key={item} style={{ flexShrink: "0", width: "unset", borderRadius: "5px" }} src={getImageUrl(item)}
                   height={300} />
      ))}
    </Flex>
  </PreviewGroup>;
};