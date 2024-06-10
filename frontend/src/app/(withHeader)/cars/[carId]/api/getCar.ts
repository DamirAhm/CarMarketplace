import { axiosInstance } from "../../../../../utils/axiosInstance";
import { Car, Comment, Feedback, Reaction } from "@prisma/client";
import { AdWithIncludes } from "../../../components/AdvertisementComponent";
import { UserWithAvatar } from "../../../../../atoms/user.atom";

export type CommentWithIncludes = Comment & {
  user: UserWithAvatar
}
export type FeedbackWithIncludes = Feedback & { comments: CommentWithIncludes[], reactions: Reaction[] }

export type CarWithIncludes = Car & {
  images: string[];
  feedbacks: FeedbackWithIncludes[],
  advertisements: AdWithIncludes[];
}

export const getCar = (carId: string) => {
  return axiosInstance.get<CarWithIncludes>(`/cars/${carId}`).then(({ data }) => data);
};