import { axiosInstance } from "../../../../../../utils/axiosInstance";

export const deleteMessage = (id: string) => {
  return axiosInstance.delete(`/messages/${id}`);
};