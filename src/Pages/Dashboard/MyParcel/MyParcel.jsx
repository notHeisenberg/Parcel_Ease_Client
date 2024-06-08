import { AuthContext } from "@/components/Provider/AuthProvider";
import axiosPublic from "@/utilities/useAxiosPublic";
import useAxiosSecure from "@/utilities/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCancelPresentation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"


const MyParcel = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const { register, handleSubmit, watch, setValue } = useForm()

    const watchParcelWeight = watch('ParcelWeight', 0);



    useEffect(() => {
        const calculatePrice = (weight) => {
            if (weight == 1) return 50;
            if (weight == 2) return 100;
            if (weight > 2) return 150;
            return 0;
        };
        setValue('Price', calculatePrice(watchParcelWeight));
    }, [watchParcelWeight, setValue]);

    const onSubmit = data => {
        // console.log(data, selectedItem._id)

        const bookingInfo = {
            displayName: data.Name,
            email: data.Email,
            userPhoneNumber: data.PhoneNumber,
            recieverName: data.ReceiversName,
            recieverPhoneNumber: data.ReceiversPhoneNumber,
            parcelType: data.ParcelType,
            parcelWeight: parseInt(data.ParcelWeight),
            parcelPrice: data.Price,
            deliveryAddressLatitude: data.DeliveryAddressLatitude,
            deliveryAddressLongitude: data.DeliveryAddressLongitude,
            parcelDeliveryAddress: data.ParcelDeliveryAddress,
            requestedDeliveryDate: data.RequestedDeliveryDate,
            bookingDate: new Date().toUTCString()
        }
        console.log(bookingInfo)

        axiosSecure.patch(`/bookings/update/${selectedItem._id}`, bookingInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: `Parcel updated successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user.email}`)
            return res.data;
        }
    })


    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handleCancel = async (item) => {
        setSelectedItem(item);
        setDialogOpen(true);
    };

    const handleDialogAction = () => {
        setDialogOpen(false);
        console.log(selectedItem)

        axiosSecure.patch(`/bookings/cancel/${selectedItem._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: `Parcel Canceled successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    };

    const handleReview = (id) => {
        navigate(`/review/${id}`);
    };

    const handlePay = (id) => {
        navigate(`/pay/${id}`);
    };

    const filteredBookings = filter ? bookings.filter(booking => booking.status === filter) : bookings;

    return (
        <div className="container mx-auto p-8">
            <h2 className="text3-xl">Total bookings: {bookings.length}</h2>
            <div className="mb-4">
                <label>Filter by status: </label>
                <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
                    <option value=''>All</option>
                    <option value='pending'>Pending</option>
                    <option value='on the way'>On the Way</option>
                    <option value='delivered'>Delivered</option>
                    <option value='returned'>Returned</option>
                    <option value='cancelled'>Cancelled</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel Type</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Men ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking, index) => (
                            <tr key={booking._id} className="hover">
                                <th>{index + 1}</th>
                                <td>{booking.parcelType}</td>
                                <td>{booking.requestedDeliveryDate}</td>
                                <td>{booking.approximateDeliveryDate}</td>
                                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                <td>{booking.deliveryMenId || 'N/A'}</td>
                                <td className={booking.status === 'pending' ?
                                    `badge-warning badge mt-6 font-semibold` :
                                    booking.status === 'on the way' ? 'badge-info badge mt-6 font-semibold' : booking.status === 'delivered' ? 'badge-success' :
                                        booking.status === 'returned' ? 'badge-secondary badge mt-6 font-semibold' :
                                            'badge-error badge mt-6 font-semibold'}>{booking.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleOpenModal(booking)}
                                        disabled={booking.status !== 'pending' || booking.status === 'cancelled'}
                                        className="bg-blue-500 text-white px-2 py-1 m-1 rounded disabled:opacity-50"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleCancel(booking)}
                                        disabled={booking.status !== 'pending' || booking.status === 'cancelled'}
                                        className="bg-red-500 text-white px-2 py-1 m-1 rounded disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    {booking.status === 'delivered' && (
                                        <button
                                            onClick={() => handleReview(booking._id)}
                                            className="bg-green-500 text-white px-2 py-1 m-1 rounded"
                                        >
                                            Review
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handlePay(booking._id)}
                                        disabled={booking.status !== 'pending' || booking.status === 'cancelled'}
                                        className="bg-yellow-500 text-white px-2 py-1 m-1 rounded"
                                    >
                                        Pay
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isModalOpen && <>
                    <div className="fixed top-12">
                        <form onSubmit={handleSubmit(onSubmit)} className='relative container mx-auto  mt-5 border-4 border-sky-200 p-28 flex flex-col items-center justify-center' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531256379416-9f000e90aacc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', backgroundPosition: 'center' }} >
                            <div onClick={handleCloseModal} className="btn btn-outline absolute right-0 top-0">
                                <MdCancelPresentation className="text-4xl text-error " />
                            </div>
                            <div className="w-1/2">
                                <input
                                    name='Name'
                                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="text"
                                    placeholder="Name"
                                    defaultValue={user.displayName}
                                    readOnly
                                    {...register("Name")}
                                />
                                <input
                                    name='Email'
                                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="email"
                                    placeholder="Email"
                                    defaultValue={user.email}
                                    readOnly
                                    {...register("Email")}
                                />
                                <input
                                    name='PhoneNumber'
                                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="tel"
                                    placeholder="Your Phone Number"
                                    defaultValue={selectedItem.userPhoneNumber}
                                    {...register("PhoneNumber", { required: true })}
                                />
                                <input
                                    name='ReceiversPhoneNumber'
                                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="tel"
                                    placeholder="Receiver's Phone Number"
                                    defaultValue={selectedItem.recieverPhoneNumber}
                                    {...register("ReceiversPhoneNumber", { required: true })}
                                />
                                <input
                                    name='ParcelType'
                                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="text"
                                    placeholder="Parcel Type"
                                    defaultValue={selectedItem.parcelType}
                                    {...register("ParcelType", { required: true })}
                                />

                                <input
                                    name='ReceiversName'
                                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="text"
                                    placeholder="Receiver's Name"
                                    defaultValue={selectedItem.recieverName}
                                    {...register("ReceiversName", { required: true })}
                                />
                            </div>
                            <div className="w-1/2">
                                <input
                                    name='ParcelWeight'
                                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="number"
                                    min={0}
                                    placeholder="Parcel Weight (kg)"
                                    defaultValue={selectedItem.parcelWeight}
                                    {...register("ParcelWeight", { required: true })}
                                />

                                <input
                                    name='DeliveryAddressLatitude'
                                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="number"
                                    step="0.000000001"
                                    placeholder="Delivery Address Latitude"
                                    defaultValue={selectedItem.deliveryAddressLatitude}
                                    {...register("DeliveryAddressLatitude", { required: true })}
                                />
                                {/*  */}
                                <input
                                    name='Price'
                                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="number"
                                    placeholder="Price"
                                    readOnly
                                    {...register("Price")}
                                />
                                <input
                                    name='DeliveryAddressLongitude'
                                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="number"
                                    step="0.000000001"
                                    placeholder="Delivery Address Longitude"
                                    defaultValue={selectedItem.deliveryAddressLongitude}
                                    {...register("DeliveryAddressLongitude", { required: true })}
                                />

                                <input
                                    name='RequestedDeliveryDate'
                                    className='h-20 w-full border-2 focus:border-4 text-blaCK focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    type="date"
                                    defaultValue={selectedItem.requestedDeliveryDate}
                                    {...register("RequestedDeliveryDate", { required: true })}
                                />
                                <textarea
                                    name='ParcelDeliveryAddress'
                                    className='h-20 w-full border-2 focus:border-4 text-blaCK focus:border-emerald-200 rounded-lg p-3 mt-2'
                                    placeholder="Parcel Delivery Address"
                                    defaultValue={selectedItem.parcelDeliveryAddress}
                                    {...register("ParcelDeliveryAddress", { required: true })}
                                />
                            </div>
                            <input className='h-20 lg:w-1/2 border-2 btn btn-ghost text-black bg-green-400 text-xl focus:border-4 focus:border-emerald-200 rounded-lg p-3 mt-2' type="submit" value="Update" />
                        </form>
                    </div>
                </>

                }
            </div>
            <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogTrigger asChild>
                    <div />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDialogAction}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

    );
};

export default MyParcel;