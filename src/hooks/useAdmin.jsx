import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/components/Provider/AuthProvider";
import useAxiosSecure from "@/utilities/useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            // console.log('asking or checking is admin', user)
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            // console.log(res.data);
            return res.data?.admin ?? false;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;