import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from '../Pages/Error/ErrorPage';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,


        
    },
]);

export default router;