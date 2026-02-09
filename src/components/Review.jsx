import React from 'react';
import reviewData from '../data/reviews.json';
import '../styles/Review.css';

const Review = () => {
  return (
    <div className="review-container">
      <h2 className="review-title">상품 리뷰</h2>
      
      {reviewData.map((review) => (
        <div key={review.id} className="review-card">
          {/* 유저 섹션 */}
          <div className="user-section">
            <div className="profile-img">PHOTO</div>
            <span className="username">{review.user}</span>
          </div>

          {/* 콘텐츠 섹션 */}
          <div className="content-section">
            <div className="rating-stars">
              {"🤎".repeat(review.rating)} {review.rating}
            </div>
            
            {/* 데이터에서 옵션을 직접 가져오도록 변경 */}
            <div className="option-box">
              선택한 옵션 : {review.option} - <span className="option-highlight">{review.status}</span>
            </div>

            <div className="review-comment">
              {review.comment}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;