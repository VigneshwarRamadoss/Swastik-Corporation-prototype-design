// Page 1: Same as "Figma Flow Simplified.dc.html"
// All 6 screens laid out horizontally with arrows between them
import { Screen01, Screen02, Screen03, Screen04, Screen05, Screen06, ArrowConnector } from '../components/Screens';

const SCREENS = [
  { n: '01', title: 'Machines',                  does: 'Find the machine',          fig: 'Frame 1' },
  { n: '02', title: 'Complaints',                does: 'See or start complaints',   fig: 'Frame 2' },
  { n: '03', title: 'New complaint · step 1',    does: 'Date, time, person, problem', fig: 'new complinet' },
  { n: '04', title: 'New complaint · step 2',    does: 'Tools, tool bag, vehicle',  fig: 'Spare register' },
  { n: '05', title: 'Complaint details',         does: 'Check what was sent',       fig: 'view details' },
  { n: '06', title: 'Finish job',                does: 'Used or not, what was done', fig: 'after check out' },
];

export default function FlowSimplified() {
  return (
    <div style={{ padding: '40px 44px 60px', display: 'flex', flexDirection: 'column', gap: 30, background: '#dcdcdf', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400 }}>
        <h1 style={{ margin: 0, fontSize: 40, lineHeight: 1 }}>Same flow, simpler screens</h1>
        <p style={{ margin: '8px 0 0', fontSize: 15, color: 'var(--color-neutral-700)', maxWidth: 980 }}>
          These are the same 6 screens and fields as the Figma file, left to right. Each screen puts a clear title and a "you are here" line at the top and keeps one main button on the bottom right. Complaint steps show "Step 1 of 2" / "Step 2 of 2", and every complaint shows its status.
        </p>
      </div>

      {/* Screen labels */}
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
        {SCREENS.map((s, i) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start', flex: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 1200, flex: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 40, height: 40, flex: 'none', background: 'var(--color-accent-900)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 20px var(--font-heading)' }}>{s.n}</span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', whiteSpace: 'nowrap' }}>{s.does} · Figma: {s.fig}</div>
                </div>
              </div>
            </div>
            {i < 5 && <div style={{ flex: 'none', width: 80 }} />}
          </div>
        ))}
      </div>

      {/* Screens with arrows */}
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', marginTop: -18 }}>
        <Screen01 />
        <ArrowConnector />
        <Screen02 />
        <ArrowConnector />
        <Screen03 />
        <ArrowConnector />
        <Screen04 />
        <ArrowConnector />
        <Screen05 />
        <ArrowConnector />
        <Screen06 />
      </div>
    </div>
  );
}
