import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5173'
})

export default axiosPublic;