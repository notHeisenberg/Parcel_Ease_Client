import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            This is dashboard
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;