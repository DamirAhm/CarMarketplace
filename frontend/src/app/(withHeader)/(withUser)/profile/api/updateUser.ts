import {IUpdateUser} from "../../../../../../../common/interfaces/users/updateUser.interface";
import {axiosInstance} from "../../../../../utils/axiosInstance";

export const updateUser = (data: IUpdateUser) => {
    return axiosInstance.put('/users/me', data);
}