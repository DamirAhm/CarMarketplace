import { Opinion } from "../../../../../../../../common/types/Opinion";
import { axiosInstance } from "../../../../../../utils/axiosInstance";

export const createReaction = (feedbackId: string, opinion: Opinion) => {
  return axiosInstance.post("/feedback/reaction", {
    feedbackId,
    opinion
  });
};