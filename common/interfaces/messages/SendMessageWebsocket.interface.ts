import { Message } from "@prisma/client";
import { UserWithAvatar } from "../../../frontend/src/atoms/user.atom";

export interface ISendMessageWebsocket {
  newMessage: Message & {
    receiver: UserWithAvatar
    sender: UserWithAvatar
  };
  to: string;
}