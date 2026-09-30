import { useParams, useNavigate } from 'react-router-dom';
import { COMPLAINTS, PERSONS, MACHINES } from '../data/sampleData';

const CLOSE_ICON = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>;
const PRINT_ICON = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" /></svg>;

export default function ComplaintDetail() {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const complaint = COMPLAINTS.find(c => c.id === complaintId);

  if (!complaint) return <div className="page"><h2>Complaint not found</h2></div>;

  const person = PERSONS.find(p => p.id === complaint.personId);
  const machine = MACHINES.find(m => m.id === complaint.machineId);
  const isOpen = complaint.status === 'Open';

  return (
    <div className="panel-overlay">
      <div className="side-panel">
        {/* Header */}
        <div className="panel-header">
          <div>
            <div className="panel-header-info">{machine?.make} {machine?.model} · Machine no. {machine?.id}</div>
            <div className="flex items-center gap-12" style={{ marginTop: 4 }}>
              <h2 style={{ margin: 0 }}>Complaint {complaint.id}</h2>
              <span className="status-badge" style={{
                background: isOpen ? 'var(--color-accent)' : 'var(--color-neutral-200)',
                color: isOpen ? '#fff' : 'var(--color-text)'
              }}>{complaint.status}</span>
            </div>
          </div>
          <div className="flex gap-8">
            <button className="btn-close" title="Print">{PRINT_ICON}</button>
            <button className="btn-close" onClick={() => navigate(`/machine/${complaint.machineId}`)}>{CLOSE_ICON}</button>
          </div>
        </div>

        {/* Info banner */}
        {isOpen && (
          <div className="info-banner" style={{ margin: '18px 30px 0' }}>
            {person?.name} is working on this. When the work is done, press <b>Finish job</b>.
          </div>
        )}

        <div className="panel-body">
          {/* Details grid */}
          <div className="detail-grid">
            <div className="detail-cell">
              <div className="detail-cell-label">Date and time</div>
              <div className="detail-cell-value">{complaint.date} · {complaint.time}</div>
            </div>
            <div className="detail-cell">
              <div className="detail-cell-label">What's wrong?</div>
              <div className="detail-cell-value">{complaint.problem}</div>
            </div>
          </div>

          {/* Person block */}
          <div className="person-block">
            <div className="person-block-header">
              <div className="person-avatar">{person?.initials}</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 600 }}>{person?.name}</div>
                <div style={{ fontSize: 13.5, color: 'var(--color-neutral-700)' }}>
                  Vehicle {complaint.vehicle} · Tool bag: {complaint.toolBag ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
            {complaint.spares.map((s, i) => (
              <div key={i} className="person-spare-row">
                <span>{i + 1} · {s.name}</span>
                <b>{s.qty}</b>
              </div>
            ))}
          </div>

          {/* Work done (if finished) */}
          {complaint.workDone && (
            <div className="field">
              <label>What was done</label>
              <div style={{ padding: 14, background: 'var(--color-neutral-100)', fontSize: 15 }}>
                {complaint.workDone}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="panel-footer">
          <button className="btn" style={{ height: 58, padding: '0 26px', fontSize: 17 }}
            onClick={() => navigate(`/machine/${complaint.machineId}`)}>Back</button>
          {isOpen && (
            <button className="btn btn-primary btn-large"
              onClick={() => navigate(`/complaint/${complaint.id}/finish`)}>
              Finish job
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
