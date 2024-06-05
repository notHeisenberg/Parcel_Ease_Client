import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import errorBG from "../../assets/ikigai-cat-putting-up-a-404-error-sign-1.png"
import errorScreen from "../../assets/varying-stripes.png"

const ErrorPage = () => {

    return (
        <div className={`flex justify-center items-center h-screen `} style={{ backgroundImage: `url(${errorScreen})` }}>

            <div className={`flex flex-col justify-center items-center gap-2 bg-slate-400 shadow-2xl shadow-slate-900 border-2 rounded-3xl w-80 h-96 relative `} style={{ backgroundImage: `url(${errorBG})` }}>
                <Link to='/'><Button className="mt-72 btn btn-ghost text-green-400 text-xl drop-shadow-lg">Go back</Button></Link>
            </div>
        </div>
    );
};

export default ErrorPage