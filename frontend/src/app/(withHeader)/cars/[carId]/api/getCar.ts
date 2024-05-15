import { axiosInstance } from "../../../../../utils/axiosInstance";
import { Car, Comments, Feedback, Reaction } from "@prisma/client";

export type CarWithImages = Car & {
  images: string[];
  feedbacks: (Feedback & { comments: Comments[], reactions: Reaction[] })[],
  advertisements: number;
}

export const getCar = (carId: string) => {
  return axiosInstance.get<CarWithImages>(`/cars/${carId}`).then(({ data }) => data);
};