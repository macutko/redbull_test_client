import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://domacanas.hopto.org:11145",
    withCredentials: true
});

axiosInstance.defaults.timeout = 10000;

export {axiosInstance};
