import { AuthContext } from "@/components/Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const UserHome = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [disabled, setDisabled] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const onSubmit = data => {

        updateProfile(user,
            {
                displayName: data.DisplayName || user.displayName,
                photoURL: data.PhotoURL || user.photoURL,
            }
        )
            .then(
                toast.success("Update succesfull")
            )
            .catch((error) =>
                toast.warning(error)
            ).finally(() => window.location.reload())
        // console.log(errors);

    }

    useEffect(() => {
        if (displayName || photoURL) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [displayName, photoURL]);
    // console.log(displayName, photoURL)

    return (
        <>
            <div className='text-center container mx-auto font-semibold text-2xl text-gray-700 bg-slate-300 mt-10 p-8 space-y-2 border-2 border-error rounded-lg'>
                <p>Name : {user.displayName} </p>
                <p>Email : {user.email} </p>
                <p>PhotoURL : {user.photoURL} </p>
            </div>
            <h1 className='text-center mt-10 text-blue-500 text-4xl font-bold' >Update Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='container mx-auto h-[600px] mt-5 border-4 border-sky-200 p-28 flex flex-col items-center' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531256379416-9f000e90aacc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', backgroundPosition: 'center' }} >

                <input
                    onChange={(e) => setDisplayName(e.target.value)}
                    name='DisplayName'
                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-white focus:border-emerald-200 rounded-lg p-3 mt-2' type="text" placeholder="Display name" {...register("DisplayName")} />
                <textarea
                    required
                    onChange={(e) => setPhotoURL(e.target.value)}
                    name='PhotoURL'
                    className='h-20 lg:w-1/2 border-2 focus:border-4 text-white focus:border-emerald-200 rounded-lg p-3 mt-2' type="text" placeholder="Photo URL" {...register("PhotoURL")} />
                <input className={`h-20 lg:w-1/2 border-2 btn btn-primary text-xl focus:border-4 focus:border-emerald-200 rounded-lg p-3 mt-2 `} type="submit" value="Update Profile" />
            </form>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default UserHome;