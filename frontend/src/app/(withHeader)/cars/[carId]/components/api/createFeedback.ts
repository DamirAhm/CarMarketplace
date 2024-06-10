import { ICreateFeedback } from "../../../../../../../../common/interfaces/feedback/createFeedback.interface";
import { axiosInstance } from "../../../../../../utils/axiosInstance";
import { CarWithIncludes } from "../../api/getCar";

export const createFeedback = (data: ICreateFeedback) => {
  return axiosInstance.post<CarWithIncludes["feedbacks"][number]>("/feedback", data).then(({ data }) => data);
};