import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "http://asterdigital.tech:8080",
    withCredentials: true
});

axiosInstance.defaults.timeout = 10000;

export {axiosInstance};
