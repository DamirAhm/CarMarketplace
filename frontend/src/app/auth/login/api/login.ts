import {AuthInterface} from "../../../../../../common/interfaces/auth/auth.interface";
import {axiosInstance} from "../../../../utils/axiosInstance";
import {User} from "@prisma/client";

export const login = async ({email, password}: AuthInterface) => {
    const user = await axiosInstance.post<User>('/auth/login', {
        email, password
    });

    return user.data;
}