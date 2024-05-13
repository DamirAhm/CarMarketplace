import {
    CreateAdvertismentInterface
} from "../../../../../../../../common/interfaces/advertisments/createAdvertisment.interface";
import {axiosInstance} from "../../../../../../utils/axiosInstance";

export const createAdvertisement = (body: CreateAdvertismentInterface) => {
    return axiosInstance.post('/advertisments', body).then(res => res.data);
}