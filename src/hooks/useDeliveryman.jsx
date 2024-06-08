import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/components/Provider/AuthProvider";
import useAxiosSecure from "@/utilities/useAxiosSecure";


const useDeliveryman = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isDeliveryman, isPending: isDeliverymanLoading } = useQuery({
        queryKey: [user?.email, 'isDeliveryman'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            // console.log('asking or checking is Deliveryman', user)
            const res = await axiosSecure.get(`/users/deliveryman/${user.email}`);
            // console.log(res.data);
            return res.data?.deliveryman ?? false;
        }
    })
    return [isDeliveryman, isDeliverymanLoading]
};

export default useDeliveryman;