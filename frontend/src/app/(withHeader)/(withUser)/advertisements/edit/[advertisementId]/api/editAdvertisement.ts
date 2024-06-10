import {
  ICreateAdvertisment
} from "../../../../../../../../../common/interfaces/advertisments/createAdvertisment.interface";
import { axiosInstance } from "../../../../../../../utils/axiosInstance";

export const editAdvertisement = (advertismentId: string, body: ICreateAdvertisment) => {
  return axiosInstance.put(`/advertisments/${advertismentId}`, body).then(res => res.data);
};