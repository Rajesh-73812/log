import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetForm, setResetForm] = useState({ email: '', newPassword: '', confirmPassword: '' });
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === form.email && u.password === form.password);
      const token = btoa(JSON.stringify({ email: form.email, timestamp: Date.now() })); // Simple base64 token
      localStorage.setItem('authToken', token);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setForm({ email: '', password: '' });
      navigate('/dashboard');
    }
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
    } else if (resetForm.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (resetForm.newPassword !== resetForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setResetErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = () => {
    if (validateReset()) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.email === resetForm.email);
      users[userIndex].password = resetForm.newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Password reset successful! Please login with your new password.');
      setShowResetModal(false);
      setResetForm({ email: '', newPassword: '', confirmPassword: '' });
      setResetErrors({});
    }
  };

  return (
    <div className="auth-container max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        {errors.form && <p className="text-red-500 text-sm mt-1 text-center">{errors.form}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
      {/* <button
        className="block w-full text-center text-blue-500 mt-3 hover:underline"
        onClick={() => setShowResetModal(true)}
      >
        Forgot Password?
      </button> */}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Enter your email"
                  value={resetForm.email}
                  onChange={(e) => setResetForm({ ...resetForm, email: e.target.value })}
                />
                {resetErrors.email && <p className="text-red-500 text-sm mt-1">{resetErrors.email}</p>}
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Enter new password"
                  value={resetForm.newPassword}
                  onChange={(e) => setResetForm({ ...resetForm, newPassword: e.target.value })}
                />
                {resetErrors.newPassword && <p className="text-red-500 text-sm mt-1">{resetErrors.newPassword}</p>}
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Confirm new password"
                  value={resetForm.confirmPassword}
                  onChange={(e) => setResetForm({ ...resetForm, confirmPassword: e.target.value })}
                />
                {resetErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{resetErrors.confirmPassword}</p>}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  onClick={() => {
                    setShowResetModal(false);
                    setResetForm({ email: '', newPassword: '', confirmPassword: '' });
                    setResetErrors({});
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleResetPassword}
                >Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;