import axiosPublic from "@/utilities/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { FaShieldAlt, FaRocket, FaUsers } from "react-icons/fa"; // Example icons from react-icons
// import { useQuery } from "react-query";
// import { AuthContext } from "./AuthContext"; // Adjust the path as needed
// import useAxiosSecure from "./useAxiosSecure"; // Adjust the path as needed

const FeaturesAndStats = () => {


    const { data: stats = {}, isLoading, error } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/statistics`);
            return res.data;
        }
    });
    // console.log(stats)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-center text-3xl font-bold mb-10">Our Features</h2>
            <div className="flex justify-center space-x-4">
                <div className="card bg-white p-5 rounded-lg shadow-md">
                    <FaShieldAlt className="text-4xl text-blue-500 mx-auto" />
                    <h3 className="text-xl font-bold mt-4 text-center">Parcel Safety</h3>
                    <p className="text-center mt-2">Your parcels are always safe with us. We ensure the highest level of security.</p>
                </div>
                <div className="card bg-white p-5 rounded-lg shadow-md">
                    <FaRocket className="text-4xl text-green-500 mx-auto" />
                    <h3 className="text-xl font-bold mt-4 text-center">Super Fast Delivery</h3>
                    <p className="text-center mt-2">We deliver your parcels at lightning speed, ensuring timely delivery every time.</p>
                </div>
                <div className="card bg-white p-5 rounded-lg shadow-md">
                    <FaUsers className="text-4xl text-red-500 mx-auto" />
                    <h3 className="text-xl font-bold mt-4 text-center">User Friendly</h3>
                    <p className="text-center mt-2">Our app is easy to use, making your parcel booking experience seamless.</p>
                </div>
            </div>

            <h2 className="text-center text-3xl font-bold mt-10 mb-6">App Usage Statistics</h2>
            <div className="flex justify-center space-x-4">
                <div className="stat-card bg-white p-5 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold">Total Parcels Booked</h3>
                    <CountUp className="text-3xl font-bold text-blue-500" end={stats.totalParcelsBooked} duration={3} />
                </div>
                <div className="stat-card bg-white p-5 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold">Total Parcels Delivered</h3>
                    <CountUp className="text-3xl font-bold text-green-500" end={stats.totalParcelsDelivered} duration={3} />
                </div>
                <div className="stat-card bg-white p-5 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold">Total Registered Users</h3>
                    <CountUp className="text-3xl font-bold text-red-500" end={stats.totalUsers} duration={3} />
                </div>
            </div>
        </div>
    );
};

export default FeaturesAndStats;
