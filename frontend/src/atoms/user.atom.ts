import {atom} from "@reatom/core";
import {User} from "@prisma/client";

export const userRequestedAtom = atom(false, 'userRequestedAtom');
export const userAtom = atom<User | null>(null, 'userAtom');