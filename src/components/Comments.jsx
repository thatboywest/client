// ReviewsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/review');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Error fetching reviews. Please try again.');
      }
    };

    fetchReviews();
  }, []); 
  return (
    <div>
      <h2>Reviews List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <h3>ID Number: {review.idNumber}</h3>
              <p>Review: {review.review}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewsList;
