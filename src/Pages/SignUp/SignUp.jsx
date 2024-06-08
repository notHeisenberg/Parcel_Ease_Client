import {
    Card,
    Input,
    Button,
    Typography,

} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { AuthContext } from "@/components/Provider/AuthProvider";
import { SelectDemo } from "@/components/Select/SelectDemo";

import axiosPublic from "@/utilities/useAxiosPublic";
import Swal from "sweetalert2";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";






const SignUp = () => {
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [selectedRole, setSelectedRole] = useState('');
    const [showPassword, setShowPassword] = useState(false)


    const { signUp } = useContext(AuthContext)


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email.includes("@gmail.com")) {
            toast.error("Please provide a valid email...  ex: example@gmail.com")
            return
        }

        if (password.length < 6) {
            toast.warning("Password must be 6 character long")
            return
        } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
            toast.warn("Password must contain At least one uppercase letter,one lowercase letter,one digit and at least one special character(`@$!%*?&)")
            return
        }

        signUp(email, password)
            .then((result) => {

                const userInfo = {
                    email: result.user.email,
                    userName: name,
                    photoURL: photoURL,
                    role: selectedRole,
                    createdAt: result.user.metadata.createdAt,
                    lastLoginAt: result.user.metadata.lastLoginAt
                }
                // console.log(userInfo)
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: 'top',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })

                toast.success(
                    <>
                        Account created succesfully
                        <Link to="/login" className="btn btn-sm bg-slate-200 text-center font-medium text-green-500 hover:text-blue-500">
                            <button className="">Log In
                            </button>
                        </Link>
                    </>
                )
                updateProfile(result.user,
                    {
                        displayName: name,
                        photoURL: photoURL
                    })
                // sendEmailVerification(result.user)
                // .then(toast.success("Verification email sent"))
            })

            .catch(error => {
                if (error.code === "auth/email-already-in-use") {
                    toast.error("Email already in use")
                }
                else if (error.code === "auth/invalid-email") {
                    toast.error("Invalid email. Please provide a valid email")
                }
            }
            )


        setName("")
        setEmail("")
        setPassword("")
        photoURL("")

    };


    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-slate-200">
                <Card color="transparent" shadow={false} className="mx-auto w-96 p-10 bg-slate-600 text-blue-400 " >
                    <Typography variant="h4">
                        Sign Up
                    </Typography>
                    <Typography color="blue" className="mt-1 font-normal">
                        Nice to meet you! Enter your details to register.
                    </Typography>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2  max-w-screen-lg w-full">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Your name"
                                className=" !border-t-blue-gray-200 rounded-xl p-2 w-full focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none rounder after:content-none",
                                }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 rounded-xl p-2 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none rounder after:content-none",
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                PhotoURL
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="http://example.com"
                                className=" !border-t-blue-gray-200 rounded-xl p-2 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none rounder after:content-none",
                                }}
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                required
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Password
                            </Typography>

                            <div className="relative flex items-center">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    size="lg"
                                    placeholder="********"
                                    className=" !border-t-blue-gray-200 rounded-xl p-2 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-2xl" >
                                    {
                                        showPassword ?
                                            <IoIosEye />
                                            :
                                            <IoIosEyeOff />
                                    }
                                </span>
                            </div>
                            <SelectDemo
                                setSelectedRole={setSelectedRole}
                                required
                            ></SelectDemo>
                            <div className="form-control ">
                                <label className="label ">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            </div>
                        </div>

                        <Button disabled={disabled} type="submit" className="mt-6 btn btn-primary" fullWidth>
                            sign up
                        </Button>

                        <Typography color="deep-orange" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <a href="/login" className="font-medium text-green-500 hover:text-blue-500">
                                Log In
                            </a>
                        </Typography>
                    </form>
                    <Link className="text-center btn bg-green-500 text-black" to={"/"}> Go Home</Link>
                </Card>
            </div>
            <ToastContainer />

        </>
    );
};

export default SignUp;