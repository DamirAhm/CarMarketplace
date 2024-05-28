import { axiosInstance } from "../../../../../../utils/axiosInstance";

export const changeFavorite = (advertisementId: string, isFavorite: boolean) => {
  return axiosInstance[isFavorite ? "post" : "delete"](`/favorites/${advertisementId}`);
};