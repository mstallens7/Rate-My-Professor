import StarRating from './StarRating';
import './ProfessorCard.css';

function ProfessorCard({ name, department, rating, reviews, onAddReview }) {
  const latestReview = reviews.length > 0
    ? reviews[reviews.length - 1].text
    : "No reviews yet.";

  return (
    <div className="professor-card">
      <div className="card-header">
        <div className="card-avatar">
          {name.charAt(0)}
        </div>
        <div className="card-info">
          <h3 className="card-name">{name}</h3>
          <p className="card-department">{department}</p>
          <StarRating rating={rating} />
        </div>
      </div>
      <p className="card-review">"{latestReview}"</p>
      <button className="card-button" onClick={onAddReview}>
        Add Review
      </button>
    </div>
  );
}

export default ProfessorCard;