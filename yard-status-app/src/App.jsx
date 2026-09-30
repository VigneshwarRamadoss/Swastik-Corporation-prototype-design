import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import FigmaFlowSimplified from './pages/FigmaFlowSimplified';
import FigmaScreensNewLabels from './pages/FigmaScreensNewLabels';
import YardStatusMockups from './pages/YardStatusMockups';

function ShowcaseLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#dcdcdf', color: '#1e293b' }}>
      {/* Light theme header matching original HTML design */}
      <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', borderBottom: '1px solid #cbd5e1', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>Yard Status UI</div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.05em', color: '#64748b' }}>FIGMA MOCKUPS SHOWCASE</div>
          </div>
        </div>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { to: '/flow-simplified', n: '1', label: 'Simplified Flow' },
            { to: '/screens-new-labels', n: '2', label: 'Screen Labels' },
            { to: '/status-mockups', n: '3', label: 'Full Mockups' }
          ].map(t => (
            <NavLink
              key={t.to}
              to={t.to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 6,
                background: isActive ? '#f1f5f9' : 'transparent',
                color: isActive ? '#0f172a' : '#64748b',
                textDecoration: 'none', fontWeight: 600, fontSize: 14,
                border: isActive ? '1px solid #cbd5e1' : '1px solid transparent'
              })}
            >
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#cbd5e1', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{t.n}</span>
              {t.label}
            </NavLink>
          ))}
        </div>
        
      </div>

      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ShowcaseLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/flow-simplified" replace />} />
          <Route path="/flow-simplified" element={<FigmaFlowSimplified />} />
          <Route path="/screens-new-labels" element={<FigmaScreensNewLabels />} />
          <Route path="/status-mockups" element={<YardStatusMockups />} />
        </Routes>
      </ShowcaseLayout>
    </BrowserRouter>
  );
}
