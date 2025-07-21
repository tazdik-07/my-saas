'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MessageCircle, Flag, Reply, ThumbsUp, Filter, ChevronDown } from 'lucide-react';

export function ReviewsSection() {
  const [filterRating, setFilterRating] = useState('all');
  const [showReplyForm, setShowReplyForm] = useState(null);

  const reviews = [
    {
      id: 1,
      patientName: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent doctor! Very thorough examination and clear explanation of the treatment plan. Highly recommend!",
      date: "2 hours ago",
      verified: true,
      helpful: 12,
      avatar: "RK"
    },
    {
      id: 2,
      patientName: "Priya Sharma",
      rating: 4,
      comment: "Good experience overall. The doctor was professional and knowledgeable. Slight delay but worth the wait.",
      date: "1 day ago",
      verified: true,
      helpful: 8,
      avatar: "PS"
    },
    {
      id: 3,
      patientName: "Amit Patel",
      rating: 5,
      comment: "Amazing consultation! Dr. Sarah took time to listen to all my concerns and provided excellent care.",
      date: "2 days ago",
      verified: true,
      helpful: 15,
      avatar: "AP"
    },
    {
      id: 4,
      patientName: "Sneha Reddy",
      rating: 3,
      comment: "Decent consultation but felt a bit rushed. The treatment was effective though.",
      date: "3 days ago",
      verified: false,
      helpful: 3,
      avatar: "SR"
    },
    {
      id: 5,
      patientName: "Vikram Singh",
      rating: 5,
      comment: "Outstanding service! Very caring and professional. Will definitely come back for future consultations.",
      date: "1 week ago",
      verified: true,
      helpful: 20,
      avatar: "VS"
    }
  ];

  const filteredReviews = reviews.filter(review => {
    if (filterRating === 'all') return true;
    return review.rating === parseInt(filterRating);
  });

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const renderStars = (rating, size = 'w-4 h-4') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating 
            ? 'text-amber-400 fill-current' 
            : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Star className="w-6 h-6 mr-3 text-emerald-400" />
          Patient Reviews
        </h3>
        
        <div className="flex items-center space-x-3">
          {/* Rating Filter */}
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(averageRating), 'w-6 h-6')}
            </div>
            <div className="text-gray-400 text-sm">
              Based on {reviews.length} reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center">
                <span className="text-sm text-gray-400 w-8">{rating}</span>
                <Star className="w-4 h-4 text-amber-400 fill-current mr-2" />
                <div className="flex-1 bg-gray-700 rounded-full h-2 mr-3">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(ratingDistribution[rating] / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-8">
                  {ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No reviews found</p>
          </div>
        ) : (
          filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-gray-900/50 rounded-xl border border-gray-800/30 p-5 hover:bg-gray-900/70 transition-colors"
            >
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center text-black font-bold flex-shrink-0">
                  {review.avatar}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h4 className="font-semibold text-white mr-2">{review.patientName}</h4>
                      {review.verified && (
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-lg border border-emerald-500/20">
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-gray-400 text-sm">{review.date}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {renderStars(review.rating)}
                    <span className="text-gray-400 text-sm ml-2">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-400 hover:text-emerald-400 transition-colors">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">Helpful ({review.helpful})</span>
                      </button>
                      
                      <button
                        onClick={() => setShowReplyForm(showReplyForm === review.id ? null : review.id)}
                        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Reply className="w-4 h-4 mr-1" />
                        <span className="text-sm">Reply</span>
                      </button>
                    </div>

                    <button className="flex items-center text-gray-400 hover:text-red-400 transition-colors">
                      <Flag className="w-4 h-4 mr-1" />
                      <span className="text-sm">Flag</span>
                    </button>
                  </div>

                  {/* Reply Form */}
                  {showReplyForm === review.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-800/50"
                    >
                      <textarea
                        placeholder="Write a professional reply..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        rows={3}
                      />
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          onClick={() => setShowReplyForm(null)}
                          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                          Send Reply
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  );
}
