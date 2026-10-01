import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import InternetPlans from '../components/InternetPlans';
import WhyChooseUs from '../components/WhyChooseUs';
import CustomerReviews from '../components/CustomerReviews';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <InternetPlans />
      <WhyChooseUs />
      <CustomerReviews />
      <CallToAction />
    </div>
  );
};

export default Home;