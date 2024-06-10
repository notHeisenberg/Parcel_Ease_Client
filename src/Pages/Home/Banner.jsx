import { useState } from "react";

const Banner = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        // Implement your search functionality here
        console.log(`Searching for: ${searchQuery}`);
        // You can redirect to a search results page or update the state to show results
    };

    return (
        <div className="hero container mx-auto h-[600px] rounded-2xl mt-5" style={{ backgroundImage: "url(https://img.freepik.com/premium-vector/banner-fast-delivery-with-store-phone-parcels-location-realistic-style-vector-illustration_548887-125.jpg)", backgroundRepeat: "no-repeat" }}>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-prose space-x-4 text-black">
                    <h1 className="mb-5 text-4xl font-bold">"Welcome to <span className='text-orange-300'>Percelease</span>"</h1>
                    <p className="mb-5 opacity-80">
                        Discover seamless leasing solutions with Percelease. Find your perfect vehicle, manage your lease, and enjoy exceptional service tailored to your needs. Your journey starts here!
                    </p>
                    <div className="flex justify-center items-center space-x-2">
                        <input
                            type="text"
                            className="px-4 py-2 rounded-full text-black"
                            placeholder="Search for vehicles, lease options..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="btn btn-warning border-none hover:bg-purple-400 font-bold rounded-full"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
