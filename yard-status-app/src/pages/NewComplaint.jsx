import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MACHINES, PERSONS, SPARE_OPTIONS } from '../data/sampleData';

const CLOSE_ICON = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>;
const CHECK_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
const DELETE_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>;

export default function NewComplaint() {
  const { machineId } = useParams();
  const navigate = useNavigate();
  const machine = MACHINES.find(m => m.id === machineId);

  const [step, setStep] = useState(1);

  // Step 1
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB'));
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [personId, setPersonId] = useState('priya');
  const [problem, setProblem] = useState('');

  // Step 2
  const [spares, setSpares] = useState([]);
  const [spareName, setSpareName] = useState('');
  const [spareQty, setSpareQty] = useState(1);
  const [toolBag, setToolBag] = useState(true);
  const [vehicle, setVehicle] = useState('XX 00 XX 0000');

  const addSpare = () => {
    if (!spareName) return;
    setSpares([...spares, { name: spareName, qty: spareQty }]);
    setSpareName('');
    setSpareQty(1);
  };

  const removeSpare = (idx) => setSpares(spares.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    alert(`Complaint submitted!\n\nMachine: ${machine?.make} ${machine?.model}\nProblem: ${problem}\nPerson: ${PERSONS.find(p => p.id === personId)?.name}\nSpares: ${spares.map(s => `${s.name} ×${s.qty}`).join(', ')}`);
    navigate(`/machine/${machineId}`);
  };

  if (!machine) return null;

  return (
    <div className="panel-overlay">
      <div className="side-panel">
        {/* Header */}
        <div className="panel-header">
          <div>
            <div className="panel-header-info">{machine.make} {machine.model} · Machine no. {machine.id}</div>
            <h2>New complaint</h2>
          </div>
          <button className="btn-close" onClick={() => navigate(`/machine/${machineId}`)}>{CLOSE_ICON}</button>
        </div>

        {/* Step indicator */}
        <div className="step-indicator">
          <div>
            <div className={`step-bar ${step === 1 ? 'active' : 'done'}`} />
            <div className={`step-label ${step === 1 ? 'active' : 'done'}`}>
              {step > 1 && CHECK_ICON}
              {step === 1 ? 'Step 1 of 2 · The problem' : 'Step 1 · The problem'}
            </div>
          </div>
          <div>
            <div className={`step-bar ${step === 2 ? 'active' : 'inactive'}`} />
            <div className={`step-label ${step === 2 ? 'active' : 'inactive'}`}>
              {step === 2 ? 'Step 2 of 2 · Tools and spares' : 'Step 2 · Tools and spares'}
            </div>
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div className="panel-body">
              <div className="form-row">
                <div className="field">
                  <label>Date</label>
                  <div className="field-input">
                    <input type="text" value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                </div>
                <div className="field">
                  <label>Time</label>
                  <div className="field-input">
                    <input type="text" value={time} onChange={e => setTime(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="field">
                <label>Person</label>
                <div className="person-chips">
                  {PERSONS.map(p => (
                    <div
                      key={p.id}
                      className={`person-chip${personId === p.id ? ' selected' : ''}`}
                      onClick={() => setPersonId(p.id)}
                    >
                      <span className="person-chip-avatar">{p.initials}</span>
                      {p.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>What's wrong?</label>
                <textarea
                  placeholder="Example: oil leaking near the arm"
                  value={problem}
                  onChange={e => setProblem(e.target.value)}
                />
              </div>
            </div>
            <div className="panel-footer">
              <span className="panel-footer-hint">Next: add tools and spares</span>
              <button className="btn btn-primary btn-large" onClick={() => setStep(2)}>Next</button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <div className="panel-body">
              {/* Person block */}
              <div className="person-block">
                <div className="person-block-header">
                  <div className="person-avatar">{PERSONS.find(p => p.id === personId)?.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)' }}>Person 1</div>
                    <div style={{ fontSize: 17, fontWeight: 600 }}>{PERSONS.find(p => p.id === personId)?.name}</div>
                  </div>
                </div>

                {/* Add spare */}
                <div className="spare-add-row">
                  <div className="field">
                    <label style={{ fontSize: 13.5 }}>Tool or spare</label>
                    <div className="field-input" style={{ height: 48 }}>
                      <select value={spareName} onChange={e => setSpareName(e.target.value)}
                        style={{ all: 'unset', width: '100%', fontSize: 15, cursor: 'pointer' }}>
                        <option value="">Choose</option>
                        {SPARE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label style={{ fontSize: 13.5 }}>How many</label>
                    <div className="qty-stepper">
                      <button onClick={() => setSpareQty(Math.max(1, spareQty - 1))}>−</button>
                      <b>{spareQty}</b>
                      <button onClick={() => setSpareQty(spareQty + 1)}>+</button>
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ height: 48, padding: '0 20px' }} onClick={addSpare}>Add</button>
                </div>

                {/* Spare list */}
                {spares.length > 0 && (
                  <div>
                    <div className="spare-table-header">
                      <span>No.</span><span>Tool or spare</span><span>How many</span><span></span>
                    </div>
                    {spares.map((s, i) => (
                      <div key={i} className="spare-table-row">
                        <span>{i + 1}</span>
                        <span>{s.name}</span>
                        <b>{s.qty}</b>
                        <button className="btn-ghost" style={{ all: 'unset', cursor: 'pointer', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-700)' }} onClick={() => removeSpare(i)}>
                          {DELETE_ICON}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tool bag + vehicle */}
                <div style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr)', gap: 16, alignItems: 'end', marginTop: 12 }}>
                  <div className="field">
                    <label style={{ fontSize: 13.5 }}>Tool bag</label>
                    <div className="toggle-group">
                      <div className={`toggle-option${toolBag ? ' selected' : ''}`} onClick={() => setToolBag(true)}>Yes</div>
                      <div className={`toggle-option${!toolBag ? ' selected' : ''}`} onClick={() => setToolBag(false)}>No</div>
                    </div>
                  </div>
                  <div className="field">
                    <label style={{ fontSize: 13.5 }}>Vehicle number</label>
                    <div className="field-input" style={{ height: 48 }}>
                      <input type="text" value={vehicle} onChange={e => setVehicle(e.target.value)} style={{ all: 'unset', flex: 1, fontSize: 15 }} />
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn-dashed">+ Add another person</button>
            </div>

            <div className="panel-footer">
              <button className="btn" style={{ height: 58, padding: '0 26px', fontSize: 17 }} onClick={() => setStep(1)}>Back</button>
              <button className="btn btn-primary btn-large" onClick={handleSubmit}>Submit complaint</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
