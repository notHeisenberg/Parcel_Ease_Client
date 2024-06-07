import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from '../Pages/Error/ErrorPage';
import Home from "@/Pages/Home/Home";
import Dashboard from "@/Pages/Dashboard/Dashboard";
import Login from "@/Pages/Login/Login";
import SignUp from "@/Pages/SignUp/SignUp";
import UserHome from "@/Pages/Dashboard/UserHome/UserHome";
import PrivateRoute from "./PrivateRoute";
import BookParcel from "@/Pages/Dashboard/BookParcel/BookParcel";
import MyParcel from "@/Pages/Dashboard/MyParcel/MyParcel";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            },
            {
                path: "dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    // normal user routes
                    {
                        path: 'userhome',
                        element: <UserHome></UserHome>
                    },
                    {
                        path: 'bookParcel',
                        element: <BookParcel></BookParcel>
                    },
                    {
                        path: 'myParcel',
                        element: <MyParcel></MyParcel>
                    },

                ]
            },
        ]



    },
]);

export default router;