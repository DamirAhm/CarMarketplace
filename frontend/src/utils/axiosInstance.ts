import Axios from 'axios';

export const axiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})