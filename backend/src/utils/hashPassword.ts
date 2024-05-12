import {compare, genSalt, hash} from "bcrypt";

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10)

    return hash(password, salt);
};
