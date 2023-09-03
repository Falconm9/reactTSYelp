import React from 'react';
import './rating.css'

interface RateProps {
  rating: number;
}

const RatingComponent: React.FC<RateProps> = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<span key={i} className="full">&#9733;</span>);
    } else if (i === Math.floor(rating) && rating % 1 !== 0) {
      stars.push(<span key={i} className="half">&#9733;</span>);
    } else {
      stars.push(<span key={i}>&#9733;</span>);
    }
  }

  return <div className="rating">{stars}</div>;
};

const StarRating: React.FC<RateProps> = ({rating}) => {
  return (
    <>
      <RatingComponent rating={rating} />
    </>
  );
};

export default StarRating;