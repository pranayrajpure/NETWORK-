import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [amount, setAmount] = useState(499);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const navigate = useNavigate();

  const plansList = [
    { name: 'Basic', speed: '50 Mbps', price: 499 },
    { name: 'Smart', speed: '100 Mbps', price: 699 },
    { name: 'Pro', speed: '200 Mbps', price: 999 },
    { name: 'Ultra', speed: '500 Mbps', price: 1499 }
  ];

  const handlePlanSelect = (planName, planPrice) => {
    setSelectedPlan(planName);
    setAmount(planPrice);
  };

  const handleTestPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first to process payment.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/payment/pay',
        { plan: selectedPlan, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData(response.data.payment);
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Payment failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#0b2545', marginBottom: '10px' }}>NETCONNECT ISP - Checkout</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '25px' }}>
          <span style={{ background: '#ffc107', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>TEST / SANDBOX MODE</span>
        </p>

        {successData ? (
          <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '6px', border: '1px solid #c8e6c9', textAlign: 'center' }}>
            <h3 style={{ color: '#2e7d32' }}>Payment Successful! 🎉</h3>
            <p><b>Payment ID:</b> {successData.paymentId}</p>
            <p><b>Plan Activated:</b> {successData.plan}</p>
            <p><b>Amount Paid:</b> ₹{successData.amount}</p>
            <p><b>Date:</b> {new Date(successData.date).toLocaleString()}</p>
            <button 
              onClick={() => navigate('/')}
              style={{ marginTop: '15px', padding: '10px 20px', background: '#0b2545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Return to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleTestPayment}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Select Broadband Plan:</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {plansList.map((p) => (
                  <div 
                    key={p.name}
                    onClick={() => handlePlanSelect(p.name, p.price)}
                    style={{
                      padding: '12px',
                      border: selectedPlan === p.name ? '2px solid #00a8e8' : '1px solid #ccc',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: selectedPlan === p.name ? '#f0f8ff' : '#fff'
                    }}
                  >
                    <strong>{p.name} ({p.speed})</strong>
                    <p style={{ margin: '5px 0 0', color: '#00a8e8', fontWeight: 'bold' }}>₹{p.price}/mo</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
              <h4>Order Summary</h4>
              <p style={{ margin: '5px 0' }}>Selected Plan: <b>{selectedPlan}</b></p>
              <p style={{ margin: '5px 0' }}>Total Payable Amount: <b style={{ color: '#28a745', fontSize: '18px' }}>₹{amount}</b></p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Sandbox Test Card Number (Mock)</label>
              <input type="text" value="4242 •••• •••• 4242" disabled style={{ width: '100%', padding: '10px', background: '#eee', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? 'Processing Sandbox Payment...' : `Pay ₹${amount} Now (Test)`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}