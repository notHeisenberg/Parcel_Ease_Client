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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MyParcel = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const { register, handleSubmit, watch, setValue, reset } = useForm();
    const watchParcelWeight = watch('ParcelWeight', 0);

    useEffect(() => {
        const calculatePrice = (weight) => {
            if (weight === 1) return 50;
            if (weight === 2) return 100;
            if (weight > 2) return 150;
            return 0;
        };
        setValue('Price', calculatePrice(watchParcelWeight));
    }, [watchParcelWeight, setValue]);

    const onSubmit = data => {
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
        };

        axiosSecure.patch(`/bookings/update/${selectedItem._id}`, bookingInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Parcel updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user.email}`);
            return res.data;
        }
    });

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
        // console.log(isModalOpen)
    };
    console.log(isModalOpen)

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCancel = async (item) => {
        setSelectedItem(item);
        setDialogOpen(true);
    };

    const handleDialogAction = () => {
        setDialogOpen(false);

        axiosSecure.patch(`/bookings/cancel/${selectedItem._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'Parcel Canceled successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleReview = (item) => {
        setSelectedItem(item);
        setIsReviewModalOpen(true);
    };

    const handleReviewSubmit = (data) => {
        const reviewInfo = {
            userName: user.displayName,
            userImage: user.photoURL,
            rating: parseFloat(data.Rating),
            feedback: data.Feedback,
            deliveryMenId: selectedItem.deliveryMenId,
            parcelId: selectedItem._id
        };

        axiosSecure.post('/reviews', reviewInfo)
            .then(res => {
                if (res.data.insertedId) {
                    setIsReviewModalOpen(false);
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Review submitted successfully',
                        text: res.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }).catch(error => {
                console.error('There was an error submitting the review:', error);
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: error.response.data.message,
                    text: 'Error submitting review',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        reset()
    };

    const handlePay = (id) => {
        navigate(`/pay/${id}`);
    };


    const filteredBookings = filter ? bookings.filter(booking => booking.status === filter) : bookings;

    const totalPricePending = bookings
        .filter(booking => booking.status === 'pending')
        .reduce((total, booking) => total + (booking.parcelPrice * booking.parcelWeight || 0), 0);

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between">
                <div>
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
                </div>
                <div>
                    <span className="text-3xl font-bold border-4 text-indigo-500 border-red-500 p-2 rounded-xl">
                        Total Pending: $ {totalPricePending}
                    </span>
                </div>
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
                                <td className={`badge ${booking.status === 'pending' ? 'badge-warning' :
                                    booking.status === 'on the way' ? 'badge-accent' :
                                        booking.status === 'delivered' ? 'badge-success' :
                                            booking.status === 'returned' ? 'badge-secondary' :
                                                'badge-error'} badge mt-6 font-semibold`}>
                                    {booking.status}
                                </td>
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
                                            onClick={() => handleReview(booking)}
                                            className="bg-green-500 text-white px-2 py-1 m-1 rounded"
                                        >
                                            Review
                                        </button>
                                    )}
                                    {(booking.status !== 'cancelled' && booking.status !== 'returned') && (
                                        <button
                                            onClick={() => handlePay(booking)}
                                            className="bg-yellow-500 text-white px-2 py-1 m-1 rounded hover:p-3 hover:border-sky-200 hover:btn"
                                        >
                                            Pay
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isModalOpen && (
                    <div className="modal">
                        <form onSubmit={handleSubmit(onSubmit)} className="relative p-8 bg-white rounded shadow-lg space-y-4" style={{ backgroundImage: 'url("https://i.ibb.co/LCtBqGy/7846.jpg")', backgroundSize: 'cover', height: '100vh' }}>
                            <button
                                className="btn bg-red-400 font-bold text-2xl absolute right-4 top-4"
                                type="button"
                                onClick={handleCloseModal}
                            >
                                <MdCancelPresentation />
                            </button>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="Name">Name:</Label>
                                    <Input id="Name" defaultValue={selectedItem?.displayName} {...register("Name")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="Email">Email:</Label>
                                    <Input id="Email" defaultValue={selectedItem?.email} {...register("Email")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="PhoneNumber">Phone Number:</Label>
                                    <Input id="PhoneNumber" defaultValue={selectedItem?.userPhoneNumber} {...register("PhoneNumber")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="ReceiversName">Receiver's Name:</Label>
                                    <Input id="ReceiversName" defaultValue={selectedItem?.recieverName} {...register("ReceiversName")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="ReceiversPhoneNumber">Receiver's Phone Number:</Label>
                                    <Input id="ReceiversPhoneNumber" defaultValue={selectedItem?.recieverPhoneNumber} {...register("ReceiversPhoneNumber")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="ParcelType">Parcel Type:</Label>
                                    <Input id="ParcelType" defaultValue={selectedItem?.parcelType} {...register("ParcelType")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="ParcelWeight">Parcel Weight:</Label>
                                    <Input id="ParcelWeight" defaultValue={selectedItem?.parcelWeight} type="number" {...register("ParcelWeight")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="Price">Price:</Label>
                                    <Input id="Price" defaultValue={selectedItem?.parcelPrice} {...register("Price")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="DeliveryAddressLatitude">Delivery Address Latitude:</Label>
                                    <Input id="DeliveryAddressLatitude" defaultValue={selectedItem?.deliveryAddressLatitude} {...register("DeliveryAddressLatitude")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="DeliveryAddressLongitude">Delivery Address Longitude:</Label>
                                    <Input id="DeliveryAddressLongitude" defaultValue={selectedItem?.deliveryAddressLongitude} {...register("DeliveryAddressLongitude")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="ParcelDeliveryAddress">Parcel Delivery Address:</Label>
                                    <Input id="ParcelDeliveryAddress" defaultValue={selectedItem?.parcelDeliveryAddress} {...register("ParcelDeliveryAddress")} className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="RequestedDeliveryDate">Requested Delivery Date:</Label>
                                    <Input id="RequestedDeliveryDate" defaultValue={selectedItem?.requestedDeliveryDate} {...register("RequestedDeliveryDate")} className="border border-black p-2" />
                                </div>
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                )}

                {isReviewModalOpen && (
                    <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
                        <DialogContent>
                            <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-4">
                                <DialogHeader>
                                    <DialogTitle>Submit Review</DialogTitle>
                                </DialogHeader>
                                <div>
                                    <Label htmlFor="userName">User's Name:</Label>
                                    <Input id="userName" value={user.displayName} readOnly className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="userImage">User's Image:</Label>
                                    <Input id="userImage" value={user.photoURL} readOnly className="border border-black p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="Rating">Rating:</Label>
                                    <Input id="Rating" type="number" max="5" min="1" step="0.1" {...register("Rating", { required: true })} className="border border-warning p-2 text-warning font-bold" />
                                </div>
                                <div>
                                    <Label htmlFor="Feedback">Feedback:</Label>
                                    <Textarea id="Feedback" {...register("Feedback", { required: true })} className="border border-info p-2" />
                                </div>
                                <div>
                                    <Label htmlFor="deliveryMenId">Delivery Men's ID:</Label>
                                    <Input id="deliveryMenId" value={selectedItem?.deliveryMenId} readOnly className="border border-error p-2" />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Submit</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                )}

                <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to cancel this parcel?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDialogAction}>Yes, cancel it</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default MyParcel;
