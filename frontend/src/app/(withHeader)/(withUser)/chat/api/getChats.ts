import { axiosInstance } from "../../../../../utils/axiosInstance";
import { Message } from "@prisma/client";
import { UserWithAvatar } from "../../../../../atoms/user.atom";

export type Chat = Message & {
  receiver: UserWithAvatar
}

export const getChats = () => {
  return axiosInstance.get<Record<string, Chat>>("/messages/chats").then(({ data }) => data);
};