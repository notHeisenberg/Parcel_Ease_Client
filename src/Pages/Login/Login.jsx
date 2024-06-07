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
import { FaGithub } from "react-icons/fa6";
// import { AuthContext } from "../../Components/Provider/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "@/components/Provider/AuthProvider";
import useAxiosSecure from "@/utilities/useAxiosSecure";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import axiosPublic from "@/utilities/useAxiosPublic";
import Swal from "sweetalert2";


const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const { user, login, googleSignUp, githubSignIn } = useContext(AuthContext)
    const location = useLocation()
    // console.log(location.state)
    const navigate = useNavigate();

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);

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


        login(email, password)
            .then(result => {
                toast.success("login succesfully")
                console.log(result.user)
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(location?.state || '/');
            })

        //     }
        //     )
        //     .catch(error => toast.error(error))


        setEmail("")
        setPassword("")

    };

    const handleGoogleLogin = () => {
        googleSignUp()
            .then(result => {
                toast.success("Google login succesfully")
                // console.log(result.user)
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });

                const userInfo = {
                    email: result.user.email,
                    userName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    role: result.user.role || 'user',
                    createdAt: result.user.metadata.createdAt,
                    lastLoginAt: result.user.metadata.lastLoginAt
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate(location?.state || '/')
                    })
            })
            .catch(error => toast.error(error))

    }

    const handleGithubLogin = () => {
        githubSignIn()
            .then(result => {
                toast.success("Github login succesfully")

                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });

                const userInfo = {
                    email: result.user.email,
                    userName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    role: result.user.role || 'user',
                    createdAt: result.user.metadata.createdAt,
                    lastLoginAt: result.user.metadata.lastLoginAt
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate(location?.state || '/')
                    })
            })
            .catch(error => toast.error(error))

    }

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
                <Card color="transparent" shadow={false} className=" mx-auto w-96 p-10 bg-slate-600 text-blue-400" >
                    <Typography variant="h4" color="blue-gray">
                        Login
                    </Typography>
                    <Typography color="blue" className="mt-1 font-normal">
                        Enter your details to login.
                    </Typography>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2 p-2 max-w-screen-lg w-full">
                        <div className="mb-1 flex flex-col gap-6">

                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 rounded-xl p-2 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none rounde after:content-none",
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                    className=" !border--blue-gray-200 rounded-xl p-2 focus:!border-t-gray-900"
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
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            </div>
                        </div>

                        <Button disabled={disabled} type="submit" className="mt-6 btn btn-primary" fullWidth>
                            Login
                        </Button>
                        <div className="flex justify-center items-center gap-3 mt-6" >
                            <Button onClick={handleGoogleLogin} className=" btn btn-ghost rounded-full w-1/2 h-fit" >
                                <img src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
                            </Button>
                            <Button onClick={handleGithubLogin} className=" btn btn-ghost w-1/2 h-fit rounded-full" >
                                <FaGithub className="text-4xl text-stone-950" ></FaGithub>
                            </Button>
                        </div>
                        <Typography className="mt-4 text-center font-normal">
                            Don't  have an account?{" "}
                            <a href="/signup" className="font-medium text-green-500 hover:text-blue-500">
                                Sign up
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

export default Login;
