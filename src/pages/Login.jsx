import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === form.email && u.password === form.password);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setForm({ email: '', password: '' });
      navigate('/dashboard');
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
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
            <a href="/forgot-password" className="text-primary" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
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
      </div>
    </div>
  );
};

export default Login;