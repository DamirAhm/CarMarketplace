import {axiosInstance} from "../../../../utils/axiosInstance";

export const logout = () => {
    return axiosInstance.post('/auth/logout');
}