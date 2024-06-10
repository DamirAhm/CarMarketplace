import { axiosInstance } from "../../../../../../utils/axiosInstance";

export const deleteComment = (commentId: string) => {
  return axiosInstance.delete(`/comments/${commentId}`);
};