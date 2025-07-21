"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  Star, 
  MessageCircle, 
  Filter, 
  Reply, 
  Flag, 
  ThumbsUp,
  Search,
  Download,
  Eye,
  TrendingUp,
  Users,
  Calendar
} from "lucide-react";

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showReplyForm, setShowReplyForm] = useState(null);

  const reviews = [
    {
      id: 1,
      patientName: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent doctor! Very thorough examination and clear explanation of the treatment plan. The consultation was comprehensive and I felt heard throughout the process. Highly recommend Dr. Sarah to anyone looking for quality healthcare.",
      date: "2 hours ago",
      verified: true,
      helpful: 12,
      avatar: "RK",
      appointmentDate: "Jan 15, 2025",
      replied: false
    },
    {
      id: 2,
      patientName: "Priya Sharma",
      rating: 4,
      comment: "Good experience overall. The doctor was professional and knowledgeable. Slight delay in the appointment but the quality of care made up for it. Would visit again.",
      date: "1 day ago",
      verified: true,
      helpful: 8,
      avatar: "PS",
      appointmentDate: "Jan 14, 2025",
      replied: true,
      reply: "Thank you for your feedback, Priya. I apologize for the delay and appreciate your patience. I'm glad you found the consultation helpful."
    },
    {
      id: 3,
      patientName: "Amit Patel",
      rating: 5,
      comment: "Amazing consultation! Dr. Sarah took time to listen to all my concerns and provided excellent care. The follow-up instructions were very clear and easy to follow.",
      date: "2 days ago",
      verified: true,
      helpful: 15,
      avatar: "AP",
      appointmentDate: "Jan 13, 2025",
      replied: false
    },
    {
      id: 4,
      patientName: "Sneha Reddy",
      rating: 3,
      comment: "Decent consultation but felt a bit rushed. The treatment was effective though and the doctor was knowledgeable. Could improve on spending more time with patients.",
      date: "3 days ago",
      verified: false,
      helpful: 3,
      avatar: "SR",
      appointmentDate: "Jan 12, 2025",
      replied: true,
      reply: "Thank you for your honest feedback. I strive to provide thorough consultations while being mindful of all patients' time. I'll work on better time management."
    },
    {
      id: 5,
      patientName: "Vikram Singh",
      rating: 5,
      comment: "Outstanding service! Very caring and professional approach. The doctor explained everything in detail and made sure I understood my condition completely. Will definitely come back for future consultations.",
      date: "1 week ago",
      verified: true,
      helpful: 20,
      avatar: "VS",
      appointmentDate: "Jan 8, 2025",
      replied: false
    },
    {
      id: 6,
      patientName: "Meera Gupta",
      rating: 4,
      comment: "Professional and competent doctor. Good diagnosis and treatment plan. The clinic environment was clean and well-maintained. Would recommend to others.",
      date: "1 week ago",
      verified: true,
      helpful: 7,
      avatar: "MG",
      appointmentDate: "Jan 7, 2025",
      replied: false
    },
    {
      id: 7,
      patientName: "Arjun Nair",
      rating: 2,
      comment: "The wait time was too long and the consultation felt rushed. Expected better service for the fee paid. The treatment was okay but the overall experience could be improved.",
      date: "2 weeks ago",
      verified: true,
      helpful: 2,
      avatar: "AN",
      appointmentDate: "Dec 28, 2024",
      replied: true,
      reply: "I apologize for the wait time and rushed feeling during your consultation. I've taken steps to improve scheduling to provide better service. Thank you for the feedback."
    },
    {
      id: 8,
      patientName: "Kavya Iyer",
      rating: 5,
      comment: "Exceptional care and attention to detail. Dr. Sarah is very knowledgeable and makes you feel comfortable during the consultation. Highly satisfied with the treatment received.",
      date: "2 weeks ago",
      verified: true,
      helpful: 18,
      avatar: "KI",
      appointmentDate: "Dec 25, 2024",
      replied: false
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating);
    const matchesSearch = review.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const responseRate = (reviews.filter(r => r.replied).length / reviews.length * 100);
  
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
        <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <Star className="w-8 h-8 mr-3 text-emerald-400" />
              Patient Reviews & Feedback
            </h1>
            <p className="text-gray-400">
              Manage and respond to patient reviews to build trust and improve your practice
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Export Reviews
          </button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-white">{averageRating.toFixed(1)}</p>
              <div className="flex items-center mt-2">
                {renderStars(Math.round(averageRating))}
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Reviews</p>
              <p className="text-3xl font-bold text-white">{totalReviews}</p>
              <p className="text-emerald-400 text-sm">+3 this week</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Response Rate</p>
              <p className="text-3xl font-bold text-white">{responseRate.toFixed(0)}%</p>
              <p className="text-amber-400 text-sm">3 pending replies</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Reply className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">5-Star Reviews</p>
              <p className="text-3xl font-bold text-white">{ratingDistribution[5]}</p>
              <p className="text-emerald-400 text-sm">{((ratingDistribution[5] / totalReviews) * 100).toFixed(0)}% of total</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rating Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-white mb-6">Rating Distribution</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center">
              <span className="text-sm text-gray-400 w-8">{rating}</span>
              <Star className="w-4 h-4 text-amber-400 fill-current mr-3" />
              <div className="flex-1 bg-gray-700 rounded-full h-3 mr-4">
                <div
                  className="bg-gradient-to-r from-amber-400 to-orange-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(ratingDistribution[rating] / totalReviews) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-400 w-12 text-right">
                {ratingDistribution[rating]} ({((ratingDistribution[rating] / totalReviews) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews by patient name or comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A0F1C] border border-gray-800/50 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="bg-[#0A0F1C] border border-gray-800/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#0A0F1C] border border-gray-800/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </motion.div>

      {/* Reviews List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        {sortedReviews.length === 0 ? (
          <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No reviews match your criteria</p>
          </div>
        ) : (
          sortedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6 hover:bg-gray-900/20 transition-colors"
            >
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center text-black font-bold flex-shrink-0">
                  {review.avatar}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <h4 className="font-semibold text-white mr-3">{review.patientName}</h4>
                      {review.verified && (
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-lg border border-emerald-500/20">
                          Verified Patient
                        </span>
                      )}
                      {!review.replied && (
                        <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-lg border border-amber-500/20 ml-2">
                          Needs Reply
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-sm">{review.date}</span>
                      <div className="text-gray-500 text-xs">Appointment: {review.appointmentDate}</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {renderStars(review.rating)}
                    <span className="text-gray-400 text-sm ml-2">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Existing Reply */}
                  {review.replied && review.reply && (
                    <div className="bg-gray-900/50 rounded-xl p-4 mb-4 border-l-4 border-emerald-500">
                      <div className="flex items-center mb-2">
                        <Reply className="w-4 h-4 text-emerald-400 mr-2" />
                        <span className="text-emerald-400 text-sm font-medium">Your Reply</span>
                      </div>
                      <p className="text-gray-300 text-sm">{review.reply}</p>
                    </div>
                  )}

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
                        <span className="text-sm">{review.replied ? 'Edit Reply' : 'Reply'}</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="flex items-center text-gray-400 hover:text-amber-400 transition-colors">
                        <Eye className="w-4 h-4 mr-1" />
                        <span className="text-sm">View Patient</span>
                      </button>
                      <button className="flex items-center text-gray-400 hover:text-red-400 transition-colors">
                        <Flag className="w-4 h-4 mr-1" />
                        <span className="text-sm">Flag</span>
                      </button>
                    </div>
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
                        placeholder="Write a professional and empathetic reply..."
                        defaultValue={review.replied ? review.reply : ''}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        rows={4}
                      />
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          onClick={() => setShowReplyForm(null)}
                          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                          {review.replied ? 'Update Reply' : 'Send Reply'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
