import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <h1>Ultra-Fast Fiber Broadband For Your Home & Office</h1>
        <p className="tagline">"Connect Better. Live Faster."</p>
        <p style={{ marginBottom: '30px' }}>Experience seamless 4K streaming, low-latency gaming, and unlimited high-speed data.</p>
        <div className="hero-buttons">
          <a href="#plans" className="btn-primary">View Plans</a>
          <a href="#register" className="btn-secondary">Get Connected</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;