import { AuthContext } from "@/components/Provider/AuthProvider";
import useAxiosSecure from "@/utilities/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState('');

    const { data: deliveries = [], refetch } = useQuery({
        queryKey: ['deliveries', user._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/deliveries/${user.email}`);
            return res.data;
        }
    });
    // console.log(deliveries)

    const handleUpdateStatus = (id, status) => {
        Swal.fire({
            title: `Are you sure you want to mark this parcel as ${status}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/deliveries/${id}/${status}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire('Updated!', `Parcel status has been updated to ${status}.`, 'success');
                        }
                    });
            }
        });
    };

    const filtereDeliveries = filter ? deliveries.filter(booking => booking.status === filter) : deliveries;

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl mb-4">My Delivery List</h2>
            <h2 className="text-xl mb-4">Total Delivery: {deliveries.length} </h2>
            <div className="mb-4">
                <label>Filter by status: </label>
                <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
                    <option value=''>All</option>
                    <option value='on the way'>On the Way</option>
                    <option value='delivered'>Delivered</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Booked User's Name</th>
                            <th>Receiver's Name</th>
                            <th>User's Phone</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Receiver's Phone</th>
                            <th>Receiver's Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtereDeliveries.map((delivery, index) => (
                            <tr key={delivery._id} className="hover">
                                <th>{index + 1}</th>
                                <td>{delivery.displayName}</td>
                                <td>{delivery.recieverName}</td>
                                <td>{delivery.userPhoneNumber}</td>
                                <td>{new Date(delivery.requestedDeliveryDate).toLocaleDateString()}</td>
                                <td>{new Date(delivery.approxDeliveryDate).toLocaleDateString()}</td>
                                <td>{delivery.recieverPhoneNumber}</td>
                                <td>{delivery.parcelDeliveryAddress}</td>
                                <td>
                                    {delivery.status === 'delivered' ? (
                                        <button className="bg-green-500 text-white px-2 py-1 rounded" disabled>Delivered</button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleUpdateStatus(delivery._id, 'cancelled')}
                                                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(delivery._id, 'delivered')}
                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                            >
                                                Deliver
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDeliveryList;