import {axiosInstance} from "../../../../../../utils/axiosInstance";
import {AdWithImage} from "../../../../components/AdvertisementComponent";

export const getMyAdvertisements = () => {
    return axiosInstance.get<AdWithImage[]>('/advertisments/mine').then(({data}) => data)
}