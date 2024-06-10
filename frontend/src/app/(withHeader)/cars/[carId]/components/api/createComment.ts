import { ICreateComment } from "../../../../../../../../common/interfaces/comments/createComment.interface";
import { axiosInstance } from "../../../../../../utils/axiosInstance";
import { CommentWithIncludes } from "../../api/getCar";

export const createComment = (body: ICreateComment) => {
  return axiosInstance.post<CommentWithIncludes>("/comments", body).then(({ data }) => data);
};