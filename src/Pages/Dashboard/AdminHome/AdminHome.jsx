import { AuthContext } from "@/components/Provider/AuthProvider";
import useAxiosSecure from "@/utilities/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";


const AdminHome = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings`)
            return res.data;
        }
    })
    // console.log(bookings)

    
    return (
        <div>
            This is admin Home stastics page
        </div>
    );
};

export default AdminHome;