import { axiosInstance } from "../../../../../../utils/axiosInstance";
import { AdWithIncludes } from "../../../../components/AdvertisementComponent";

export const getFavorites = () => {
  return axiosInstance.get<AdWithIncludes[]>("/advertisments/favorites").then(({ data }) => data);
};