import { axiosInstance } from "../../../utils/axiosInstance";
import { AdWithIncludes } from "../components/AdvertisementComponent";

export const getRecommendations = () => {
  return axiosInstance.get<AdWithIncludes[]>("/advertisments/recommendations").then(({ data }) => data);
};