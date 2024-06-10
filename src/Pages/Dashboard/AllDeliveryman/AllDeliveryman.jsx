import { AuthContext } from "@/components/Provider/AuthProvider";
import useAxiosSecure from "@/utilities/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";


const AllDeliveryman = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: deliveryMen = [], refetch } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/deliverymen');
            return res.data;
        },
    });

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">All Delivery Men</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Delivery Man's Name</th>
                            <th className="px-4 py-2">Phone Number</th>
                            <th className="px-4 py-2">Number of Parcels Delivered</th>
                            <th className="px-4 py-2">Average Review</th>
                            <th className="px-4 py-2">Total Reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryMen.map((deliveryMan) => (
                            <tr key={deliveryMan._id} className="border-b">
                                <td className="px-4 py-2 text-purple-500">{deliveryMan.userName}</td>
                                <td className="px-4 py-2 text-green-500">{deliveryMan.phoneNumber}</td>
                                <td className="px-4 py-2">{deliveryMan.parcelDelivered || "N/A"}</td>
                                <td className={`px-4 py-2 ${deliveryMan.averageRating !== "N/A" ? 'text-green-500' : ''}`}>
                                    {deliveryMan.averageRating}
                                </td>
                                <td className="px-4 py-2 text-purple-500">{deliveryMan.reviewCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryman;