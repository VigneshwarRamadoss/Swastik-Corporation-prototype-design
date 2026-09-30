// Shared screen components used across all three showcase pages
import { MACHINES, STATUS_COUNTS, STATUSES, PERSONS, COMPLAINTS, SPARE_OPTIONS } from '../data/sampleData';

const CHEVRON_RIGHT = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>;
const SEARCH_ICON = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="1.5" strokeLinecap="round"><path d="M11 3a8 8 0 1 0 0 16a8 8 0 1 0 0-16zM21 21l-4.3-4.3" /></svg>;
const PLUS_ICON = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5v14" /></svg>;
const CLOSE_ICON = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>;
const CLOCK_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM12 6v6l4 2" /></svg>;
const CHECK_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
const PRINT_ICON = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" /></svg>;
const DELETE_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>;
const FILE_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15h6" /></svg>;
const LINK_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;
const BACK_ICON = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>;
const ARROW_RIGHT = <svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="var(--color-accent-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h42M34 3l10 9-10 9" /></svg>;
const DOWN_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>;
const CAL_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /></svg>;
const TIME_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM12 6v6l4 2" /></svg>;

// ─── Shared Navbar strip ─────────────────────────────────────────
export function NavbarStrip() {
  return (
    <div style={{ height: 60, display: 'flex', alignItems: 'center', gap: 4, padding: '0 24px', background: 'var(--color-accent-900)', color: '#fff' }}>
      <span style={{ font: '600 22px var(--font-heading)', letterSpacing: '.05em', marginRight: 18 }}>YARD</span>
      <span style={{ padding: '8px 12px', fontSize: 14, fontWeight: 600, boxShadow: 'inset 0 -2px 0 var(--color-accent-300)' }}>Machines</span>
      {['Service', 'Store', 'Approvals', 'Reports', 'Masters', 'Settings'].map(t => (
        <span key={t} style={{ padding: '8px 12px', fontSize: 14, opacity: .75 }}>{t}</span>
      ))}
      <span style={{ flex: 1 }} />
      <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--color-accent-300)', color: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>US</span>
    </div>
  );
}

