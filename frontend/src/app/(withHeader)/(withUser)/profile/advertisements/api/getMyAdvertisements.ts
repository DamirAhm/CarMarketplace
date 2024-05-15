import {axiosInstance} from "../../../../../../utils/axiosInstance";
import {AdWithIncludes} from "../../../../components/AdvertisementComponent";

export const getMyAdvertisements = () => {
    return axiosInstance.get<AdWithIncludes[]>('/advertisments/mine').then(({data}) => data)
}