import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isResetMode, setIsResetMode] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [resetForm, setResetForm] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [resetErrors, setResetErrors] = useState({});
  const navigate = useNavigate();

  const validateLogin = () => {
    const newErrors = {};
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else {
      const user = users.find(u => u.email === form.email && u.password === form.password);
      if (!user) {
        newErrors.form = 'Invalid email or password';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateReset = () => {
    const newErrors = {};
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!resetForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(resetForm.email)) {
      newErrors.email = 'Invalid email format';
    } else if (!users.some(u => u.email === resetForm.email)) {
      newErrors.email = 'Email not found';
    }
    if (!resetForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (resetForm.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (resetForm.newPassword !== resetForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setResetErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === form.email && u.password === form.password);
      const token = btoa(JSON.stringify({ email: form.email, timestamp: Date.now() }));
      localStorage.setItem('authToken', token);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setForm({ email: '', password: '' });
      navigate('/dashboard');
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (validateReset()) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.email === resetForm.email);
      users[userIndex].password = resetForm.newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Password reset successful! Please login with your new password.');
      setResetForm({ email: '', newPassword: '', confirmPassword: '' });
      setResetErrors({});
      setIsResetMode(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">{isResetMode ? 'Reset Password' : 'Login'}</h2>
        {isResetMode ? (
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={resetForm.email}
                onChange={(e) => setResetForm({ ...resetForm, email: e.target.value })}
              />
              {resetErrors.email && <div className="text-danger small mt-1">{resetErrors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={resetForm.newPassword}
                onChange={(e) => setResetForm({ ...resetForm, newPassword: e.target.value })}
              />
              {resetErrors.newPassword && <div className="text-danger small mt-1">{resetErrors.newPassword}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm new password"
                value={resetForm.confirmPassword}
                onChange={(e) => setResetForm({ ...resetForm, confirmPassword: e.target.value })}
              />
              {resetErrors.confirmPassword && <div className="text-danger small mt-1">{resetErrors.confirmPassword}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Reset Password</button>
            <p className="text-center mt-3 small">
              <a href="#" className="text-primary" onClick={(e) => { e.preventDefault(); setIsResetMode(false); }}>
                Back to Login
              </a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
            </div>
            {errors.form && <div className="alert alert-danger small mt-1 text-center">{errors.form}</div>}
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <p className="text-center mt-3 small">
              <a href="#" className="text-primary" onClick={(e) => { e.preventDefault(); setIsResetMode(true); }}>
                Forgot Password?
              </a>
            </p>
            <p className="text-center mt-2 small">
              Don't have an account yet?{' '}
              <a href="/" className="text-primary" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                Create your free account now
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;