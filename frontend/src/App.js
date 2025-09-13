import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Instagram, Linkedin, Twitter, TrendingUp, Loader2, RefreshCw, Users, BarChart3, Home, Settings, Menu, X } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './App.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const API_BASE_URL = 'http://localhost:8000';

// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <TrendingUp size={24} />
          <span>follow.me</span>
        </Link>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Home size={18} />
            Dashboard
          </Link>
          <Link 
            to="/instagram" 
            className={`navbar-link ${location.pathname === '/instagram' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Instagram size={18} />
            Instagram
          </Link>
          <Link 
            to="/linkedin" 
            className={`navbar-link ${location.pathname === '/linkedin' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Linkedin size={18} />
            LinkedIn
          </Link>
          <Link 
            to="/twitter" 
            className={`navbar-link ${location.pathname === '/twitter' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Twitter size={18} />
            X (Twitter)
          </Link>
        </div>

        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
};

// Platform Card Component
const PlatformCard = ({ platform, data, loading, onRefresh, onToggle, isSelected, username, onUsernameChange }) => {
  const platformConfig = {
    instagram: {
      name: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      placeholder: 'Enter Instagram username'
    },
    linkedin: {
      name: 'LinkedIn', 
      icon: Linkedin,
      color: '#0077B5',
      placeholder: 'Enter LinkedIn username'
    },
    twitter: {
      name: 'X (Twitter)',
      icon: Twitter,
      color: '#000000',
      placeholder: 'Enter X username'
    }
  };

  const config = platformConfig[platform];
  const Icon = config.icon;

  const formatNumber = (num) => {
    if (!num) return '0';
    const number = parseInt(num);
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
  };

  return (
    <div className={`platform-card ${isSelected ? 'selected' : 'unselected'}`}>
      <div className="platform-header">
        <div className="platform-info">
          <Icon size={24} style={{ color: config.color }} />
          <h3>{config.name}</h3>
        </div>
        <div className="platform-controls">
          <button
            className={`toggle-btn ${isSelected ? 'active' : ''}`}
            onClick={onToggle}
            title={isSelected ? 'Disable platform' : 'Enable platform'}
          >
            {isSelected ? 'ON' : 'OFF'}
          </button>
          {isSelected && (
            <button
              className="refresh-btn-small"
              onClick={onRefresh}
              disabled={loading || !username.trim()}
              title="Refresh data"
            >
              <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            </button>
          )}
        </div>
      </div>

      {isSelected && (
        <>
          <div className="platform-input">
            <input
              type="text"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              placeholder={config.placeholder}
              className="platform-username-input"
            />
          </div>

          <div className="platform-stats">
            {loading ? (
              <div className="loading-state">
                <Loader2 className="loading-spinner" />
                <span>Fetching data...</span>
              </div>
            ) : data ? (
              data.error ? (
                <div className="error-state">
                  <span className="error-text">{data.error}</span>
                </div>
              ) : (
                <div className="success-state">
                  <div className="follower-count-large">{formatNumber(data.followers)}</div>
                  <div className="follower-label">followers</div>
                  <div className="username-display">@{data.username}</div>
                </div>
              )
            ) : (
              <div className="empty-state-small">
                <span>Enter username and refresh to see data</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [platformData, setPlatformData] = useState({
    instagram: { username: '', data: null, loading: false, selected: true },
    linkedin: { username: '', data: null, loading: false, selected: true },
    twitter: { username: '', data: null, loading: false, selected: true }
  });

  const updatePlatform = (platform, updates) => {
    setPlatformData(prev => ({
      ...prev,
      [platform]: { ...prev[platform], ...updates }
    }));
  };

  const fetchPlatformData = async (platform) => {
    const platformState = platformData[platform];
    if (!platformState.username.trim()) return;

    updatePlatform(platform, { loading: true });

    try {
      const requestData = {};
      requestData[`${platform}_username`] = platformState.username.trim();
      
      const response = await axios.post(`${API_BASE_URL}/followers`, requestData);
      const data = response.data[platform];
      
      updatePlatform(platform, { data, loading: false });
    } catch (error) {
      updatePlatform(platform, { 
        data: { error: 'Failed to fetch data' }, 
        loading: false 
      });
    }
  };

  const refreshAll = async () => {
    const selectedPlatforms = Object.keys(platformData).filter(
      platform => platformData[platform].selected && platformData[platform].username.trim()
    );

    if (selectedPlatforms.length === 0) return;

    // Set loading for all selected platforms
    selectedPlatforms.forEach(platform => {
      updatePlatform(platform, { loading: true });
    });

    try {
      const requestData = {};
      selectedPlatforms.forEach(platform => {
        requestData[`${platform}_username`] = platformData[platform].username.trim();
      });

      const response = await axios.post(`${API_BASE_URL}/followers`, requestData);
      
      selectedPlatforms.forEach(platform => {
        const data = response.data[platform];
        updatePlatform(platform, { data, loading: false });
      });
    } catch (error) {
      selectedPlatforms.forEach(platform => {
        updatePlatform(platform, { 
          data: { error: 'Failed to fetch data' }, 
          loading: false 
        });
      });
    }
  };

  const getTotalFollowers = () => {
    let total = 0;
    Object.keys(platformData).forEach(platform => {
      const state = platformData[platform];
      if (state.selected && state.data && !state.data.error) {
        total += parseInt(state.data.followers) || 0;
      }
    });
    return total;
  };

  const getChartData = () => {
    const data = [];
    const labels = [];
    const colors = [];
    
    const platformColors = {
      instagram: '#E4405F',
      linkedin: '#0077B5', 
      twitter: '#000000'
    };

    const platformNames = {
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      twitter: 'X (Twitter)'
    };

    Object.keys(platformData).forEach(platform => {
      const state = platformData[platform];
      if (state.selected && state.data && !state.data.error) {
        const followers = parseInt(state.data.followers) || 0;
        if (followers > 0) {
          data.push(followers);
          labels.push(platformNames[platform]);
          colors.push(platformColors[platform]);
        }
      }
    });

    if (data.length === 0) return null;

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
        borderColor: colors.map(color => color + '20'),
        borderWidth: 2,
      }]
    };
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const totalFollowers = getTotalFollowers();
  const chartData = getChartData();
  const selectedCount = Object.values(platformData).filter(p => p.selected).length;
  const hasData = Object.values(platformData).some(p => p.selected && p.data && !p.data.error);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Social Media Dashboard</h1>
          <p>Track your follower counts across all platforms in real-time</p>
        </div>
        <div className="header-actions">
          <button 
            className="refresh-all-btn"
            onClick={refreshAll}
            disabled={selectedCount === 0}
          >
            <RefreshCw size={18} />
            Refresh All ({selectedCount})
          </button>
        </div>
      </div>

      {hasData && (
        <div className="dashboard-stats">
          <div className="stats-card total-card">
            <div className="stat-icon">
              <Users size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{formatNumber(totalFollowers)}</div>
              <div className="stat-label">Total Followers</div>
            </div>
          </div>

          {chartData && (
            <div className="stats-card chart-card">
              <div className="chart-header">
                <div className="stat-icon">
                  <BarChart3 size={28} />
                </div>
                <div>
                  <div className="chart-title">Distribution</div>
                  <div className="chart-subtitle">Across platforms</div>
                </div>
              </div>
              <div className="chart-container">
                <Pie 
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 15,
                          usePointStyle: true,
                          font: { size: 11 }
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return `${context.label}: ${formatNumber(context.raw)} (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="platforms-grid">
        {Object.keys(platformData).map(platform => (
          <PlatformCard
            key={platform}
            platform={platform}
            data={platformData[platform].data}
            loading={platformData[platform].loading}
            isSelected={platformData[platform].selected}
            username={platformData[platform].username}
            onUsernameChange={(username) => updatePlatform(platform, { username })}
            onRefresh={() => fetchPlatformData(platform)}
            onToggle={() => updatePlatform(platform, { 
              selected: !platformData[platform].selected,
              data: null // Clear data when toggling off
            })}
          />
        ))}
      </div>
    </div>
  );
};

// Individual Platform Pages
const PlatformPage = ({ platform }) => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const platformConfig = {
    instagram: { name: 'Instagram', icon: Instagram, color: '#E4405F' },
    linkedin: { name: 'LinkedIn', icon: Linkedin, color: '#0077B5' },
    twitter: { name: 'X (Twitter)', icon: Twitter, color: '#000000' }
  };

  const config = platformConfig[platform];
  const Icon = config.icon;

  const fetchData = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    try {
      const requestData = {};
      requestData[`${platform}_username`] = username.trim();
      
      const response = await axios.post(`${API_BASE_URL}/followers`, requestData);
      setData(response.data[platform]);
    } catch (error) {
      setData({ error: 'Failed to fetch data' });
    }
    setLoading(false);
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    const number = parseInt(num);
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
  };

  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div className="platform-page-title">
          <Icon size={32} style={{ color: config.color }} />
          <h1>{config.name} Analytics</h1>
        </div>
      </div>

      <div className="platform-page-content">
        <div className="platform-page-card">
          <div className="input-section">
            <label>Enter your {config.name} username:</label>
            <div className="input-with-button">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={`${platform} username`}
                className="platform-page-input"
                onKeyPress={(e) => e.key === 'Enter' && fetchData()}
              />
              <button 
                onClick={fetchData}
                disabled={loading || !username.trim()}
                className="fetch-btn"
              >
                {loading ? <Loader2 className="loading-spinner" /> : <TrendingUp size={18} />}
                {loading ? 'Fetching...' : 'Get Data'}
              </button>
            </div>
          </div>

          {data && (
            <div className="platform-page-results">
              {data.error ? (
                <div className="error-state-large">
                  <span>{data.error}</span>
                </div>
              ) : (
                <div className="success-state-large">
                  <div className="follower-count-xl">{formatNumber(data.followers)}</div>
                  <div className="follower-label-large">followers</div>
                  <div className="username-display-large">@{data.username}</div>
                  <button 
                    onClick={fetchData}
                    disabled={loading}
                    className="refresh-btn-large"
                  >
                    <RefreshCw size={18} />
                    Refresh Data
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/instagram" element={<PlatformPage platform="instagram" />} />
            <Route path="/linkedin" element={<PlatformPage platform="linkedin" />} />
            <Route path="/twitter" element={<PlatformPage platform="twitter" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 