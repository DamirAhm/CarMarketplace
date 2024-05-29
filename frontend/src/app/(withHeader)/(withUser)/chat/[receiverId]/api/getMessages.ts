import { axiosInstance } from "../../../../../../utils/axiosInstance";
import { MessageWithIncludes } from "../../api/getChats";

export const getMessages = (receiverId: string) => {
  return axiosInstance.get<MessageWithIncludes[]>(`/messages/chats/${receiverId}`).then(({ data }) => data);
};