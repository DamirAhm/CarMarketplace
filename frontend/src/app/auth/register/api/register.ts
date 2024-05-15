import {axiosInstance} from "../../../../utils/axiosInstance";
import {User} from "@prisma/client";
import {IRegister} from "../../../../../../common/interfaces/auth/register.interface";

export const register = async (body: IRegister) => {
    const user = await axiosInstance.post<User>('/auth/register', body);

    return user.data;
}