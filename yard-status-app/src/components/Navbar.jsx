import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const tabs = [
    { to: '/', label: 'Machines' },
    { to: '#', label: 'Service' },
    { to: '#', label: 'Store' },
    { to: '#', label: 'Approvals' },
    { to: '#', label: 'Reports' },
    { to: '#', label: 'Masters' },
    { to: '#', label: 'Settings' },
  ];

  return (
    <nav className="navbar">
      <a className="navbar-logo" href="#" onClick={e => { e.preventDefault(); navigate('/'); }}>YARD</a>
      {tabs.map(t => (
        <NavLink
          key={t.label}
          to={t.to}
          className={({ isActive }) => `navbar-link${t.to === '/' && isActive ? ' active' : ''}`}
          end
        >
          {t.label}
        </NavLink>
      ))}
      <span className="navbar-spacer" />
      <div className="navbar-avatar">US</div>
    </nav>
  );
}
