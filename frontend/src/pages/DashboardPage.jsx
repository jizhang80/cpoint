import React from 'react';
import { useAuth } from '../context/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.firstName}!</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Profile Information</h3>
            <div className="profile-info">
              <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Member since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="btn btn-primary">Update Profile</button>
              <button className="btn">Settings</button>
              <button className="btn">Help</button>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <p>Account created</p>
              <p>Profile updated</p>
              <p>Login successful</p>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Statistics</h3>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">1</span>
                <span className="stat-label">Total Logins</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Messages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;