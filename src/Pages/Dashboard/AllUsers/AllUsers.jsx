import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from '@/utilities/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '@/components/Provider/AuthProvider';

const AllUsers = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', 'user'], // Including role in query key for react-query cache
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                params: { role: 'user' } // Add role as a query parameter
            });
            return res.data;
        },
    });
    // console.log(users)

    const handleRoleChange = async (userId, role) => {
        try {
            await axiosSecure.patch(`/users/${userId}/role`, { role });
            refetch();
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">User’s Name</th>
                            <th className="px-4 py-2">Phone Number</th>
                            <th className="px-4 py-2">Number of Parcel Booked</th>
                            <th className="px-4 py-2">Total Spent Amount</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b font-semibold">
                                <td className="px-4 py-2 text-xl">{user.userName}</td>
                                <td className="px-4 py-2 text-warning">{user.phoneNumber}</td>
                                <td className="px-4 py-2 text-purple-500 ">{user.parcelsBooked || 'N/A'}</td>
                                <td className="px-4 py-2 text-info">
                                    {user.totalSpentAmount
                                        ? `$${user.totalSpentAmount}`
                                        : 'N/A'}
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => handleRoleChange(user._id, 'deliveryman')}
                                    >
                                        Make Delivery Man
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleRoleChange(user._id, 'admin')}
                                    >
                                        Make Admin
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
