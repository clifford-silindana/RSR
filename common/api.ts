import axios from "axios";
import config from "../common/config.json";
axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: config.PUBLIC_API_BASE_URL,
});

export default axiosInstance;
