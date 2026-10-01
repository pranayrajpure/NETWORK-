import React from 'react';

const CustomerReviews = () => {
  const reviews = [
    { name: "Rahul Sharma", rating: "★★★★★", comment: "Outstanding speed! Smart plan 100Mbps gives continuous performance." },
    { name: "Priya Patel", rating: "★★★★★", comment: "Customer support resolved my queries quickly. Highly recommended ISP!" },
    { name: "Amit Verma", rating: "★★★★☆", comment: "Ultra plan 500Mbps is awesome for my work-from-home setup." }
  ];

  return (
    <section id="reviews" className="section container">
      <h2 className="section-title">Customer Reviews</h2>
      <div className="grid-3">
        {reviews.map((rev, index) => (
          <div key={index} className="review-card">
            <div className="review-stars">{rev.rating}</div>
            <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>"{rev.comment}"</p>
            <strong>- {rev.name}</strong>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;