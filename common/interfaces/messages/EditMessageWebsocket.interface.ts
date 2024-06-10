import { Message } from "@prisma/client";
import { UserWithAvatar } from "../../../frontend/src/atoms/user.atom";

export interface IEditMessageWebsocket {
  changedMessage: Message & {
    receiver: UserWithAvatar
    sender: UserWithAvatar
  };
  to: string;
}