import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://parcel-ease-server.vercel.app'
})

export default axiosPublic;