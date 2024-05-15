import {IAuth} from "../../../../../../common/interfaces/auth/auth.interface";
import {axiosInstance} from "../../../../utils/axiosInstance";
import {User} from "@prisma/client";

export const login = async (body: IAuth) => {
    const user = await axiosInstance.post<User>('/auth/login', body);

    return user.data;
}