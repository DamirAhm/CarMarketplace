import { axiosInstance } from "../../../../../../utils/axiosInstance";
import { MessageWithIncludes } from "../../api/getChats";
import { IEditMessage } from "../../../../../../../../common/interfaces/messages/EditMessage.interface";

export const editMessage = (id: string, message: string) => {
  return axiosInstance.put<MessageWithIncludes>(`/messages/${id}`, { message } satisfies IEditMessage);
};