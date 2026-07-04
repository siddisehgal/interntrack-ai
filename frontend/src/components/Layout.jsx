import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, interviews: 0, offers: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) return;

    api.get('/auth/me').then(r => setUser(r.data)).catch(() => {});

    api.get('/internships/').then(r => {
      const data = r.data;
      if (!Array.isArray(data)) return;
      setStats({
        total: data.length,
        interviews: data.filter(i => i.status === 'Interviewing').length,
        offers: data.filter(i => i.status === 'Offer').length,
      });
    }).catch(() => {});
  }, []);

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'S';

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: '📊', label: 'Dashboard' },
    { to: '/internships', icon: '📋', label: 'Applications' },
    { to: '/resume', icon: '📄', label: 'Resume Analyzer' },
    { to: '/ai', icon: '🤖', label: 'AI Assistant' },
    { to: '/prep', icon: '🎯', label: 'Interview Prep' },
  ];

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <div className="brand">InternTrack AI</div>

        {/* Profile card */}
        <div className="sidebar-profile">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-profile-info">
            <span className="sidebar-name">{user?.full_name ?? 'Student'}</span>
            <span className="sidebar-role">{user?.branch ?? 'Computer Science'} • {user?.year ? `Year ${user.year}` : 'Student'}</span>
            <span className="sidebar-badge">ACTIVE CANDIDATE</span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="app-shell__nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar stats */}
        <div className="sidebar-stats">
          <div className="sidebar-stat">
            <strong>{stats.total}</strong>
            <span>Applications</span>
          </div>
          <div className="sidebar-stat">
            <strong>{stats.interviews}</strong>
            <span>Interviews</span>
          </div>
          <div className="sidebar-stat">
            <strong>{stats.offers}</strong>
            <span>Offers</span>
          </div>
        </div>

        <button className="sidebar-logout" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="app-shell__content">
        {children}
      </main>
    </div>
  );
}