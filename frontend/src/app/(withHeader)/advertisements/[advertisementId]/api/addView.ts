import { axiosInstance } from "../../../../../utils/axiosInstance";

export const addView = (advertisementId: string) => {
  return axiosInstance.post(`/views/${advertisementId}`);
};