import { AuthContext } from "@/components/Provider/AuthProvider";
import axiosPublic from "@/utilities/useAxiosPublic";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdCancelPresentation } from "react-icons/md";
import Swal from "sweetalert2";


const UpdateParcel = () => {
    const { register, handleSubmit, reset, watch, setValue } = useForm()

    const watchParcelWeight = watch('ParcelWeight', 0);

    const { user } = useContext(AuthContext)

    useEffect(() => {
        const calculatePrice = (weight) => {
            if (weight == 1) return 50;
            if (weight == 2) return 100;
            if (weight > 2) return 150;
            return 0;
        };
        setValue('Price', calculatePrice(watchParcelWeight));
    }, [watchParcelWeight, setValue]);

    // console.log(new Date().toUTCString())
    const onSubmit = data => {
        console.log(data)

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

        // axiosPublic.post('/bookings', bookingInfo)
        //     .then(res => {
        //         if (res.data.insertedId) {
        //             reset()
        //             Swal.fire({
        //                 position: 'top',
        //                 icon: 'success',
        //                 title: `Parcel booked succesfull`,
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             });
        //         }
        //     })

    }
    

    return (
        <div className=" top-12">
            <form onSubmit={handleSubmit(onSubmit)} className='relative container mx-auto  mt-5 border-4 border-sky-200 p-28 flex flex-col items-center justify-center' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531256379416-9f000e90aacc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', backgroundPosition: 'center' }} >
                <div className="btn btn-ghost absolute right-0 top-0">
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
                        {...register("PhoneNumber", { required: true })}
                    />
                    <input
                        name='ReceiversPhoneNumber'
                        className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                        type="tel"
                        placeholder="Receiver's Phone Number"
                        {...register("ReceiversPhoneNumber", { required: true })}
                    />
                    <input
                        name='ParcelType'
                        className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                        type="text"
                        placeholder="Parcel Type"
                        {...register("ParcelType", { required: true })}
                    />

                    <input
                        name='ReceiversName'
                        className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                        type="text"
                        placeholder="Receiver's Name"
                        {...register("ReceiversName", { required: true })}
                    />
                </div>
                <div className="w-1/2">
                    <input
                        name='ParcelWeight'
                        className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                        type="number"
                        placeholder="Parcel Weight (kg)"
                        {...register("ParcelWeight", { required: true })}
                    />

                    <input
                        name='DeliveryAddressLatitude'
                        className='h-20 lg:w-1/2 border-2 focus:border-4 text-black focus:border-emerald-200 rounded-lg p-3 mt-2'
                        type="number"
                        step="0.000000001"
                        placeholder="Delivery Address Latitude"
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
                        {...register("DeliveryAddressLongitude", { required: true })}
                    />

                    <input
                        name='RequestedDeliveryDate'
                        className='h-20 w-full border-2 focus:border-4 text-blaCK focus:border-emerald-200 rounded-lg p-3 mt-2'
                        type="date"
                        {...register("RequestedDeliveryDate", { required: true })}
                    />
                    <textarea
                        name='ParcelDeliveryAddress'
                        className='h-20 w-full border-2 focus:border-4 text-blaCK focus:border-emerald-200 rounded-lg p-3 mt-2'
                        placeholder="Parcel Delivery Address"
                        {...register("ParcelDeliveryAddress", { required: true })}
                    />
                </div>
                <input className='h-20 lg:w-1/2 border-2 btn btn-ghost text-black bg-green-400 text-xl focus:border-4 focus:border-emerald-200 rounded-lg p-3 mt-2' type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateParcel;