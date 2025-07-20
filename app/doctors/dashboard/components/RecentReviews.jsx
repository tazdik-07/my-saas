"use client";

import { Star, MessageSquare, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecentReviews({ reviews }) {
  return (
    <div className="bg-[#0B1220] border border-gray-800 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Recent Reviews</h3>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#0b1220] rounded-lg p-4 border border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-white">{review.patientName}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-600"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">{review.comment}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700/50 hover:text-white">
                  <MessageSquare className="w-4 h-4 mr-2" /> Reply
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700/50 hover:text-white">
                  <Flag className="w-4 h-4 mr-2" /> Flag
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No recent reviews.</p>
      )}
    </div>
  );
}