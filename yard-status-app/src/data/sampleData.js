// Status definitions — same colors as the mockup .dc.html files
export const STATUSES = {
  'Rented':          { bg: 'var(--color-accent-800)', fg: '#fff',                   dot: '#fff',                   tint: 'rgba(30,64,175,.1)',  solid: 'var(--color-accent-800)' },
  'Broken on site':  { bg: 'var(--color-neutral-900)', fg: '#fff',                  dot: '#fff',                   tint: 'oklch(0.94 0.035 29)', solid: 'oklch(0.56 0.18 29)'   },
  'Coming back':     { bg: 'var(--color-accent-100)', fg: 'var(--color-accent-900)', dot: 'var(--color-accent-500)', tint: 'var(--color-accent-100)', solid: 'var(--color-accent-400)' },
  'Needs repair':    { bg: 'var(--color-neutral-200)', fg: 'var(--color-text)',      dot: 'var(--color-neutral-700)', tint: 'var(--color-neutral-200)', solid: 'var(--color-neutral-600)' },
  'Parked':          { bg: 'transparent',              fg: 'var(--color-neutral-800)', dot: 'var(--color-neutral-400)', tint: 'var(--color-neutral-100)', solid: 'var(--color-neutral-300)' },
  'Ready to rent':   { bg: 'var(--color-accent)',      fg: '#fff',                   dot: '#fff',                   tint: 'rgba(37,99,235,.08)',  solid: 'var(--color-accent)' },
};

export const STATUS_COUNTS = {
  'Rented': 180,
  'Coming back': 8,
  'Needs repair': 12,
  'Broken on site': 3,
  'Parked': 25,
  'Ready to rent': 12,
};

export const PERSONS = [
  { id: 'priya', name: 'Priya', initials: 'PR' },
  { id: 'arun',  name: 'Arun',  initials: 'AR' },
  { id: 'meena', name: 'Meena', initials: 'ME' },
];

export const MACHINES = [
  { id: '1001', make: 'Terrax',   model: 'TX-200',  cat: 'Digging',      sub: 'Loader digger',  serial: 'TRX200KZB01452', year: 2021, ofm: '50011', customer: 'Northside Builders', status: 'Rented',         since: 'for 12 days',  where: 'Northside Builders', site: 'Poonamallee, Chennai' },
  { id: '1002', make: 'Hollin',   model: 'HX-30',   cat: 'Digging',      sub: 'Crawler digger', serial: 'HLN030DKZB02891', year: 2019, ofm: '50012', customer: 'Riverbank Works',   status: 'Broken on site', since: '3 hrs ago',    where: 'Larsen Infra Works', site: 'Sriperumbudur' },
  { id: '1003', make: 'Liftmo',   model: 'LM-19',   cat: 'Height work',  sub: 'Platform lift',  serial: 'LFM019PLTF03112', year: 2022, ofm: '50013', customer: 'Hilltop Homes',     status: 'Coming back',    since: 'due in 5 hrs', where: 'In transit',          site: 'Returning to yard' },
  { id: '1004', make: 'Varden',   model: 'VR-18',   cat: 'Loading',      sub: 'Reach loader',   serial: 'VRD018RLDR04223', year: 2020, ofm: '—',     customer: '—',                 status: 'Needs repair',   since: 'for 3 days',   where: 'Yard, Bay 4',         site: 'Waiting for parts' },
  { id: '1005', make: 'Skyreach', model: 'SR-16',   cat: 'Height work',  sub: 'Arm lift',       serial: 'SKR016ARML05334', year: 2018, ofm: '—',     customer: '—',                 status: 'Parked',         since: 'for 2 weeks',  where: 'Yard, Bay 7',         site: 'Not offered' },
  { id: '1006', make: 'Voltek',   model: 'VK-125',  cat: 'Power units',  sub: 'Power set',      serial: 'VTK125PWST06445', year: 2023, ofm: '—',     customer: '—',                 status: 'Ready to rent',  since: 'since yesterday', where: 'Yard, Bay 1',      site: 'Serviced and ready' },
];

export const COMPLAINTS = [
  { id: '2041', machineId: '1001', date: '29/09/2026', time: '11:20 AM', personId: 'priya', problem: 'Oil leaking near the arm. Machine stopped.', status: 'Open',  createdAgo: '3 hrs ago', lastUpdate: '20 min ago',
    spares: [{ name: 'Hydraulic hose', qty: 2 }, { name: 'O-ring kit', qty: 1 }],
    toolBag: true, vehicle: 'TN 09 BK 4471' },
  { id: '2037', machineId: '1001', date: '02/09/2026', time: '9:00 AM',  personId: 'arun',  problem: '250-hour service overdue.',               status: 'Done',  createdAgo: '4 weeks ago', lastUpdate: 'took 6 hrs',
    spares: [{ name: 'Oil filter', qty: 1 }, { name: 'Air filter', qty: 1 }],
    toolBag: true, vehicle: 'TN 09 BK 4471',
    finishedDate: '02/09/2026', finishedTime: '3:00 PM', workDone: 'Completed 250-hour service. Changed oil and air filters.', spareUsage: { 'Oil filter': 'used', 'Air filter': 'used' } },
  { id: '2035', machineId: '1002', date: '28/09/2026', time: '2:30 PM',  personId: 'priya', problem: 'Hydraulic leak at boom cylinder. Operator stopped work.', status: 'Open', createdAgo: '1 day ago', lastUpdate: '5 hrs ago',
    spares: [{ name: 'Hydraulic hose', qty: 1 }, { name: 'Seal kit', qty: 2 }],
    toolBag: true, vehicle: 'TN 09 BK 4471' },
];

export const SPARE_OPTIONS = [
  'Hydraulic hose', 'O-ring kit', 'Oil filter', 'Air filter', 'Seal kit',
  'Fan belt', 'Fuel filter', 'Brake pad', 'Bucket teeth', 'Track shoe',
];
