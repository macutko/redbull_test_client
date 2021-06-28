import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "https://asterdigital.tech",
    withCredentials: true
});

axiosInstance.defaults.timeout = 10000;

export {axiosInstance};
