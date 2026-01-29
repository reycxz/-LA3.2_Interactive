import { useState } from 'react';
import './LoginDashboard.css';

// Reusable Input Component
const InputField = ({ label, type, value, onChange, error, placeholder }) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${error ? 'border-red' : 'border-gray'}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

// Reusable Button Component
const Button = ({ children, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${disabled ? 'btn-disabled' : 'btn-primary'}`}
    >
      {children}
    </button>
  );
};

// Card Container Component
const Card = ({ children, className = "" }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

// Login Form Component
const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Validation function using ES6 features
  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission with arrow function
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Mock authentication with setTimeout
      setTimeout(() => {
        // Mock credentials for demonstration
        if (email === 'admin@skyline.com' && password === 'admin123') {
          onLogin({ email, name: 'Admin User' });
        } else {
          setErrors({ 
            email: '', 
            password: 'Invalid credentials. Try admin@skyline.com / admin123' 
          });
          setIsLoading(false);
        }
      }, 1500);
    }
  };

  return (
    <Card className="login-card">
      <div className="logo-container">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="app-title">SkyLine Analytics</h1>
      </div>
      
      <div className="card-header">
        <h2 className="card-title">Welcome Back</h2>
        <p className="card-subtitle">Sign in to access your dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="you@example.com"
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="Enter your password"
        />

        <div className="form-footer">
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="card-footer">
        <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
      </div>

      <div className="demo-credentials">
        <p>🔐 Demo Credentials:</p>
        <p><strong>Email:</strong> admin@skyline.com</p>
        <p><strong>Password:</strong> admin123</p>
      </div>
    </Card>
  );
};

// Dashboard Component with destructuring
const Dashboard = ({ user, onLogout }) => {
  const { name, email } = user;
  const [stats] = useState([
    { label: 'Total Users', value: '2,543', change: '+12.5%', trend: 'up' },
    { label: 'Revenue', value: '$45,231', change: '+8.2%', trend: 'up' },
    { label: 'Active Sessions', value: '892', change: '-3.1%', trend: 'down' },
    { label: 'Conversions', value: '156', change: '+18.4%', trend: 'up' }
  ]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon small">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="brand-name">SkyLine Analytics</span>
          </div>
          <div className="user-section">
            <div className="user-info">
              <span className="user-name">{name}</span>
              <span className="user-email">{email}</span>
            </div>
            <Button onClick={onLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, {name.split(' ')[0]}! 👋</h1>
          <p className="welcome-subtitle">Here's what's happening with your analytics today</p>
        </div>

        <div className="stats-grid">
          {stats.map(({ label, value, change, trend }, index) => (
            <Card key={index} className="stat-card">
              <div className="stat-header">
                <span className="stat-label">{label}</span>
                <span className={`stat-change ${trend}`}>
                  {trend === 'up' ? '↗' : '↘'} {change}
                </span>
              </div>
              <div className="stat-value">{value}</div>
            </Card>
          ))}
        </div>

        <div className="content-grid">
          <Card className="chart-card">
            <h3 className="card-section-title">Recent Activity</h3>
            <div className="activity-list">
              {[
                { action: 'New user registered', time: '2 minutes ago', icon: '👤' },
                { action: 'Report generated', time: '15 minutes ago', icon: '📊' },
                { action: 'Data export completed', time: '1 hour ago', icon: '📥' },
                { action: 'System backup successful', time: '3 hours ago', icon: '💾' }
              ].map((activity, idx) => (
                <div key={idx} className="activity-item">
                  <span className="activity-icon">{activity.icon}</span>
                  <div className="activity-details">
                    <p className="activity-action">{activity.action}</p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="info-card">
            <h3 className="card-section-title">Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn">📈 View Reports</button>
              <button className="action-btn">⚙️ Settings</button>
              <button className="action-btn">👥 Manage Users</button>
              <button className="action-btn">📧 Send Notification</button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

// Main App Component with conditional rendering
const LoginDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Handle login with arrow function and destructuring
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // Conditional rendering using ternary operator
  return (
    <div className="app">
      {isLoggedIn ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <div className="login-container">
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default LoginDashboard;