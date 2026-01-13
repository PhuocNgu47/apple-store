import React, { useState, useEffect } from 'react';
import { productAPI } from '../api';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';
import { formatDate } from '../utils';

export default function ProductReviews({ productId, productRating, onReviewAdded }) {
  const user = useAuthStore(state => state.user);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: ''
  });
  const [pagination, setPagination] = useState(null);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    fetchReviews();
  }, [productId, sort]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getReviews(productId, {
        page: 1,
        limit: 10,
        sort
      });
      setReviews(response.data.reviews || []);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      toast.error('Không thể tải đánh giá');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Vui lòng đăng nhập để đánh giá');
      return;
    }

    if (!formData.rating) {
      toast.error('Vui lòng chọn số sao');
      return;
    }

    try {
      setSubmitting(true);
      const response = await productAPI.addReview(productId, formData);
      toast.success('Đánh giá thành công!');
      setFormData({ rating: 5, comment: '' });
      setShowForm(false);
      fetchReviews();
      if (onReviewAdded) {
        onReviewAdded(response.data.product);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`text-2xl ${
              star <= rating
                ? 'text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'hover:scale-110 transition cursor-pointer' : ''}`}
            disabled={!interactive}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="space-y-4">
        <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">Đánh Giá Sản Phẩm</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{productRating?.toFixed(1) || '0.0'}</span>
              <div className="flex flex-col">
                {renderStars(Math.round(productRating || 0))}
                <span className="text-sm text-gray-500">
                  {pagination?.total || 0} đánh giá
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="highest">Đánh giá cao</option>
            <option value="lowest">Đánh giá thấp</option>
          </select>
          {user && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {showForm ? 'Hủy' : '+ Viết đánh giá'}
            </button>
          )}
        </div>
      </div>

      {/* Review Form */}
      {showForm && user && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Đánh giá của bạn</label>
            {renderStars(formData.rating, true, (rating) =>
              setFormData({ ...formData, rating })
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Nhận xét</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormData({ rating: 5, comment: '' });
              }}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      {!user && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-blue-800">
            Vui lòng <a href="/login" className="underline font-semibold">đăng nhập</a> để viết đánh giá
          </p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Chưa có đánh giá nào</p>
            <p className="text-sm mt-2">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
          </div>
        ) : (
          reviews.map((review, idx) => (
            <div key={idx} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold text-gray-900">
                    {review.user?.name || 'Người dùng'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-600">({review.rating}/5)</span>
                </div>
              </div>
              {review.comment && (
                <p className="text-gray-700 mt-2 leading-relaxed">{review.comment}</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={!pagination.hasPrev}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          <span className="px-4 py-2">
            Trang {pagination.page} / {pagination.pages}
          </span>
          <button
            disabled={!pagination.hasNext}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}

