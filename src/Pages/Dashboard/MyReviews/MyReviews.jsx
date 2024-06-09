import { AuthContext } from "@/components/Provider/AuthProvider";
import useAxiosSecure from "@/utilities/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/deliveryman/${user.email}`);
            return res.data;
        }
    });
    // console.log(reviews)

    return (
        <div className="container mx-auto p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review, index) => (
                    <Card key={index} className="shadow-lg rounded-md overflow-hidden">
                        <CardHeader className="bg-blue-400 px-4 py-3 text-white">
                            <div className="flex items-center">
                                <img src={review.userImage} alt="User" className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <CardTitle className="text-lg font-semibold">{review.userName}</CardTitle>
                                    <CardDescription className="text-sm text-black">Review Date: {new Date(review.createdAt).toLocaleDateString()}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 py-2">
                            <div className="mb-4">Rating: <span className="font-semibold text-emerald-500">{review.rating}/5</span></div>
                            <div className="mb-4">Parcel ID: <span className="font-semibold text-info">{review.parcelId}</span></div>
                            <div className="mb-4">Feedback: <span className="font-semibold text-warning">{review.feedback}</span></div>
                            <div>Delivery Men ID: <span className="font-semibold text-error">{review.deliveryMenId}</span></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    );
};

export default MyReviews;