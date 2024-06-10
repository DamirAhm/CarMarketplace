import { axiosInstance } from "../../../../../../../utils/axiosInstance";
import { AdWithIncludes } from "../../../../../components/AdvertisementComponent";

export const getUnapproved = () => {
  return axiosInstance.get<AdWithIncludes[]>("/advertisments/unapproved").then(({ data }) => data);
};