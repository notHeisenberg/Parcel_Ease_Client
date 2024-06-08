import { AuthContext } from "@/components/Provider/AuthProvider";
import useDeliveryman from "@/hooks/useDeliveryman";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";



const DeliverymanRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isDeliveryman, isDeliverymanLoading] = useDeliveryman();
    const location = useLocation();

    if (loading || isDeliverymanLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isDeliveryman) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default DeliverymanRoute;