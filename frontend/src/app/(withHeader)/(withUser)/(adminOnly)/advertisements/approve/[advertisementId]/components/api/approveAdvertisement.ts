import { axiosInstance } from "../../../../../../../../../utils/axiosInstance";

export const approveAdvertisement = (id: string) => {
  return axiosInstance.put(`/advertisments/approve/${id}`);
};