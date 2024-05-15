import { ICreateFeedback } from "../../../../../../../../common/interfaces/feedback/createFeedback.interface";
import { axiosInstance } from "../../../../../../utils/axiosInstance";
import { CarWithImages } from "../../api/getCar";

export const createFeedback = (data: ICreateFeedback) => {
  return axiosInstance.post<CarWithImages["feedbacks"][number]>("/feedback", data).then(({ data }) => data);
};