import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MACHINES, STATUS_COUNTS, STATUSES } from '../data/sampleData';
import StatusBadge from '../components/StatusBadge';

const SEARCH_ICON = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="1.5" strokeLinecap="round"><path d="M11 3a8 8 0 1 0 0 16a8 8 0 1 0 0-16zM21 21l-4.3-4.3" /></svg>;
const CHEVRON = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>;

export default function FleetDashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(() => {
    return MACHINES.filter(m => {
      const matchesQuery = !query || m.serial.toLowerCase().includes(query.toLowerCase()) ||
        m.make.toLowerCase().includes(query.toLowerCase()) || m.model.toLowerCase().includes(query.toLowerCase()) ||
        m.id.includes(query);
      const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const total = Object.values(STATUS_COUNTS).reduce((a, b) => a + b, 0);

  return (
    <div className="page">
      {/* Title */}
      <div className="page-subtitle">You are here: all machines</div>
      <h1 className="page-title" style={{ marginBottom: 20 }}>
        Machines <span style={{ fontWeight: 400, color: 'var(--color-neutral-600)' }}>{total}</span>
      </h1>

      {/* Status tiles */}
      <div className="status-tiles">
        {Object.entries(STATUS_COUNTS).map(([label, count]) => {
          const dot = STATUSES[label]?.solid || 'var(--color-neutral-400)';
          return (
            <div
              key={label}
              className={`status-tile${statusFilter === label ? ' active' : ''}`}
              onClick={() => setStatusFilter(statusFilter === label ? 'All' : label)}
            >
              <span className="status-tile-label">
                <span className="status-dot" style={{ background: dot }} />
                {label}
              </span>
              <span className="status-tile-count">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Search row */}
      <div className="search-row">
        <div className="search-input">
          {SEARCH_ICON}
          <input
            placeholder="Search by serial number, e.g. XXX"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="filter-select">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">Status: All</option>
            {Object.keys(STATUS_COUNTS).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button className="btn btn-clear" onClick={() => { setQuery(''); setStatusFilter('All'); }}>Clear</button>
      </div>

      {/* Machine table */}
      <div className="data-table">
        <div className="data-table-header machine-cols">
          <span>Make · Model</span><span>Category</span><span>Mach. no.</span>
          <span>Serial no.</span><span>Year</span><span>OFM no.</span>
          <span>Customer</span><span>Status · last update</span><span></span>
        </div>
        {filtered.map((m, i) => (
          <div
            key={m.id}
            className={`data-table-row machine-cols${i === 0 && statusFilter === 'All' && !query ? ' highlighted' : ''}`}
            onClick={() => navigate(`/machine/${m.id}`)}
          >
            <span style={{ fontSize: 15, fontWeight: 600 }}>{m.make} {m.model}</span>
            <span>
              <span style={{ display: 'block' }}>{m.cat}</span>
              <span style={{ display: 'block', fontSize: 12.5, color: 'var(--color-neutral-700)' }}>{m.sub}</span>
            </span>
            <span>{m.id}</span>
            <span className="font-mono" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.serial}</span>
            <span>{m.year}</span>
            <span>{m.ofm}</span>
            <span>{m.customer}</span>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <StatusBadge status={m.status} />
              <span style={{ fontSize: 12.5, color: 'var(--color-neutral-700)' }}>{m.since}</span>
            </span>
            {CHEVRON}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--color-neutral-700)' }}>
            No machines match. Try another status or clear the search.
          </div>
        )}
      </div>
      <div style={{ marginTop: 8, fontSize: 13.5, color: 'var(--color-neutral-700)' }}>
        Tap any row to open that machine.
      </div>
    </div>
  );
}
