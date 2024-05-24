import { axiosInstance } from "../../../../../utils/axiosInstance";
import { Car, Comments, Feedback, Reaction } from "@prisma/client";

export type FeedbackWithIncludes = Feedback & { comments: Comments[], reactions: Reaction[] }

export type CarWithIncludes = Car & {
  images: string[];
  feedbacks: FeedbackWithIncludes[],
  advertisements: number;
}

export const getCar = (carId: string) => {
  return axiosInstance.get<CarWithIncludes>(`/cars/${carId}`).then(({ data }) => data);
};