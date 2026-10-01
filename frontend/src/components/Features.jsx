import React from 'react';

const Features = () => {
  const featureList = [
    { title: "99.9% Network Uptime", desc: "Reliable fiber optical network with continuous connectivity." },
    { title: "Symmetric Speeds", desc: "Equal upload and download speeds for high performance." },
    { title: "Zero Setup Fee", desc: "Free installation on all annual subscription plans." },
    { title: "24/7 Tech Support", desc: "Dedicated customer support available anytime." }
  ];

  return (
    <section id="features" className="section container">
      <h2 className="section-title">Key Features</h2>
      <div className="grid-4">
        {featureList.map((item, index) => (
          <div key={index} className="feature-card">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;