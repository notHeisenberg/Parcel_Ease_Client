import { AuthContext } from "@/components/Provider/AuthProvider";
import axiosPublic from "@/utilities/useAxiosPublic";
import useAxiosSecure from "@/utilities/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import Chart from 'react-apexcharts';
import LineChart from "./LineChart";



const AdminHome = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: stats = [], refetch } = useQuery({
        queryKey: ['stats', user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/statistics`)
            return res.data;
        }
    })
    // console.log(stats)


    return (
        <div>
            <div>
                {/* Render the line chart here */}
                {stats?.lineChartData && <LineChart lineChartData={stats.lineChartData} />}
            </div>
            <div>
                {/* Render other content */}
                This is admin Home statistics page
            </div>
        </div>
    );
};

export default AdminHome;