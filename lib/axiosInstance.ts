import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "http://localhost:12345",
    withCredentials: true
});

axiosInstance.defaults.timeout = 10000;

export {axiosInstance};
