import { axiosInstance } from "../../../../../../utils/axiosInstance";
import { CommentWithIncludes } from "../../api/getCar";

export const editComment = (commentId: string, text: string) => {
  return axiosInstance.put<CommentWithIncludes>(`/comments/${commentId}`, {
    text
  }).then(({ data }) => data);
};