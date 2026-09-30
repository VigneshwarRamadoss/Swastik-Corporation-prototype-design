import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COMPLAINTS, PERSONS, MACHINES } from '../data/sampleData';

const CLOSE_ICON = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>;
const FILE_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15h6" /></svg>;
const LINK_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;

export default function FinishJob() {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const complaint = COMPLAINTS.find(c => c.id === complaintId);

  const [finDate, setFinDate] = useState(new Date().toLocaleDateString('en-GB'));
  const [finTime, setFinTime] = useState('4:30 PM');
  const [workDone, setWorkDone] = useState('');
  const [usage, setUsage] = useState(() => {
    if (!complaint) return {};
    const u = {};
    complaint.spares.forEach(s => { u[s.name] = 'used'; });
    return u;
  });

  if (!complaint) return <div className="page"><h2>Complaint not found</h2></div>;

  const person = PERSONS.find(p => p.id === complaint.personId);
  const machine = MACHINES.find(m => m.id === complaint.machineId);

  const handleSubmit = () => {
    alert(`Job finished!\n\nComplaint ${complaint.id} marked as Done.\nFinished: ${finDate} at ${finTime}\nWork done: ${workDone}\nSpare usage: ${Object.entries(usage).map(([k, v]) => `${k}: ${v}`).join(', ')}`);
    navigate(`/machine/${complaint.machineId}`);
  };

  return (
    <div className="panel-overlay">
      <div className="side-panel">
        {/* Header */}
        <div className="panel-header">
          <div>
            <div className="panel-header-info">Complaint {complaint.id} · {machine?.make} {machine?.model}</div>
            <h2>Finish job</h2>
          </div>
          <button className="btn-close" onClick={() => navigate(`/complaint/${complaintId}`)}>{CLOSE_ICON}</button>
        </div>

        <div className="panel-body">
          {/* Date/time */}
          <div className="form-row">
            <div className="field">
              <label>Finished on</label>
              <div className="field-input">
                <input type="text" value={finDate} onChange={e => setFinDate(e.target.value)} style={{ all: 'unset', flex: 1, fontSize: 16 }} />
              </div>
            </div>
            <div className="field">
              <label>Finished at</label>
              <div className="field-input">
                <input type="text" value={finTime} onChange={e => setFinTime(e.target.value)} style={{ all: 'unset', flex: 1, fontSize: 16 }} />
              </div>
            </div>
          </div>

          {/* Spare usage */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Were these used?</div>
            <div style={{ borderTop: '1.5px solid var(--color-text)' }}>
              {complaint.spares.map((s, i) => (
                <div key={i} className="spare-usage-row">
                  <span className="spare-usage-name">
                    {s.name} <span className="spare-usage-qty">× {s.qty}</span>
                  </span>
                  <div className="toggle-group">
                    <div
                      className={`toggle-option${usage[s.name] === 'used' ? ' selected' : ''}`}
                      onClick={() => setUsage({ ...usage, [s.name]: 'used' })}
                    >Used</div>
                    <div
                      className={`toggle-option${usage[s.name] === 'not used' ? ' selected' : ''}`}
                      onClick={() => setUsage({ ...usage, [s.name]: 'not used' })}
                    >Not used</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work done */}
          <div className="field">
            <label>What was done?</label>
            <textarea
              placeholder="Example: changed the arm hose"
              value={workDone}
              onChange={e => setWorkDone(e.target.value)}
            />
          </div>

          {/* Attach buttons */}
          <div className="flex gap-10">
            <button className="btn" style={{ height: 50, padding: '0 16px', fontSize: 15 }}>{FILE_ICON} Attach file</button>
            <button className="btn" style={{ height: 50, padding: '0 16px', fontSize: 15 }}>{LINK_ICON} Send link</button>
          </div>
        </div>

        {/* Footer */}
        <div className="panel-footer">
          <span className="panel-footer-hint">Complaint changes to Done</span>
          <button className="btn btn-primary btn-large" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
