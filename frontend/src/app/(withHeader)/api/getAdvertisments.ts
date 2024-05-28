import { axiosInstance } from "../../../utils/axiosInstance";
import { ISearchAdvertisments } from "../../../../../common/interfaces/advertisments/searchAdvertisments.interface";
import { AdWithIncludes } from "../components/AdvertisementComponent";

export const getAdvertisments = (data: ISearchAdvertisments) => {
  return axiosInstance.post<AdWithIncludes[]>("/advertisments/search", data).then(({ data }) => data);
};