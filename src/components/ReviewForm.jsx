import { useState } from 'react';
import './ReviewForm.css';

function ReviewForm({ professorName, onSubmit, onCancel }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  function handleSubmit() {
    if (rating === 0 || text.trim() === '') return;
    onSubmit({ rating, text });
    setRating(0);
    setText('');
  }

  return (
    <div className="review-form">
      <p className="form-label">Rating for {professorName}</p>
      <div className="star-input">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star-select ${star <= (hoveredStar || rating) ? 'active' : ''}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
          >
            ★
          </span>
        ))}
      </div>

      <p className="form-label">Your Review</p>
      <textarea
        className="form-textarea"
        placeholder="Write your review here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
      />

      <div className="form-buttons">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button
          className="btn-submit"
          onClick={handleSubmit}
          disabled={rating === 0 || text.trim() === ''}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default ReviewForm;