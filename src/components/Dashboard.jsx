import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (!token || !storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
      setUsers(storedUsers);
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '800px' }}>
        <h1 className="text-center mb-4">Welcome, {user?.name || 'Guest'}!</h1>
        <h2 className="text-center mb-4">User Dashboard</h2>
        <button
          className="btn btn-danger mb-4"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;