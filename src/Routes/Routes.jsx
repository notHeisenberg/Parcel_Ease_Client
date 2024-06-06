import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from '../Pages/Error/ErrorPage';
import Home from "@/Pages/Home/Home";
import Dashboard from "@/Pages/Dashboard/Dashboard";
import Login from "@/Pages/Login/Login";
import SignUp from "@/Pages/SignUp/SignUp";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"dashboard",
                element:<Dashboard></Dashboard>
            },
            {
                path:"login",
                element:<Login></Login>
            },
            {
                path:"signup",
                element:<SignUp></SignUp>
            }
        ]


        
    },
]);

export default router;