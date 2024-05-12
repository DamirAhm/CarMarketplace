import {AuthInterface} from "../../../../../../common/interfaces/auth/auth.interface";
import {axiosInstance} from "../../../../utils/axiosInstance";
import {User} from "@prisma/client";

export const login = async ({login, password}: AuthInterface) => {
    const user = await axiosInstance.post<User>('/auth/login', {
        login, password
    });

    return user.data;
}