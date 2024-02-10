// ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './Reviewform.css'

const ReviewForm = () => {
  const [idNumber, setIdNumber] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/review', {
        idNumber: idNumber,
        review: review,
      });

      console.log('Review posted successfully:', response.data);
          
      setIdNumber('');
      setReview('');
      setError('');
    } catch (err) {
      console.error('Error posting review:', err);
      setError('Error posting review. Please try again.');
    }
  };

  return (
    <div className="review-form">
      <h2>Post a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID Number:
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ReviewForm;
