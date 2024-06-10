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
            const res = await axiosSecure.get('/users/deliverymen', {
                params: { role: 'user' } // Add role as a query parameter
            });
            return res.data;
        },
    });

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">All Delivery Men</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Delivery Man's Name</th>
                            <th className="px-4 py-2">Phone Number</th>
                            <th className="px-4 py-2">Number of Parcel Delivered</th>
                            <th className="px-4 py-2">Average Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryMen.map((deliveryMan) => (
                            <tr key={deliveryMan._id} className="border-b hover ">
                                <td className="px-4 py-2">{deliveryMan.userName}</td>
                                <td className="px-4 py-2">{deliveryMan.phoneNumber}</td>
                                <td className={`px-4 py-2 font-medium ${deliveryMan.parcelDelivered ? 'text-cyan-400' : 'text-red-400'}`}>
                                    {deliveryMan.parcelDelivered || "N/A"}
                                </td>

                                <td className="px-4 py-2">{deliveryMan.averageReview}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryman;