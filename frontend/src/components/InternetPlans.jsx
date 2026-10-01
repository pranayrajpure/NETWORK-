import React from 'react';
import { useNavigate } from 'react-router-dom';

const InternetPlans = () => {
  const navigate = useNavigate();

  const plans = [
    { name: "Basic", speed: "50 Mbps", price: 499, popular: false },
    { name: "Smart", speed: "100 Mbps", price: 699, popular: true },
    { name: "Pro", speed: "200 Mbps", price: 999, popular: false },
    { name: "Ultra", speed: "500 Mbps", price: 1499, popular: false }
  ];

  const handleSelectPlan = (planName, planPrice) => {
    // Save selected plan details for the Payment page
    localStorage.setItem('selectedPlan', planName);
    localStorage.setItem('selectedAmount', planPrice);
    
    // Redirect to Payment page
    navigate('/payment');
  };

  return (
    <section id="plans" className="section plans-section">
      <div className="container">
        <h2 className="section-title">Our Broadband Plans</h2>
        <div className="grid-plans">
          {plans.map((plan, index) => (
            <div key={index} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <span className="badge">MOST POPULAR</span>}
              <h3>{plan.name}</h3>
              <div className="plan-speed">{plan.speed}</div>
              <div className="plan-price">₹{plan.price}/month</div>
              <ul className="plan-features">
                <li>Unlimited Data</li>
                <li>Free Dual-Band Router</li>
                <li>Symmetric Upload/Download</li>
              </ul>
              <button 
                className="btn-primary" 
                style={{ width: '100%' }}
                onClick={() => handleSelectPlan(plan.name, plan.price)}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternetPlans;