import {axiosInstance} from "../../../utils/axiosInstance";
import {Advertisment} from "@prisma/client";
import {ISearchAdvertisments} from "../../../../../common/interfaces/advertisments/searchAdvertisments.interface";

export const getAdvertisments = (data: ISearchAdvertisments) => {
    return axiosInstance.post<(Advertisment & {
        imageIds: string[]
    })[]>('/advertisments/search', data).then(({data}) => data);
};