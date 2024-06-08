
import { AuthContext } from "@/components/Provider/AuthProvider";
import useAdmin from "@/hooks/useAdmin";
import useDeliveryman from "@/hooks/useDeliveryman";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { FaChartArea, FaHouse, FaList, FaRegAddressCard, FaUser } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import { MdOutlineAddCard } from "react-icons/md";
import { SiAzuredataexplorer } from "react-icons/si";

const Dashboard = () => {
    const { logout } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [isDeliveryman] = useDeliveryman()

    const Active = "flex items-center gap-2 btn btn-link text-2xl hover:text-xl uppercase underline "
    const notActive = `flex items-center gap-2 btn btn-ghost hover:text-2xl`


    const sidebar = <>

        {isAdmin ?
            // admin sidebar
            <>
                <NavLink
                    to={"/dashboard/statistics"}
                    className={({ isActive }) =>
                        isActive
                            ? Active
                            : notActive
                    }
                >
                    <FaChartArea></FaChartArea>
                    Statistics
                </NavLink>
                <NavLink
                    to={"/dashboard/allParcels"}
                    className={({ isActive }) =>
                        isActive
                            ? Active
                            : notActive
                    }
                >
                    <FaChartArea></FaChartArea>
                    All Parcels
                </NavLink>
                <NavLink
                    to={"/dashboard/allUsers"}
                    className={({ isActive }) =>
                        isActive
                            ? Active
                            : notActive
                    }
                >
                    <FaChartArea></FaChartArea>
                    All Users
                </NavLink>
                <NavLink
                    to={"/dashboard/allDeliveryman"}
                    className={({ isActive }) =>
                        isActive
                            ? Active
                            : notActive
                    }
                >
                    <FaChartArea></FaChartArea>
                    All Deliveryman
                </NavLink>
            </>
            :
            // deliveryman sidebar
            isDeliveryman ?
                <>
                    <NavLink
                        to={"/dashboard/myDeliveryList"}
                        className={({ isActive }) =>
                            isActive
                                ? Active
                                : notActive
                        }
                    >
                        <FaList></FaList>
                        My Delivery List
                    </NavLink>
                    <NavLink
                        to={"/dashboard/myReviews"}
                        className={({ isActive }) =>
                            isActive
                                ? Active
                                : notActive
                        }
                    >
                        <FaRegAddressCard />
                        My Reviews
                    </NavLink>
                </>
                :
                // user sidebar
                <>
                    <NavLink
                        to={"/dashboard/userhome"}
                        className={({ isActive }) =>
                            isActive
                                ? Active
                                : notActive
                        }
                    >
                        <FaUser></FaUser>
                        Dashboard
                    </NavLink>
                    <NavLink
                        to={"/dashboard/bookParcel"}
                        className={({ isActive }) =>
                            isActive
                                ? Active
                                : notActive
                        }
                    >
                        <MdOutlineAddCard />
                        Book A Parcel
                    </NavLink>
                    <NavLink
                        to={"/dashboard/myParcel"}
                        className={({ isActive }) =>
                            isActive
                                ? Active
                                : notActive
                        }
                    >
                        <SiAzuredataexplorer />
                        My Parcel
                    </NavLink>
                </>
        }
    </>
    return (
        <>
            <div className="flex ">
                <div className="flex flex-col justify-center items-center min-h-screen ">
                    <div className="drawer drawer-open ">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center">
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button md:hidden absolute top-0 z-10 ">Open drawer</label>
                            {/* Page content here */}
                            <div className="p-8">
                                <Outlet></Outlet>
                            </div>

                        </div>
                        <div className="drawer-side bg-slate-500 sm:absolute sm:left-0">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-screen text-xl ">
                                {/* Sidebar content here */}
                                {sidebar}
                                <hr className="border-1" />
                                <div className="flex flex-col gap-2 ">
                                    <Link
                                        to={"/"}
                                        className="flex items-center gap-2 btn btn-ghost hover:text-2xl"
                                    >
                                        <FaHouse></FaHouse>
                                        Home
                                    </Link>
                                    <button
                                        className="flex items-center gap-2 btn btn-ghost
                                        hover:text-2xl"
                                        onClick={logout}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Dashboard;