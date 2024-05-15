import {atom} from "@reatom/core";
import {User} from "@prisma/client";

export type UserWithAvatar = User & {
    avatar?: string;
}

export const userRequestedAtom = atom(false, 'userRequestedAtom');
export const userAtom = atom<UserWithAvatar | null>(null, 'userAtom');