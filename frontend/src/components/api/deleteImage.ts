import { axiosInstance } from "../../utils/axiosInstance";

export const deleteImage = (id: string) => {
  return axiosInstance.delete(`/images/${id}`);
};