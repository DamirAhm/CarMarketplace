"use client";

import { Image, Space } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { getImageUrl } from "../../../../../utils/getImageUrl";
import PreviewGroup from "antd/es/image/PreviewGroup";
import React from "react";

type Props = {
  images: string[]
}

export const ImageGroup: React.FC<Props> = ({ images }) => {
  return <PreviewGroup preview={{
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
    <Space>
      {images.map((item) => (
        <Image key={item} src={getImageUrl(item)} height={300} />
      ))}
    </Space>
  </PreviewGroup>;
};