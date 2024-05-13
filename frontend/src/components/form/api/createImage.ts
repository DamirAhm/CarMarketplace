import {axiosInstance} from "../../../utils/axiosInstance";

export const createImage = async (file: File) => {
    const formData = new FormData();
    formData.set('file', file);

    return await axiosInstance.post('/images', formData, {
        headers: {
            "Content-Type": file.type,
        }
    }).then(({data}) => data);
}