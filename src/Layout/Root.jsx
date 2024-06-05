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
            <StickyNavbar></StickyNavbar>
            <div className="min-h-[calc(100vh-280px)]">
                <Outlet></Outlet>
            </div>

        </>
    );
};

export default Root;