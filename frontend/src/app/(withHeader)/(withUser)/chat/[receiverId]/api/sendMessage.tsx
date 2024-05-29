import { axiosInstance } from "../../../../../../utils/axiosInstance";
import { MessageWithIncludes } from "../../api/getChats";
import { ISendMessage } from "../../../../../../../../common/interfaces/messages/SendMessage.interface";
import { AxiosResponse } from "axios";

export const sendMessage = (message: string, to: string) => {
  return axiosInstance.post<ISendMessage, AxiosResponse<MessageWithIncludes>, ISendMessage>("/messages", {
    to,
    message
  }).then(({ data }) => data);
};