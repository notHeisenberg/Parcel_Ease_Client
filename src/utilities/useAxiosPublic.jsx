import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000' || 'https://parcel-ease-server.vercel.app'
})

export default axiosPublic;