import {axiosInstance} from "../../../../../../utils/axiosInstance";

export const deleteAdvertisement = (id: string) => {
    return axiosInstance.delete(`/advertisments/${id}`);
}