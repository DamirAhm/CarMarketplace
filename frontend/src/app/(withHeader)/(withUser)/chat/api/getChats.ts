import { axiosInstance } from "../../../../../utils/axiosInstance";
import { Message } from "@prisma/client";
import { UserWithAvatar } from "../../../../../atoms/user.atom";

export type MessageWithIncludes = Message & {
  receiver: UserWithAvatar
  sender: UserWithAvatar
}

export const getChats = () => {
  return axiosInstance.get<Record<string, MessageWithIncludes>>("/messages/chats").then(({ data }) => data);
};