"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PatientReviews({
  reviews = [
    {
      id: 1,
      patientName: "Alice Johnson",
      rating: 5,
      comment: "Dr. Smith is an excellent doctor. Very thorough and caring.",
      date: "2024-06-28",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Alice%20J",
    },
    {
      id: 2,
      patientName: "Bob Williams",
      rating: 4,
      comment: "Good experience overall. Waiting time was a bit long.",
      date: "2024-06-25",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Bob%20W",
    },
    {
      id: 3,
      patientName: "Charlie Brown",
      rating: 5,
      comment: "Highly recommend! Dr. Smith was very professional and helpful.",
      date: "2024-06-20",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Charlie%20B",
    },
  ],
}) {
  return (
    <Card className="bg-gray-800 text-gray-100 rounded-xl shadow-lg border border-gray-600">
      <CardHeader>
        <CardTitle>Patient Reviews</CardTitle>
        <CardDescription>What your patients are saying.</CardDescription>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.avatar} alt={review.patientName} />
                  <AvatarFallback>{review.patientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{review.patientName}</h4>
                    <span className="text-sm text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-600"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-400">({review.rating}/5)</span>
                  </div>
                  <p className="text-gray-300 mt-2">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
