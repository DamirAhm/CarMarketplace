import {atom} from "@reatom/core";
import {User} from "@prisma/client";

export const userAtom = atom<User | null>(null, 'userAtom');

userAtom.onChange(console.log)