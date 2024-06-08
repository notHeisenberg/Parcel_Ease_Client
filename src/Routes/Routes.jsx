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
import AllParcels from "@/Pages/Dashboard/AllParcels/AllParcels";
import AllUsers from "@/Pages/Dashboard/AllUsers/AllUsers";
import AllDeliveryman from "@/Pages/Dashboard/AllDeliveryman/AllDeliveryman";
import AdminRoute from "./AdminRoute";
import AdminHome from "@/Pages/Dashboard/AdminHome/AdminHome";
import DeliverymanRoute from "./DeliverymanRoute";
import MyDeliveryList from "@/Pages/Dashboard/MyDeliveryList/MyDeliveryList";
import MyReviews from "@/Pages/Dashboard/MyReviews/MyReviews";


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

                    // deliveryman routes
                    {
                        path: 'myDeliveryList',
                        element: <DeliverymanRoute><MyDeliveryList></MyDeliveryList></DeliverymanRoute>
                    },
                    {
                        path: 'myReviews',
                        element: <DeliverymanRoute><MyReviews></MyReviews></DeliverymanRoute>
                    },


                    // admin only routes
                    {
                        path: 'allParcels',
                        element: <AdminRoute><AllParcels></AllParcels></AdminRoute>
                    },
                    {
                        path: 'allUsers',
                        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
                    },
                    {
                        path: 'allDeliveryman',
                        element: <AdminRoute><AllDeliveryman></AllDeliveryman></AdminRoute>
                    },
                    {
                        path: 'statistics',
                        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
                    },
                ]
            },
        ]



    },
]);

export default router;