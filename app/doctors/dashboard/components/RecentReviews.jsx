import { Card } from "@/components/ui/card";
import { User, Star, MessageSquare } from "lucide-react";



export default function RecentReviews({ recentReviews }) {

  return (
    <section className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600">
      <h2 className="text-2xl font-semibold text-gray-50 mb-4">Recent Reviews</h2>
      {recentReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {recentReviews.map((review, index) => (
            <Card key={index} className="p-4 rounded-xl bg-gray-700 text-gray-100 border border-indigo-700">
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-indigo-400 mr-2" />
                <h3 className="font-semibold text-lg">{review.patientName}</h3>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-500"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-400 ml-2">({review.rating}.0)</span>
              </div>
              <p className="text-sm text-gray-300 mb-2 line-clamp-3">{review.comment}</p>
              <p className="text-xs text-gray-500">{review.date}</p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-600" />
          <p className="text-lg">No recent reviews. Keep up the great work!</p>
        </div>
      )}
    </section>
  );
}
