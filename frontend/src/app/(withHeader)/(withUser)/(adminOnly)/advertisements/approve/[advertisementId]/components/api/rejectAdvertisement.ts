import { axiosInstance } from "../../../../../../../../../utils/axiosInstance";

export const rejectAdvertisement = (id: string, comment: string) => {
  return axiosInstance.put(`/advertisments/reject/${id}`, {
    comment
  });
};