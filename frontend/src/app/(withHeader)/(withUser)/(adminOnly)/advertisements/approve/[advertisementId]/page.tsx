import { getAdvertisement } from "../../../../../advertisements/[advertisementId]/api/getAdvertisement";
import { AdvertisementView } from "../../../../../../../components/AdvertisementView";
import { Col, Row } from "antd";
import { Box } from "@mui/material";
import { AdvertisementStatus } from "../../../../../../../../../common/constants/AdvertisementStatus";
import { RejectButton } from "./components/RejectButton";
import { ApproveButton } from "./components/ApproveButton";


export default async function ApproveAdvertisementPage({ params }: { params: Record<string, string> }) {
  const { advertisementId } = params;
  const advertisement = await getAdvertisement(advertisementId);

  return <Col>
    <AdvertisementView advertisement={advertisement} />
    <Box height={"50px"} />

    {advertisement.status === AdvertisementStatus.Pending &&
      <Row>
        <ApproveButton advertisementId={advertisementId} />
        <Box width={"20px"} />
        <RejectButton advertisementId={advertisementId} />
      </Row>
    }
  </Col>;
}