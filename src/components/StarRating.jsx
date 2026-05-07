import './StarRating.css';

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.round(rating)) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">★</span>);
    }
  }

  return (
    <div className="star-rating">
      {stars}
      <span className="rating-number">({rating})</span>
    </div>
  );
}

export default StarRating;