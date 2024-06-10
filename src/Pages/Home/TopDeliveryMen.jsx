import axiosPublic from "@/utilities/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const TopDeliveryMen = () => {
    const [topDeliveryMen, setTopDeliveryMen] = useState([]);

    const { data: stats = {}, isLoading, error } = useQuery({
        queryKey: ['top-delivery-man'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/top-delivery-men`);
            return res.data;
        }
    });
    // console.log(topDeliveryMen)

    useEffect(() => {
        if (!isLoading && !error) {
            setTopDeliveryMen(stats);
        }
    }, [isLoading, error, stats]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-center text-3xl font-bold mb-6">Top Delivery Men</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topDeliveryMen.map((deliveryMan, index) => (
                    <div key={index} className="card bg-white p-5 rounded-lg shadow-md">
                        <img src={deliveryMan.photoURL} alt="Delivery Man" className="w-20 h-20 rounded-full mx-auto mb-4" />
                        <h3 className="text-xl font-bold mt-2 text-center">{deliveryMan.userName}</h3>
                        <p className="text-center mt-2">Number of Parcels Delivered: {deliveryMan.parcelsDelivered}</p>
                        <p className="text-center mt-2">Average Ratings: <span className="text-purple-400">{deliveryMan.averageRating.toFixed(2)}</span> </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopDeliveryMen;
