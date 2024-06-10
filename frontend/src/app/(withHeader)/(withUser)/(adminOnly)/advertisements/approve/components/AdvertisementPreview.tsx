import { Button, Col, Row } from "antd";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { AdWithIncludes } from "../../../../../components/AdvertisementComponent";
import { Avatar } from "../../../../../../../components/Avatar";

type Props = AdWithIncludes

export const AdvertisementPreview: React.FC<Props> = ({
                                                        createdAt,
                                                        car: {
                                                          model,
                                                          brand
                                                        },
                                                        creator: {
                                                          login,
                                                          avatar
                                                        },
                                                        id
                                                      }) => {

  const date = createdAt && new Date(createdAt);

  const formatter = new Intl.DateTimeFormat("ru-ru", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  });

  const dateStr = formatter.format(date);

  return <Link href={`/advertisements/approve/${id}`}>
    <Button style={{ width: "100%", height: "fit-content" }}>
      <Box padding={"5px"}>
        <Col>
          <Row>
            <Avatar avatar={avatar} />
            <Box width={"20px"} />
            <Typography variant={"h6"} color={"gray"}>{login}</Typography>
          </Row>
          <Box height={"10px"} />
          <Row justify={"space-between"} align={"middle"}>
            <Typography
              style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "calc(100% - 6rem)" }}
              variant={"body1"}
              color={"gray"}>
              {model} {brand}
            </Typography>
            <Typography variant={"body2"} color={"darkgray"}>{dateStr}</Typography>
          </Row>
        </Col>
      </Box>
    </Button>
  </Link>;
};