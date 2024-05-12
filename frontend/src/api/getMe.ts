import {User} from "@prisma/client";
import {axiosInstance} from "../utils/axiosInstance";

export const getMe = async () => {
    const user = await axiosInstance.get<User | null>('/users/me');

    return user.data;
}