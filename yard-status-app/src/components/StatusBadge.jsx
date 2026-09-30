import { STATUSES } from '../data/sampleData';

export default function StatusBadge({ status }) {
  const s = STATUSES[status] || STATUSES['Parked'];
  return (
    <span className="status-badge" style={{ background: s.bg, color: s.fg }}>
      <span className="status-badge-dot" style={{ background: s.dot }} />
      {status}
    </span>
  );
}
