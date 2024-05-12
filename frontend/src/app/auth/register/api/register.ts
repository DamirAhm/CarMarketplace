import {AuthInterface} from "../../../../../../common/interfaces/auth/auth.interface";
import {axiosInstance} from "../../../../utils/axiosInstance";
import {User} from "@prisma/client";

export const register = async ({login, password}: AuthInterface) => {
    const user = await axiosInstance.post<User>('/auth/register', {
        login, password
    });

    return user.data;
}