// ─── Screen 01: Machines ─────────────────────────────────────────
export function Screen01({ width = 1200 }) {
  const machines = MACHINES;
  const tiles = Object.entries(STATUS_COUNTS);
  const dots = { 'Rented': 'var(--color-accent-800)', 'Coming back': 'var(--color-accent-400)', 'Needs repair': 'var(--color-neutral-600)', 'Broken on site': 'var(--color-neutral-900)', 'Parked': 'var(--color-neutral-400)', 'Ready to rent': 'var(--color-accent)' };

  return (
    <div style={{ flex: 'none', width, minHeight: 900, background: 'var(--color-bg)', border: '1.5px solid var(--color-text)', display: 'flex', flexDirection: 'column' }}>
      <NavbarStrip />
      <div style={{ padding: '28px 32px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>You are here: all machines</div>
          <h2 style={{ margin: '2px 0 0', fontSize: 44, lineHeight: 1 }}>Machines <span style={{ fontWeight: 400, color: 'var(--color-neutral-600)' }}>240</span></h2>
        </div>

        {/* Status tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))', border: '1.5px solid var(--color-text)' }}>
          {tiles.map(([label, count], i) => (
            <div key={label} style={{ padding: '12px 14px', borderLeft: i ? '1.5px solid var(--color-text)' : 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: dots[label] }} />
                {label}
              </span>
              <span style={{ font: '600 34px/1 var(--font-heading)' }}>{count}</span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, height: 52, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', border: '1.5px solid var(--color-neutral-400)', background: '#fff' }}>
            {SEARCH_ICON}
            <span style={{ fontSize: 16, color: 'var(--color-neutral-600)' }}>Search by serial number, e.g. XXX</span>
          </div>
          <div style={{ width: 200, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: 16 }}>
            Status: All {DOWN_ICON}
          </div>
          <button style={{ height: 52, padding: '0 20px', fontSize: 16, border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>Clear</button>
        </div>

        {/* Table */}
        <div style={{ borderTop: '1.5px solid var(--color-text)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1.2fr) 80px minmax(0,1.4fr) 54px 96px minmax(0,1.2fr) 160px 20px', gap: 12, padding: '10px 10px', font: '600 11.5px var(--font-body)', letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', borderBottom: '1px solid var(--color-divider)' }}>
            <span>Make · Model</span><span>Category</span><span>Mach. no.</span><span>Serial no.</span><span>Year</span><span>OFM no.</span><span>Customer</span><span>Status · last update</span><span></span>
          </div>
          {machines.map((m, i) => {
            const st = STATUSES[m.status] || {};
            return (
              <div key={m.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1.2fr) 80px minmax(0,1.4fr) 54px 96px minmax(0,1.2fr) 160px 20px', gap: 12, alignItems: 'center', minHeight: 68, padding: '6px 10px', borderBottom: '1px solid var(--color-divider)', fontSize: 14, background: i === 0 ? 'var(--color-accent-100)' : 'transparent' }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{m.make} {m.model}</span>
                <span><span style={{ display: 'block' }}>{m.cat}</span><span style={{ display: 'block', fontSize: 12.5, color: 'var(--color-neutral-700)' }}>{m.sub}</span></span>
                <span>{m.id}</span>
                <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.serial}</span>
                <span>{m.year}</span>
                <span>{m.ofm}</span>
                <span>{m.customer}</span>
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 11px', borderRadius: 14, background: st.bg, color: st.fg, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: st.dot }} />{m.status}
                  </span>
                  <span style={{ fontSize: 12.5, color: 'var(--color-neutral-700)', whiteSpace: 'nowrap' }}>{m.since}</span>
                </span>
                {CHEVRON_RIGHT}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--color-neutral-700)' }}>Tap any row to open that machine. Row 1 (highlighted) opens screen 02.</div>
      </div>
    </div>
  );
}

// ─── Screen 02: Complaints ───────────────────────────────────────
export function Screen02({ width = 1200 }) {
  return (
    <div style={{ flex: 'none', width, minHeight: 900, background: 'var(--color-bg)', border: '1.5px solid var(--color-text)', display: 'flex', flexDirection: 'column' }}>
      <NavbarStrip />
      <div style={{ padding: '28px 32px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 600, color: 'var(--color-accent-700)' }}>{BACK_ICON}Machines</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>You are here: complaints for one machine</div>
            <h2 style={{ margin: '2px 0 0', fontSize: 44, lineHeight: 1 }}>Terrax TX-200</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, fontSize: 15, color: 'var(--color-neutral-700)' }}>
              <span>Machine no. 1001</span><span>·</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 11px', borderRadius: 14, background: 'var(--color-accent-800)', color: '#fff', fontSize: 13, fontWeight: 600 }}>Rented</span>
            </div>
          </div>
          <button style={{ height: 60, padding: '0 30px', fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--color-accent)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>{PLUS_ICON}New complaint</button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderTop: '1.5px solid var(--color-text)', paddingTop: 18 }}>
          <h3 style={{ margin: 0, fontSize: 28 }}>Complaints <span style={{ fontWeight: 400, color: 'var(--color-neutral-600)' }}>2</span></h3>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 200, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: 15 }}>Person: All {DOWN_ICON}</div>
            <div style={{ width: 180, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: 15, color: 'var(--color-neutral-600)' }}>Date {CAL_ICON}</div>
            <button style={{ height: 48, padding: '0 18px', fontSize: 15, border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>Clear</button>
          </div>
        </div>

        {/* Complaint cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Open */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 20, alignItems: 'center', padding: '18px 20px', border: '1.5px solid var(--color-text)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 600 }}>Complaint 2041</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 12px', borderRadius: 14, background: 'var(--color-accent)', color: '#fff', fontSize: 13, fontWeight: 600 }}>Open</span>
              </div>
              <div style={{ display: 'flex', gap: 20, fontSize: 15, color: 'var(--color-neutral-800)' }}><span>29/09/2026</span><span>Person: Priya</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--color-accent-700)' }}>{CLOCK_ICON}Opened 3 hrs ago · last update 20 min ago</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ height: 50, padding: '0 22px', fontSize: 16, border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>Edit</button>
              <button style={{ height: 50, padding: '0 26px', fontSize: 16, fontWeight: 600, background: 'var(--color-accent)', color: '#fff', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>View</button>
            </div>
          </div>
          {/* Done */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 20, alignItems: 'center', padding: '18px 20px', border: '1px solid var(--color-divider)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 600 }}>Complaint 2037</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 12px', borderRadius: 14, background: 'var(--color-neutral-200)', color: 'var(--color-text)', fontSize: 13, fontWeight: 600 }}>Done</span>
              </div>
              <div style={{ display: 'flex', gap: 20, fontSize: 15, color: 'var(--color-neutral-800)' }}><span>02/09/2026</span><span>Person: Arun</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--color-neutral-700)' }}>{CLOCK_ICON}Finished 4 weeks ago · took 6 hrs</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ height: 50, padding: '0 22px', fontSize: 16, border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>Edit</button>
              <button style={{ height: 50, padding: '0 26px', fontSize: 16, fontWeight: 600, border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>View</button>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--color-neutral-700)' }}>"New complaint" opens screen 03. "View" opens screen 05.</div>
      </div>
    </div>
  );
}

// ─── Screen 03: New complaint step 1 ─────────────────────────────
export function Screen03({ width = 1200 }) {
  return (
    <div style={{ flex: 'none', width, minHeight: 900, background: 'color-mix(in srgb, var(--color-accent-900) 45%, var(--color-bg))', border: '1.5px solid var(--color-text)', display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ width: 620, background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '26px 30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>Terrax TX-200 · Machine no. 1001</div>
            <h2 style={{ margin: '4px 0 0', fontSize: 38, lineHeight: 1 }}>New complaint</h2>
          </div>
          <button style={{ width: 46, height: 46, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--color-neutral-400)', background: '#fff', cursor: 'pointer' }}>{CLOSE_ICON}</button>
        </div>
        {/* Step indicator */}
        <div style={{ padding: '20px 30px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ height: 5, background: 'var(--color-accent)' }} />
            <span style={{ fontSize: 14, fontWeight: 700 }}>Step 1 of 2 · The problem</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ height: 5, background: 'var(--color-neutral-300)' }} />
            <span style={{ fontSize: 14, color: 'var(--color-neutral-600)' }}>Step 2 · Tools and spares</span>
          </div>
        </div>
        {/* Fields */}
        <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field"><label>Date</label><div className="field-input"><span>29/09/2026</span>{CAL_ICON}</div></div>
            <div className="field"><label>Time</label><div className="field-input"><span>11:20 AM</span>{TIME_ICON}</div></div>
          </div>
          <div className="field">
            <label>Person</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {PERSONS.map((p, i) => (
                <span key={p.id} style={{ height: 50, padding: '0 18px 0 6px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 25, border: i === 0 ? '2px solid var(--color-accent)' : '1.5px solid var(--color-neutral-400)', background: i === 0 ? 'var(--color-accent-100)' : '#fff', fontSize: 16, fontWeight: 600 }}>
                  <span style={{ width: 38, height: 38, borderRadius: '50%', background: i === 0 ? 'var(--color-accent)' : 'var(--color-neutral-200)', color: i === 0 ? '#fff' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{p.initials}</span>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
          <div className="field">
            <label>What's wrong?</label>
            <textarea style={{ minHeight: 190, fontSize: 16, border: '1.5px solid var(--color-neutral-400)', background: '#fff', padding: 14, fontFamily: 'inherit', resize: 'vertical' }} defaultValue="Oil leaking near the arm. Machine stopped." />
          </div>
        </div>
        <div style={{ padding: '18px 30px 26px', borderTop: '1px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: 'var(--color-neutral-700)' }}>Next: add tools and spares</span>
          <button style={{ height: 58, padding: '0 40px', fontSize: 18, fontWeight: 600, background: 'var(--color-accent)', color: '#fff', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 04: Tools and spares ─────────────────────────────────
export function Screen04({ width = 1200 }) {
  return (
    <div style={{ flex: 'none', width, minHeight: 900, background: 'color-mix(in srgb, var(--color-accent-900) 45%, var(--color-bg))', border: '1.5px solid var(--color-text)', display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ width: 620, background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '26px 30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>Terrax TX-200 · Machine no. 1001</div>
            <h2 style={{ margin: '4px 0 0', fontSize: 38, lineHeight: 1 }}>New complaint</h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 46, height: 46, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--color-neutral-400)', background: '#fff', cursor: 'pointer' }}>{PRINT_ICON}</button>
            <button style={{ width: 46, height: 46, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--color-neutral-400)', background: '#fff', cursor: 'pointer' }}>{CLOSE_ICON}</button>
          </div>
        </div>
        {/* Step indicator */}
        <div style={{ padding: '20px 30px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ height: 5, background: 'var(--color-accent)' }} />
            <span style={{ fontSize: 14, color: 'var(--color-neutral-700)', display: 'flex', alignItems: 'center', gap: 6 }}>{CHECK_ICON}Step 1 · The problem</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ height: 5, background: 'var(--color-accent)' }} />
            <span style={{ fontSize: 14, fontWeight: 700 }}>Step 2 of 2 · Tools and spares</span>
          </div>
        </div>
        {/* Content */}
        <div style={{ padding: '22px 30px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          <div style={{ border: '1.5px solid var(--color-text)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>PR</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)' }}>Person 1</div>
                <div style={{ fontSize: 17, fontWeight: 600 }}>Priya</div>
              </div>
            </div>
            {/* Add row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 128px auto', gap: 8, alignItems: 'end', padding: 12, background: 'var(--color-neutral-100)' }}>
              <div className="field"><label style={{ fontSize: 13.5 }}>Tool or spare</label><div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: 15, color: 'var(--color-neutral-600)' }}>Choose {DOWN_ICON}</div></div>
              <div className="field"><label style={{ fontSize: 13.5 }}>How many</label><div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1.5px solid var(--color-neutral-400)', background: '#fff', padding: '0 4px' }}><span style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>−</span><b style={{ fontSize: 16 }}>1</b><span style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>+</span></div></div>
              <button style={{ height: 48, padding: '0 20px', fontSize: 16, fontWeight: 600, background: 'var(--color-accent)', color: '#fff', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>Add</button>
            </div>
            {/* List */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) 90px 44px', gap: 8, padding: '6px 0', font: '600 11.5px var(--font-body)', letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', borderBottom: '1.5px solid var(--color-text)' }}><span>No.</span><span>Tool or spare</span><span>How many</span><span></span></div>
              {[['Hydraulic hose', 2], ['O-ring kit', 1]].map(([name, qty], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) 90px 44px', gap: 8, alignItems: 'center', minHeight: 48, borderBottom: '1px solid var(--color-divider)', fontSize: 15 }}>
                  <span>{i + 1}</span><span>{name}</span><b>{qty}</b>
                  <span style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-700)' }}>{DELETE_ICON}</span>
                </div>
              ))}
            </div>
            {/* Tool bag + vehicle */}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr)', gap: 16, alignItems: 'end' }}>
              <div className="field"><label style={{ fontSize: 13.5 }}>Tool bag</label><div style={{ display: 'flex', gap: 6 }}>
                <span style={{ height: 46, padding: '0 22px', display: 'flex', alignItems: 'center', borderRadius: 23, border: '2px solid var(--color-accent)', background: 'var(--color-accent-100)', fontSize: 15, fontWeight: 600 }}>Yes</span>
                <span style={{ height: 46, padding: '0 22px', display: 'flex', alignItems: 'center', borderRadius: 23, border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: 15, fontWeight: 600 }}>No</span>
              </div></div>
              <div className="field"><label style={{ fontSize: 13.5 }}>Vehicle number</label><div style={{ height: 48, display: 'flex', alignItems: 'center', padding: '0 12px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: 15 }}>XX 00 XX 0000</div></div>
            </div>
          </div>
          <button style={{ height: 52, width: '100%', fontSize: 16, fontWeight: 600, border: '1.5px dashed var(--color-neutral-500)', background: 'transparent', fontFamily: 'inherit', cursor: 'pointer' }}>+ Add another person</button>
        </div>
        <div style={{ padding: '18px 30px 26px', borderTop: '1px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{ height: 58, padding: '0 26px', fontSize: 17, border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>Back</button>
          <button style={{ height: 58, padding: '0 40px', fontSize: 18, fontWeight: 600, background: 'var(--color-accent)', color: '#fff', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>Submit complaint</button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 05: Complaint details ────────────────────────────────
export function Screen05({ width = 1200 }) {
  return (
    <div style={{ flex: 'none', width, minHeight: 900, background: 'color-mix(in srgb, var(--color-accent-900) 45%, var(--color-bg))', border: '1.5px solid var(--color-text)', display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ width: 620, background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '26px 30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>Terrax TX-200 · Machine no. 1001</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
              <h2 style={{ margin: 0, fontSize: 38, lineHeight: 1 }}>Complaint 2041</h2>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 13px', borderRadius: 15, background: 'var(--color-accent)', color: '#fff', fontSize: 14, fontWeight: 600 }}>Open</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 46, height: 46, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--color-neutral-400)', background: '#fff', cursor: 'pointer' }}>{PRINT_ICON}</button>
            <button style={{ width: 46, height: 46, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--color-neutral-400)', background: '#fff', cursor: 'pointer' }}>{CLOSE_ICON}</button>
          </div>
        </div>
        <div style={{ margin: '18px 30px 0', padding: '12px 14px', background: 'var(--color-accent-100)', fontSize: 15, color: 'var(--color-accent-900)' }}>Priya is working on this. When the work is done, press <b>Finish job</b>.</div>
        <div style={{ padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--color-divider)' }}>
            <div style={{ padding: '12px 14px' }}><div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)' }}>Date and time</div><div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>29/09/2026 · 11:20 AM</div></div>
            <div style={{ padding: '12px 14px', borderLeft: '1px solid var(--color-divider)' }}><div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)' }}>What's wrong?</div><div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>Oil leaking near the arm</div></div>
          </div>
          <div style={{ border: '1.5px solid var(--color-text)', padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>PR</span>
              <div><div style={{ fontSize: 17, fontWeight: 600 }}>Priya</div><div style={{ fontSize: 13.5, color: 'var(--color-neutral-700)' }}>Vehicle XX 00 XX 0000 · Tool bag: Yes</div></div>
            </div>
            {[['Hydraulic hose', 2], ['O-ring kit', 1]].map(([name, qty], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', minHeight: 44, alignItems: 'center', borderTop: '1px solid var(--color-divider)', fontSize: 15 }}><span>{i + 1} · {name}</span><b>{qty}</b></div>
            ))}
          </div>
        </div>
        <div style={{ padding: '18px 30px 26px', borderTop: '1px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{ height: 58, padding: '0 26px', fontSize: 17, border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>Back</button>
          <button style={{ height: 58, padding: '0 40px', fontSize: 18, fontWeight: 600, background: 'var(--color-accent)', color: '#fff', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>Finish job</button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 06: Finish job ───────────────────────────────────────
export function Screen06({ width = 1200 }) {
  return (
    <div style={{ flex: 'none', width, minHeight: 900, background: 'color-mix(in srgb, var(--color-accent-900) 45%, var(--color-bg))', border: '1.5px solid var(--color-text)', display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ width: 620, background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '26px 30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>Complaint 2041 · Terrax TX-200</div>
            <h2 style={{ margin: '4px 0 0', fontSize: 38, lineHeight: 1 }}>Finish job</h2>
          </div>
          <button style={{ width: 46, height: 46, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--color-neutral-400)', background: '#fff', cursor: 'pointer' }}>{CLOSE_ICON}</button>
        </div>
        <div style={{ padding: '22px 30px', display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field"><label>Finished on</label><div className="field-input"><span>29/09/2026</span>{CAL_ICON}</div></div>
            <div className="field"><label>Finished at</label><div className="field-input"><span>4:30 PM</span>{TIME_ICON}</div></div>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Were these used?</div>
            <div style={{ borderTop: '1.5px solid var(--color-text)' }}>
              {[['Hydraulic hose', 2, true], ['O-ring kit', 1, false]].map(([name, qty, used], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderBottom: '1px solid var(--color-divider)' }}>
                  <span style={{ flex: 1, fontSize: 16 }}>{name} <span style={{ color: 'var(--color-neutral-700)' }}>× {qty}</span></span>
                  <span style={{ height: 44, padding: '0 20px', display: 'flex', alignItems: 'center', borderRadius: 22, border: used ? '2px solid var(--color-accent)' : '1.5px solid var(--color-neutral-400)', background: used ? 'var(--color-accent-100)' : '#fff', fontSize: 15, fontWeight: 600 }}>Used</span>
                  <span style={{ height: 44, padding: '0 20px', display: 'flex', alignItems: 'center', borderRadius: 22, border: !used ? '2px solid var(--color-accent)' : '1.5px solid var(--color-neutral-400)', background: !used ? 'var(--color-accent-100)' : '#fff', fontSize: 15, fontWeight: 600 }}>Not used</span>
                </div>
              ))}
            </div>
          </div>
          <div className="field">
            <label>What was done?</label>
            <textarea placeholder="Example: changed the arm hose" style={{ minHeight: 110, fontSize: 16, border: '1.5px solid var(--color-neutral-400)', background: '#fff', padding: 14, fontFamily: 'inherit', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ height: 50, padding: '0 16px', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>{FILE_ICON}Attach file</button>
            <button style={{ height: 50, padding: '0 16px', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>{LINK_ICON}Send link</button>
          </div>
        </div>
        <div style={{ padding: '18px 30px 26px', borderTop: '1px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: 'var(--color-neutral-700)' }}>Complaint changes to Done</span>
          <button style={{ height: 58, padding: '0 40px', fontSize: 18, fontWeight: 600, background: 'var(--color-accent)', color: '#fff', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>Submit</button>
        </div>
      </div>
    </div>
  );
}

// ─── Arrow connector ─────────────────────────────────────────────
export function ArrowConnector() {
  return (
    <div style={{ flex: 'none', width: 80, alignSelf: 'center', display: 'flex', justifyContent: 'center' }}>
      {ARROW_RIGHT}
    </div>
  );
}
