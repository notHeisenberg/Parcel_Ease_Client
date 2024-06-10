import { AuthContext } from '@/components/Provider/AuthProvider';
import useAxiosSecure from '@/utilities/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';

const AllParcels = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [filter, setFilter] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedDeliveryMan, setSelectedDeliveryMan] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings`)
            return res.data;
        }
    })
    // console.log(bookings)

    const { data: deliveryMan = [] } = useQuery({
        queryKey: ['users', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/deliverymen`)
            return res.data;
        }
    })
    // console.log(deliveryMan)

    const handleSearch = () => {
        // Implement search functionality based on date range
        // setSelectedDate({ from: dateFrom, to: dateTo });
        setDateFrom('')
        setDateTo('')
    };

    const handleManage = (booking) => {
        setSelectedBooking(booking);
        // console.log(booking)
    };

    const handleAssign = () => {
        // Update the booking in the database with selected delivery man and date
        if (selectedBooking && selectedDeliveryMan) {
            // Implement database update logic
            console.log(`Booking with ID ${selectedBooking._id} assigned to delivery man ${selectedDeliveryMan}`);
            axiosSecure.patch(`/bookings/manage/${selectedBooking._id}`, {
                status: 'on the way',
                deliveryMenId: selectedDeliveryMan,
                approximateDeliveryDate: selectedDate,
            })
                .then(res => {
                    refetch()
                    setSelectedBooking(null)
                    if (res.data.modifiedCount > 0) {
                        refetch()
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: `Parcel in One The Way `,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
    };
    console.log(selectedDate)
    const filteredBookings = filter ? bookings.filter(booking => booking.status === filter) : bookings;

    // Further filter bookings based on date range
    const filteredAndSortedBookings = filteredBookings.filter(booking => {
        const bookingDate = new Date(booking.requestedDeliveryDate);
        const fromDate = dateFrom ? new Date(dateFrom) : null;
        const toDate = dateTo ? new Date(dateTo) : null;
        return (!fromDate || bookingDate >= fromDate) && (!toDate || bookingDate <= toDate);
    }).sort((a, b) => new Date(a.requestedDeliveryDate) - new Date(b.requestedDeliveryDate));


    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="text-3xl">Total bookings: {bookings.length}</h2>
                    <div className="mb-4">
                        <label>Filter by status: </label>
                        <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="on the way">On the Way</option>
                            <option value="delivered">Delivered</option>
                            <option value="returned">Returned</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="flex mb-2">
                        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border p-2 mr-4" />
                        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border p-2 mr-4" />
                        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Clear</button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User's Name</th>
                            <th>User's Phone</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedBookings.map((booking, index) => (
                            <tr key={booking._id} className="hover">
                                <th>{index + 1}</th>
                                <td>{booking.displayName}</td>
                                <td>{booking.userPhoneNumber}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.requestedDeliveryDate}</td>
                                <td className='text-blue-600'>${booking.parcelWeight * booking.parcelPrice}</td>
                                <td className={`badge ${booking.status === 'pending' ? 'badge-warning' :
                                    booking.status === 'on the way' ? 'badge-info' :
                                        booking.status === 'delivered' ? 'badge-success' :
                                            booking.status === 'returned' ? 'badge-secondary' :
                                                'badge-error'} mt-6 font-semibold`}>
                                    {booking.status}
                                </td>
                                <td>
                                    {booking.status === 'pending' && (
                                        <button
                                            onClick={() => handleManage(booking)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded btn btn-sm"
                                        >
                                            Manage
                                        </button>
                                    )}
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for managing bookings */}
            {
                selectedBooking && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded shadow-lg">
                            <h2 className="text-2xl mb-4">Manage Booking</h2>
                            <div className="mb-4">
                                <label>Select Deliveryman: </label>
                                <select required value={selectedDeliveryMan} onChange={(e) => setSelectedDeliveryMan(e.target.value)} className="border p-2">
                                    <option className='hidden' value="">Select Deliveryman</option>
                                    {deliveryMan.map(deliveryMan => (
                                        <option key={deliveryMan._id} value={deliveryMan._id}>{deliveryMan.userName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label>Assign Approximate Delivery Date: </label>
                                <input
                                    type="date"
                                    className="border p-2"
                                    defaultValue={selectedBooking.requestedDeliveryDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                            <button onClick={handleAssign} className="bg-blue-500 text-white px-4 py-2 rounded">Assign</button>
                            <button onClick={() => {
                                setSelectedBooking(null)
                                setSelectedDeliveryMan('')
                            }
                            }
                                className="bg-gray-500 text-white px-4 py-2 rounded ml-4">Close</button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default AllParcels;
