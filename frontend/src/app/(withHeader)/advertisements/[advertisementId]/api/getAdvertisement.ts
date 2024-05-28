import { axiosInstance } from "../../../../../utils/axiosInstance";
import { AdWithIncludes } from "../../../components/AdvertisementComponent";

export const getAdvertisement = (advertisementId: string) => {
  return axiosInstance.get<AdWithIncludes>(`/advertisments/${advertisementId}`).then(({ data }) => data);
};