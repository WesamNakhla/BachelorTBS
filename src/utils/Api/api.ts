import axios from "axios";

const axiosInstances = axios.create({
    baseURL: "http://localhost:5000/api/v1"
});
export default axiosInstances