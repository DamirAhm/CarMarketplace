import {axiosInstance} from "../../../../utils/axiosInstance";
import {IRegister} from "../../../../../../common/interfaces/auth/register.interface";
import {UserWithAvatar} from "../../../../atoms/user.atom";

export const register = async (body: IRegister) => {
    const user = await axiosInstance.post<UserWithAvatar>('/auth/register', body);

    return user.data;
}