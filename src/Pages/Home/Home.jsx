import Footer from "../Shared/Footer/Footer";
import { StickyNavbar } from "../Shared/StickyNavbar/StickyNavbar";
import Banner from "./Banner";
import FeaturesAndStats from "./FeaturesAndStats ";
import TopDeliveryMen from "./TopDeliveryMen";


const Home = () => {
    return (
        <div>
            <StickyNavbar></StickyNavbar>
            <Banner></Banner>
            <FeaturesAndStats></FeaturesAndStats>
            <hr className="max-w-4xl border-dashed border-sky-300 mx-auto" />
            <TopDeliveryMen></TopDeliveryMen>
            <Footer></Footer>
        </div>
    );
};

export default Home;