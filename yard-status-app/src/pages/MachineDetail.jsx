import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MACHINES, COMPLAINTS, PERSONS } from '../data/sampleData';
import StatusBadge from '../components/StatusBadge';

const BACK_ICON = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>;
const PLUS_ICON = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5v14" /></svg>;
const CLOCK_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM12 6v6l4 2" /></svg>;

export default function MachineDetail() {
  const { machineId } = useParams();
  const navigate = useNavigate();
  const machine = MACHINES.find(m => m.id === machineId);
  const [personFilter, setPersonFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  const complaints = useMemo(() => {
    return COMPLAINTS.filter(c => {
      if (c.machineId !== machineId) return false;
      if (personFilter !== 'All' && c.personId !== personFilter) return false;
      return true;
    });
  }, [machineId, personFilter]);

  if (!machine) return <div className="page"><h2>Machine not found</h2></div>;

  return (
    <div className="page">
      {/* Back link */}
      <Link to="/" className="breadcrumb" style={{ marginBottom: 12 }}>
        {BACK_ICON} Machines
      </Link>

      {/* Machine header */}
      <div className="flex justify-between items-center" style={{ gap: 20, flexWrap: 'wrap', marginBottom: 22 }}>
        <div>
          <div className="page-subtitle">You are here: complaints for one machine</div>
          <h1 className="page-title">{machine.make} {machine.model}</h1>
          <div className="machine-info-row">
            <span>Machine no. {machine.id}</span>
            <span>·</span>
            <StatusBadge status={machine.status} />
          </div>
        </div>
        <button className="btn btn-primary btn-large" onClick={() => navigate(`/machine/${machineId}/new`)}>
          {PLUS_ICON} New complaint
        </button>
      </div>

      {/* Complaints section */}
      <div className="section-divider flex justify-between items-center" style={{ marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 28 }}>
          Complaints <span style={{ fontWeight: 400, color: 'var(--color-neutral-600)' }}>{complaints.length}</span>
        </h3>
        <div className="flex gap-10">
          <div className="filter-select" style={{ width: 200, height: 48 }}>
            <select value={personFilter} onChange={e => setPersonFilter(e.target.value)} style={{ all: 'unset', width: '100%', fontSize: 15, cursor: 'pointer' }}>
              <option value="All">Person: All</option>
              {PERSONS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="field-input" style={{ width: 180, height: 48 }}>
            <input type="text" placeholder="Date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} style={{ all: 'unset', flex: 1, fontSize: 15 }} />
          </div>
          <button className="btn" style={{ height: 48, padding: '0 18px', fontSize: 15 }}
            onClick={() => { setPersonFilter('All'); setDateFilter(''); }}>Clear</button>
        </div>
      </div>

      {/* Complaint list */}
      {complaints.map(c => {
        const person = PERSONS.find(p => p.id === c.personId);
        const isOpen = c.status === 'Open';
        return (
          <div key={c.id} className={`complaint-card${isOpen ? ' open' : ''}`}>
            <div>
              <div className="complaint-title">
                <span>Complaint {c.id}</span>
                <span className="status-badge" style={{
                  background: isOpen ? 'var(--color-accent)' : 'var(--color-neutral-200)',
                  color: isOpen ? '#fff' : 'var(--color-text)'
                }}>{c.status}</span>
              </div>
              <div className="complaint-meta">
                <span>{c.date}</span>
                <span>Person: {person?.name}</span>
              </div>
              <div className={`complaint-time${isOpen ? '' : ' done'}`}>
                {CLOCK_ICON}
                {isOpen ? `Opened ${c.createdAgo} · last update ${c.lastUpdate}` : `Finished ${c.createdAgo} · ${c.lastUpdate}`}
              </div>
            </div>
            <div className="flex gap-10">
              <button className="btn" style={{ height: 50, padding: '0 22px', fontSize: 16 }}>Edit</button>
              <button
                className={`btn${isOpen ? ' btn-primary' : ''}`}
                style={{ height: 50, padding: '0 26px', fontSize: 16, fontWeight: 600 }}
                onClick={() => navigate(`/complaint/${c.id}`)}
              >View</button>
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: 8, fontSize: 13.5, color: 'var(--color-neutral-700)' }}>
        "New complaint" opens a 2-step form. "View" opens the complaint details.
      </div>
    </div>
  );
}
