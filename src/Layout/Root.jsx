import { StickyNavbar } from "@/Pages/Shared/StickyNavbar/StickyNavbar";
import { Outlet, useLocation } from "react-router-dom"

const Root = () => {
    const location = useLocation()
    if (location.pathname !== '/') {
        document.title = `Parcel Ease - ${location.pathname.replace('/', '')}`
    } else {
        document.title = `Parcel Ease`
    }

    return (
        <>

                <Outlet></Outlet>

        </>
    );
};

export default Root;