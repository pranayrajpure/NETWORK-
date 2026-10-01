import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    plan: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [strengthText, setStrengthText] = useState('None');
  const [rating, setRating] = useState(1);
  const [ratingText, setRatingText] = useState('Poor 😞 (1 / 5 Stars)');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // jQuery effect for live password strength checking (Lab 2)
  useEffect(() => {
    $('#password-input').on('keyup', function() {
      const val = $(this).val();
      let score = 0;
      if (val.length > 5) score++;
      if (val.match(/[A-Z]/)) score++;
      if (val.match(/[0-9]/)) score++;
      if (val.match(/[^a-zA-Z0-9]/)) score++;

      if (val.length === 0) {
        setStrengthText('None');
      } else if (score < 2) {
        setStrengthText('Weak');
      } else if (score === 2 || score === 3) {
        setStrengthText('Moderate');
      } else {
        setStrengthText('Strong');
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (stars) => {
    setRating(stars);
    const descriptions = {
      1: 'Poor 😞 (1 / 5 Stars)',
      2: 'Fair 😐 (2 / 5 Stars)',
      3: 'Good 🙂 (3 / 5 Stars)',
      4: 'Very Good 😊 (4 / 5 Stars)',
      5: 'Excellent 🤩 (5 / 5 Stars)'
    };
    setRatingText(descriptions[stars]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setError('You must agree to the Terms and Conditions');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        plan: formData.plan,
        rating: rating
      });
      
      alert('Registration Successful!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Customer Registration</h2>
        {error && <p style={styles.error}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mobile Number:</label>
            <input type="text" name="mobile" placeholder="10-digit number" value={formData.mobile} onChange={handleChange} required style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Address:</label>
            <textarea name="address" rows="3" value={formData.address} onChange={handleChange} required style={styles.textarea}></textarea>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Internet Plan:</label>
            <select name="plan" value={formData.plan} onChange={handleChange} required style={styles.input}>
              <option value="">-- Choose a Plan --</option>
              <option value="Basic">Basic: 50 Mbps - ₹499/month</option>
              <option value="Smart">Smart: 100 Mbps - ₹699/month</option>
              <option value="Pro">Pro: 200 Mbps - ₹999/month</option>
              <option value="Ultra">Ultra: 500 Mbps - ₹1499/month</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password-input" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                style={{ ...styles.input, flex: 1 }} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                style={styles.showBtn}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <small style={styles.strength}>Strength: {strengthText}</small>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required style={styles.input} />
          </div>

          {/* Rating Section */}
          <div style={styles.ratingCard}>
            <label style={{ ...styles.label, textAlign: 'center', marginBottom: '0.5rem' }}>Rate Our Service Website:</label>
            <div style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  onClick={() => handleRatingChange(star)} 
                  style={{ 
                    cursor: 'pointer', 
                    fontSize: '28px', 
                    color: star <= rating ? '#fbbf24' : '#cbd5e1' 
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p style={styles.ratingText}>{ratingText}</p>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div style={styles.checkboxGroup}>
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreed} 
              onChange={(e) => setAgreed(e.target.checked)} 
            />
            <label htmlFor="terms" style={{ fontSize: '15px', color: '#1e293b', fontWeight: '500' }}>
              I agree to the Terms and Conditions
            </label>
          </div>

          <button type="submit" style={styles.submitBtn}>Register Account</button>
        </form>

        <p style={styles.footerText}>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem', backgroundColor: '#f8f9fa' },
  card: { backgroundColor: '#fff', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%', maxWidth: '520px' },
  title: { marginBottom: '1.5rem', textAlign: 'center', color: '#0f172a', fontSize: '24px', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontWeight: '600', color: '#1e293b', fontSize: '14px' },
  input: { padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', width: '100%' },
  textarea: { padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', width: '100%', resize: 'vertical' },
  passwordWrapper: { display: 'flex', gap: '10px', alignItems: 'center' },
  showBtn: { backgroundColor: '#64748b', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '4px', cursor: 'pointer', height: '42px', fontWeight: '500' },
  strength: { fontWeight: 'bold', color: '#0284c7', fontSize: '13px', marginTop: '2px' },
  ratingCard: { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  starsContainer: { display: 'flex', gap: '8px', marginBottom: '4px' },
  ratingText: { fontSize: '13px', fontWeight: 'bold', color: '#0284c7', marginTop: '4px' },
  checkboxGroup: { display: 'flex', alignItems: 'center', gap: '10px', margin: '5px 0' },
  submitBtn: { backgroundColor: '#16a34a', color: '#fff', padding: '0.85rem', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', width: '100%', transition: 'background 0.2s' },
  error: { color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '14px', fontWeight: '500' },
  footerText: { marginTop: '1.5rem', textAlign: 'center', fontSize: '14px', color: '#64748b' }
};

export default Register;