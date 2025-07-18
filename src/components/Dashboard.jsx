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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome, {user?.name || 'Guest'}!</h1>
      <h2 className="text-2xl font-semibold text-center mb-4">User Dashboard</h2>
      <button
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
      
    </div>
  );
};

export default Dashboard;