import { StickyNavbar } from "../Shared/StickyNavbar/StickyNavbar";
import Banner from "./Banner";
import FeaturesAndStats from "./FeaturesAndStats ";


const Home = () => {
    return (
        <div>
            <StickyNavbar></StickyNavbar>
            <Banner></Banner>
            <FeaturesAndStats></FeaturesAndStats>
        </div>
    );
};

export default Home;