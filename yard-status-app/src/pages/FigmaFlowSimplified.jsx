import React from 'react';

const IC = {
  truck: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14M5 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0M15 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
  alert: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01",
  back: "M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  park: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9 17V7h4a3 3 0 0 1 0 6H9",
  check: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM9 12l2 2 4-4",
  tick: "M20 6 9 17l-5-5",
  search: "M11 3a8 8 0 1 0 0 16a8 8 0 1 0 0-16zM21 21l-4.3-4.3"
};
const icons = IC;

const screens = [
  ["01", "Machines", "Find the machine", "Frame 1"], ["02", "Complaints", "See or start complaints", "Frame 2"],
  ["03", "New complaint · step 1", "Date, time, person, problem", "new complinet"], ["04", "New complaint · step 2", "Tools, tool bag, vehicle", "Spare register"],
  ["05", "Complaint details", "Check what was sent", "view details"], ["06", "Finish job", "Used or not, what was done", "after check out"]
].map(([n, title, does, fig], i) => ({ n, title, does, fig, arrow: i < 5 }));

const SETS = ["Plain", "Journey", "Short"];
const ST_DATA = [
  { key: "ready", old: "Reedy To Rent", count: 15, icon: IC.check, names: ["Ready to rent", "Good to go", "Available"], desc: "Serviced, checked and free to send out." },
  { key: "rent", old: "On Hire", count: 388, icon: IC.truck, names: ["Out on rent", "On the job", "Rented"], desc: "Paid and working at the customer's site." },
  { key: "breakdown", old: "On Hire Break Down", count: 0, icon: IC.alert, names: ["Broken down on site", "Stuck on site", "Site fault"], desc: "Still with the customer but not working. Needs a technician." },
  { key: "returning", old: "Inward Pending", count: 5, icon: IC.back, names: ["Coming back", "On the way back", "Returning"], desc: "Off hire and on its way to the yard." },
  { key: "service", old: "Yard (TBS)", count: 16, icon: IC.wrench, names: ["Needs service", "In the workshop", "Service"], desc: "In the yard, waiting for checks or repair." },
  { key: "yard", old: "Yard", count: 45, icon: IC.park, names: ["Parked in yard", "Resting", "On hold"], desc: "In the yard and not offered for rent right now." }
];

const T_COLORS = {
  ready: ["oklch(0.58 0.12 158)", "oklch(0.95 0.035 158)"],
  rent: ["var(--color-accent-800)", "var(--color-accent-100)"],
  breakdown: ["oklch(0.56 0.18 29)", "oklch(0.94 0.035 29)"],
  returning: ["var(--color-accent-500)", "var(--color-accent-100)"],
  service: ["var(--color-neutral-700)", "var(--color-neutral-200)"],
  yard: ["var(--color-neutral-400)", "var(--color-neutral-100)"]
};

const stMap = {};
ST_DATA.forEach(s => {
  stMap[s.key] = { ...s, label: s.names[0], solid: T_COLORS[s.key][0], tint: T_COLORS[s.key][1] };
});

const sets = SETS.map((n, i) => ({
  name: n,
  fg: i === 0 ? "var(--color-accent-800)" : "var(--color-neutral-600)",
  bg: i === 0 ? "var(--color-accent-100)" : "transparent",
  dot: i === 0 ? "var(--color-accent)" : "transparent",
  pick: () => {}
}));

const nameRows = ST_DATA.map(s => ({
  old: s.old,
  desc: s.desc,
  solid: stMap[s.key].solid,
  tint: stMap[s.key].tint,
  cells: s.names.map((l, i) => ({
    label: l,
    bg: i === 0 ? "color-mix(in srgb, var(--color-accent) 6%, transparent)" : "transparent"
  }))
}));

const ST_SIMPLIFIED = {
  "Rented": ["var(--color-accent-800)", "var(--color-bg)", "var(--color-bg)"],
  "Broken on site": ["var(--color-neutral-900)", "var(--color-bg)", "var(--color-bg)"],
  "Coming back": ["var(--color-accent-100)", "var(--color-accent-900)", "var(--color-accent-500)"],
  "Needs repair": ["var(--color-neutral-200)", "var(--color-text)", "var(--color-neutral-700)"],
  "Parked": ["transparent", "var(--color-neutral-800)", "var(--color-neutral-400)"],
  "Ready to rent": ["var(--color-accent)", "var(--color-bg)", "var(--color-bg)"]
};
const stSimplified = l => ({ label: l, bg: ST_SIMPLIFIED[l][0], fg: ST_SIMPLIFIED[l][1], dot: ST_SIMPLIFIED[l][2] });
const DOT_SIMPLIFIED = { "Rented": "var(--color-accent-800)", "Coming back": "var(--color-accent-400)", "Needs repair": "var(--color-neutral-600)", "Broken on site": "var(--color-neutral-900)", "Parked": "var(--color-neutral-400)", "Ready to rent": "var(--color-accent)" };
const COUNT_SIMPLIFIED = { "Rented": 180, "Coming back": 8, "Needs repair": 12, "Broken on site": 3, "Parked": 25, "Ready to rent": 12 };

const tiles = Object.keys(COUNT_SIMPLIFIED).map((k, i) => ({
  label: k, count: COUNT_SIMPLIFIED[k], edge: i ? "1.5px solid var(--color-text)" : "none", bg: "transparent", fg: "var(--color-text)", dot: DOT_SIMPLIFIED[k]
}));

const MACHINES_DATA = [
  { id: "56695", name: "JCB 3DX Super", cat: "Earthmoving", sub: "Backhoe loader", serial: "LGZLS101CSZ162038", year: 2021, make: "JCB", model: "3DX Super", ofm: "900034281", customer: "Sree Balaji Constructions", site: "Porur, Chennai", status: "rent", since: "On rent for 12 days" },
  { id: "56702", name: "CAT 320D2", cat: "Earthmoving", sub: "Excavator", serial: "CAT0320DKZBF01452", year: 2019, make: "CAT", model: "320D2", ofm: "900034297", customer: "Larsen Infra Works", site: "Sriperumbudur", status: "breakdown", since: "Reported 3 hours ago" },
  { id: "57110", name: "Genie GS-1932", cat: "Access", sub: "Scissor lift", serial: "GS3016A-128834", year: 2022, make: "Genie", model: "GS-1932", ofm: "900034310", customer: "Prestige Interiors", site: "OMR, Chennai", status: "returning", since: "Expected today, 6 PM" },
  { id: "57221", name: "Manitou MT 1840", cat: "Material handling", sub: "Telehandler", serial: "MAN1840EZ77321", year: 2020, make: "Manitou", model: "MT 1840", ofm: "—", customer: "", site: "Bay 4", status: "service", since: "Back since 26 Sep" },
  { id: "57305", name: "Haulotte HA16 RTJ", cat: "Access", sub: "Boom lift", serial: "HA16RTJ-4410982", year: 2018, make: "Haulotte", model: "HA16 RTJ", ofm: "—", customer: "", site: "Bay 7", status: "yard", since: "Parked since 14 Sep" },
  { id: "57412", name: "Kirloskar 125 kVA", cat: "Power", sub: "Generator", serial: "KOEL125-2203931", year: 2023, make: "Kirloskar", model: "KG1-125", ofm: "—", customer: "", site: "Bay 2", status: "ready", since: "Ready since 27 Sep" },
  { id: "57498", name: "Hamm HD 12 VV", cat: "Earthmoving", sub: "Tandem roller", serial: "H1840321", year: 2021, make: "Hamm", model: "HD 12 VV", ofm: "900034355", customer: "Ramky Projects", site: "Guindy", status: "rent", since: "On rent for 40 days" },
  { id: "57560", name: "JCB 520-40", cat: "Material handling", sub: "Telehandler", serial: "JCB5204012288", year: 2022, make: "JCB", model: "520-40", ofm: "—", customer: "", site: "Bay 1", status: "ready", since: "Ready since 28 Sep" }
];

const machines = [
  ["Digging", "Loader digger", "1001", "XXX", 2021, "50011", "Terrax", "Northside Builders", "Rented", "TX-200"],
  ["Digging", "Crawler digger", "1002", "XXX", 2019, "50012", "Hollin", "Riverbank Works", "Broken on site", "HX-30"],
  ["Height work", "Platform lift", "1003", "XXX", 2022, "50013", "Liftmo", "Hilltop Homes", "Coming back", "LM-19"],
  ["Loading", "Reach loader", "1004", "XXX", 2020, "—", "Varden", "—", "Needs repair", "VR-18"],
  ["Height work", "Arm lift", "1005", "XXX", 2018, "—", "Skyreach", "—", "Parked", "SR-16"],
  ["Power units", "Power set", "1006", "XXX", 2023, "—", "Voltek", "—", "Ready to rent", "VK-125"]
].map(([cat, sub, id, serial, year, ofm, make, customer, s, model], i) => ({
  cat, sub, id, serial, year, ofm, make, customer, model, status: s,
  since: ["for 12 days", "3 hrs ago", "due in 5 hrs", "for 3 days", "for 2 weeks", "since yesterday"][i],
  st: stSimplified(s),
  hl: i === 0 ? "var(--color-accent-100)" : "transparent"
}));

const rows = MACHINES_DATA.map(m => ({
  ...m,
  st: stMap[m.status],
  where: m.customer || "In yard",
  bg: m.id === "56702" ? "color-mix(in srgb, var(--color-accent) 5%, transparent)" : "transparent",
  open: () => {}
}));

const mobileTiles = ST_DATA.map(s => {
  const on = s.key === "breakdown";
  return {
    ...stMap[s.key],
    border: on ? "1.5px solid var(--color-accent)" : "1px solid var(--color-divider)",
    bg: on ? "var(--color-accent-100)" : "transparent",
    radio: on ? "7px solid var(--color-accent)" : "1.5px solid var(--color-neutral-500)",
    pick: () => {}
  };
});

const JOURNEY_LIST = ["ready", "rent", "returning", "service"];
const journey = JOURNEY_LIST.map((k, i) => {
  const done = i < 1, cur = i === 1;
  return {
    label: stMap[k].label,
    icon: done ? IC.tick : stMap[k].icon,
    ring: done || cur ? "2px solid var(--color-accent)" : "1.5px solid var(--color-neutral-400)",
    fill: done ? "var(--color-accent)" : cur ? "var(--color-accent-100)" : "transparent",
    iconColor: done ? "var(--color-bg)" : cur ? "var(--color-accent)" : "var(--color-neutral-500)",
    line: i === JOURNEY_LIST.length - 1 ? "transparent" : "var(--color-neutral-300)",
    weight: cur ? 700 : 500,
    textColor: done || cur ? "var(--color-text)" : "var(--color-neutral-600)",
    note: cur ? "Reported 3 hours ago" : done ? "Done" : ""
  };
});

const sel = {
  ...MACHINES_DATA[1],
  st: stMap.breakdown
};

const facts = [
  ["Asset code", sel.id], ["Serial number", sel.serial], ["Category", sel.cat],
  ["Sub category", sel.sub], ["Make", sel.make], ["Model", sel.model],
  ["Year", String(sel.year)], ["OFM number", sel.ofm], ["Customer", sel.customer || "—"],
  ["Location", sel.site]
].map(([k, v]) => ({ k, v }));

const tickets = [
  { id: "SR-1042", title: "Hydraulic leak at boom", person: "Rajini", initials: "RJ", date: "29 Sep 2026", status: "Open", bg: "var(--color-accent-100)", fg: "var(--color-accent-800)" },
  { id: "SR-1017", title: "250-hour service", person: "Kamal", initials: "KM", date: "02 Sep 2026", status: "Done", bg: "var(--color-neutral-200)", fg: "var(--color-neutral-800)" }
];

const spares = [
  { name: "Hydraulic hose", qty: 2, unit: "Nos", usedBg: "var(--color-accent)", usedFg: "var(--color-bg)", backBg: "transparent", backFg: "var(--color-text)" },
  { name: "Tool bag", qty: 1, unit: "Nos", usedBg: "transparent", usedFg: "var(--color-text)", backBg: "var(--color-accent)", backFg: "var(--color-bg)" },
  { name: "Grease cartridge", qty: 4, unit: "Nos", usedBg: "var(--color-accent)", usedFg: "var(--color-bg)", backBg: "transparent", backFg: "var(--color-text)" }
];

const W = [["Master", "Masters"], ["service", "Service"], ["store", "Store"], ["approvel", "Approvals"], ["report", "Reports"], ["Mis Report", "MIS Reports"], ["Setting", "Settings"], ["Machine status", "Machines"], ["Total Count", "Total machines"], ["On Hire", "Rented"], ["Inward Pending", "Coming back"], ["Yard (TBS)", "Needs repair"], ["On Hire Break Down", "Broken on site"], ["Yard", "Parked"], ["Reedy To Rent", "Ready to rent"], ["Search Serial Number", "Find by serial number"], ["Reset", "Clear"], ["AssetCode", "Machine no."], ["SerialNumber", "Serial no."], ["Ofm Number", "OFM no."], ["view detail", "View"], ["Asset number", "Machine no."], ["Ticket number", "Complaint no."], ["Assigned person", "Person"], ["Pending / Completed", "Open / Done"], ["Complain remark", "What's wrong?"], ["next", "Next"], ["Spare register", "Tools and spares"], ["Spare", "Tool or spare"], ["quantity", "How many"], ["Nos", "No."], ["vehicle number", "Vehicle number"], ["Add new person", "Add another person"], ["check out", "Finish job"], ["check out date / time", "Finished on / at"], ["used / not used", "Used / Not used"], ["Complain report", "What was done?"]];
const words = W.map(([old, now]) => ({ old, now }));

const closeCheckout = () => {};
const openCheckout = () => {};
const setTbYes = () => {};
const setTbNo = () => {};
const onQuery = () => {};
const clearFilter = () => {};

const tbYes = { bg: "var(--color-accent-100)", fg: "var(--color-accent-900)" };
const tbNo = { bg: "transparent", fg: "var(--color-text)" };
const mobileLabel = "Broken down on site";
const filterLabel = "All";
const query = "";

const checkout = false;
const hasFilter = false;
const noRows = false;
const tbLabel = "Yes, tool bag goes with the van";
const vanName = "TN-09-BF-4412";
const locName = "Sriperumbudur Yard";
const filter = "All";
const lead = "Rajini";
const onFilter = () => {};
const onLead = () => {};
const techList = ["Rajini", "Kamal"];
const catalog = [];

export default function FigmaFlowSimplified() {
  return (
    <div className="showcase-wrapper" style={{ overflowX: 'auto', padding: '24px' }}>
      

<div style={{padding: '40px 44px 60px', display: 'flex', flexDirection: 'column', gap: '30px'}}>

<div style={{maxWidth: '1400px'}}><h1 style={{margin: '0', fontSize: '40px', lineHeight: '1'}}>Same flow, simpler screens</h1><p style={{margin: '8px 0 0', fontSize: '15px', color: 'var(--color-neutral-700)', maxWidth: '980px', textWrap: 'pretty'}}>These are the same 6 screens and fields as the Figma file, left to right. Each screen puts a clear title and a "you are here" line at the top and keeps one main button on the bottom right. Complaint steps show "Step 1 of 2" / "Step 2 of 2", and every complaint shows its status.</p></div>

<div style={{display: 'flex', gap: '0', alignItems: 'flex-start'}}>
{(screens || []).map((s, i) => (
<React.Fragment key={i}>
<div style={{display: 'flex', alignItems: 'flex-start', flex: 'none'}}>
<div style={{display: 'flex', flexDirection: 'column', gap: '12px', width: '1200px', flex: 'none'}}>
<div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><span style={{width: '40px', height: '40px', flex: 'none', background: 'var(--color-accent-900)', color: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 20px var(--font-heading)'}}>{s.n}</span><div><div style={{fontSize: '18px', fontWeight: '600'}}>{s.title}</div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)', whiteSpace: 'nowrap'}}>{s.does} · Figma: {s.fig}</div></div></div>
</div>
{Boolean(s.arrow) && (
<React.Fragment><div style={{flex: 'none', width: '80px'}}></div></React.Fragment>
)}
</div>
</React.Fragment>
))}
</div>

<div style={{display: 'flex', gap: '0', alignItems: 'flex-start', marginTop: '-18px'}}>

<div data-screen-label="01 Machines" style={{flex: 'none', width: '1200px', minHeight: '900px', background: 'var(--color-bg)', border: '1.5px solid var(--color-text)', display: 'flex', flexDirection: 'column'}}>
<div style={{height: '60px', display: 'flex', alignItems: 'center', gap: '4px', padding: '0 24px', background: 'var(--color-accent-900)', color: 'var(--color-bg)'}}><span style={{font: '600 22px var(--font-heading)', letterSpacing: '.05em', marginRight: '18px'}}>YARD</span><span style={{padding: '8px 12px', fontSize: '14px', fontWeight: '600', boxShadow: 'inset 0 -2px 0 var(--color-accent-300)'}}>Machines</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Service</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Store</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Approvals</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Reports</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Masters</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Settings</span><span style={{flex: '1'}}></span><span style={{width: '34px', height: '34px', borderRadius: '50%', background: 'var(--color-accent-300)', color: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600'}}>US</span></div>
<div style={{padding: '28px 32px 32px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
<div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>You are here: all machines</div><h2 style={{margin: '2px 0 0', fontSize: '44px', lineHeight: '1'}}>Machines <span style={{fontWeight: '400', color: 'var(--color-neutral-600)'}}>240</span></h2></div>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', border: '1.5px solid var(--color-text)'}}>
{(tiles || []).map((t, i) => (
<React.Fragment key={i}><div style={{padding: '12px 14px', borderLeft: t.edge, background: t.bg, color: t.fg, display: 'flex', flexDirection: 'column', gap: '6px'}}><span style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: '600'}}><span style={{width: '10px', height: '10px', borderRadius: '50%', background: t.dot}}></span>{t.label}</span><span style={{font: '600 34px/1 var(--font-heading)'}}>{t.count}</span></div></React.Fragment>
))}
</div>
<div style={{display: 'flex', gap: '12px'}}><div style={{flex: '1', height: '52px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', border: '1.5px solid var(--color-neutral-400)', background: '#fff'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="1.5" strokeLinecap="round"><path d="M11 3a8 8 0 1 0 0 16a8 8 0 1 0 0-16zM21 21l-4.3-4.3"></path></svg><span style={{fontSize: '16px', color: 'var(--color-neutral-600)'}}>Search by serial number, e.g. XXX</span></div><div style={{width: '200px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '16px'}}>Status: All<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg></div><button className="btn btn-secondary" style={{height: '52px', padding: '0 20px', fontSize: '16px'}}>Clear</button></div>
<div style={{borderTop: '1.5px solid var(--color-text)'}}>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1.2fr) 80px minmax(0,1.4fr) 54px 96px minmax(0,1.2fr) 160px 20px', gap: '12px', padding: '10px 10px', font: '600 11.5px var(--font-body)', letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', borderBottom: '1px solid var(--color-divider)'}}><span>Make · Model</span><span>Category</span><span>Mach. no.</span><span>Serial no.</span><span>Year</span><span>OFM no.</span><span>Customer</span><span>Status · last update</span><span></span></div>
{(machines || []).map((m, i) => (
<React.Fragment key={i}>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1.2fr) 80px minmax(0,1.4fr) 54px 96px minmax(0,1.2fr) 160px 20px', gap: '12px', alignItems: 'center', minHeight: '68px', padding: '6px 10px', borderBottom: '1px solid var(--color-divider)', fontSize: '14px', background: m.hl}}>
<span style={{fontSize: '15px', fontWeight: '600'}}>{m.make} {m.model}</span><span><span style={{display: 'block'}}>{m.cat}</span><span style={{display: 'block', fontSize: '12.5px', color: 'var(--color-neutral-700)'}}>{m.sub}</span></span><span>{m.id}</span><span style={{fontFamily: 'ui-monospace,Menlo,monospace', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis'}}>{m.serial}</span><span>{m.year}</span><span>{m.ofm}</span><span>{m.customer}</span>
<span style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px'}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '6px', height: '28px', padding: '0 11px', borderRadius: '14px', background: m.st.bg, color: m.st.fg, fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap'}}><span style={{width: '7px', height: '7px', borderRadius: '50%', background: m.st.dot}}></span>{m.st.label}</span><span style={{fontSize: '12.5px', color: 'var(--color-neutral-700)', whiteSpace: 'nowrap'}}>{m.since}</span></span>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
</div>
</React.Fragment>
))}
</div>
<div style={{fontSize: '13.5px', color: 'var(--color-neutral-700)'}}>Tap any row to open that machine. Row 1 (highlighted) opens screen 02.</div>
</div>
</div>

<div style={{flex: 'none', width: '80px', alignSelf: 'center', display: 'flex', justifyContent: 'center'}}><svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="var(--color-accent-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h42M34 3l10 9-10 9"></path></svg></div>

<div data-screen-label="02 Complaints" style={{flex: 'none', width: '1200px', minHeight: '900px', background: 'var(--color-bg)', border: '1.5px solid var(--color-text)', display: 'flex', flexDirection: 'column'}}>
<div style={{height: '60px', display: 'flex', alignItems: 'center', gap: '4px', padding: '0 24px', background: 'var(--color-accent-900)', color: 'var(--color-bg)'}}><span style={{font: '600 22px var(--font-heading)', letterSpacing: '.05em', marginRight: '18px'}}>YARD</span><span style={{padding: '8px 12px', fontSize: '14px', fontWeight: '600', boxShadow: 'inset 0 -2px 0 var(--color-accent-300)'}}>Machines</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Service</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Store</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Approvals</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Reports</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Masters</span><span style={{padding: '8px 12px', fontSize: '14px', opacity: '.75'}}>Settings</span><span style={{flex: '1'}}></span><span style={{width: '34px', height: '34px', borderRadius: '50%', background: 'var(--color-accent-300)', color: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600'}}>US</span></div>
<div style={{padding: '28px 32px 32px', display: 'flex', flexDirection: 'column', gap: '22px'}}>
<div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', fontWeight: '600', color: 'var(--color-accent-700)'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>Machines</div>
<div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px'}}>
<div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>You are here: complaints for one machine</div><h2 style={{margin: '2px 0 0', fontSize: '44px', lineHeight: '1'}}>Terrax TX-200</h2><div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px', fontSize: '15px', color: 'var(--color-neutral-700)'}}><span>Machine no. 1001</span><span>·</span><span style={{display: 'inline-flex', alignItems: 'center', gap: '6px', height: '28px', padding: '0 11px', borderRadius: '14px', background: 'var(--color-accent-800)', color: 'var(--color-bg)', fontSize: '13px', fontWeight: '600'}}>Rented</span></div></div>
<button className="btn btn-primary blueprint" style={{height: '60px', padding: '0 30px', fontSize: '18px', fontWeight: '600', gap: '10px'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5v14"></path></svg>New complaint<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button>
</div>
<div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderTop: '1.5px solid var(--color-text)', paddingTop: '18px'}}>
<h3 style={{margin: '0', fontSize: '28px'}}>Complaints <span style={{fontWeight: '400', color: 'var(--color-neutral-600)'}}>2</span></h3>
<div style={{display: 'flex', gap: '10px'}}><div style={{width: '200px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '15px'}}>Person: All<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg></div><div style={{width: '180px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '15px', color: 'var(--color-neutral-600)'}}>Date<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path></svg></div><button className="btn btn-secondary" style={{height: '48px', padding: '0 18px', fontSize: '15px'}}>Clear</button></div>
</div>
<div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '20px', alignItems: 'center', padding: '18px 20px', border: '1.5px solid var(--color-text)'}}>
<div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}><div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><span style={{fontSize: '18px', fontWeight: '600'}}>Complaint 2041</span><span style={{display: 'inline-flex', alignItems: 'center', height: '28px', padding: '0 12px', borderRadius: '14px', background: 'var(--color-accent)', color: 'var(--color-bg)', fontSize: '13px', fontWeight: '600'}}>Open</span></div><div style={{display: 'flex', gap: '20px', fontSize: '15px', color: 'var(--color-neutral-800)'}}><span>29/09/2026</span><span>Person: Priya</span></div><div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--color-accent-700)'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM12 6v6l4 2"></path></svg>Opened 3 hrs ago · last update 20 min ago</div></div>
<div style={{display: 'flex', gap: '10px'}}><button className="btn btn-secondary" style={{height: '50px', padding: '0 22px', fontSize: '16px'}}>Edit</button><button className="btn btn-primary blueprint" style={{height: '50px', padding: '0 26px', fontSize: '16px', fontWeight: '600'}}>View<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
</div>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '20px', alignItems: 'center', padding: '18px 20px', border: '1px solid var(--color-divider)'}}>
<div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}><div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><span style={{fontSize: '18px', fontWeight: '600'}}>Complaint 2037</span><span style={{display: 'inline-flex', alignItems: 'center', height: '28px', padding: '0 12px', borderRadius: '14px', background: 'var(--color-neutral-200)', color: 'var(--color-text)', fontSize: '13px', fontWeight: '600'}}>Done</span></div><div style={{display: 'flex', gap: '20px', fontSize: '15px', color: 'var(--color-neutral-800)'}}><span>02/09/2026</span><span>Person: Arun</span></div><div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-neutral-700)'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM12 6v6l4 2"></path></svg>Finished 4 weeks ago · took 6 hrs</div></div>
<div style={{display: 'flex', gap: '10px'}}><button className="btn btn-secondary" style={{height: '50px', padding: '0 22px', fontSize: '16px'}}>Edit</button><button className="btn btn-secondary" style={{height: '50px', padding: '0 26px', fontSize: '16px', fontWeight: '600'}}>View</button></div>
</div>
</div>
<div style={{fontSize: '13.5px', color: 'var(--color-neutral-700)'}}>"New complaint" opens screen 03. "View" opens screen 05.</div>
</div>
</div>

<div style={{flex: 'none', width: '80px', alignSelf: 'center', display: 'flex', justifyContent: 'center'}}><svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="var(--color-accent-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h42M34 3l10 9-10 9"></path></svg></div>

<div data-screen-label="03 New complaint step 1" style={{flex: 'none', width: '1200px', minHeight: '900px', background: 'color-mix(in srgb,var(--color-accent-900) 45%,var(--color-bg))', border: '1.5px solid var(--color-text)', display: 'flex', justifyContent: 'flex-end'}}>
<div style={{width: '620px', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column'}}>
<div style={{padding: '26px 30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}><div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>Terrax TX-200 · Machine no. 1001</div><h2 style={{margin: '4px 0 0', fontSize: '38px', lineHeight: '1'}}>New complaint</h2></div><button className="btn btn-secondary" style={{width: '46px', height: '46px', padding: '0'}} title="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button></div>
<div style={{padding: '20px 30px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
<div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}><span style={{height: '5px', background: 'var(--color-accent)'}}></span><span style={{fontSize: '14px', fontWeight: '700'}}>Step 1 of 2 · The problem</span></div>
<div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}><span style={{height: '5px', background: 'var(--color-neutral-300)'}}></span><span style={{fontSize: '14px', color: 'var(--color-neutral-600)'}}>Step 2 · Tools and spares</span></div>
</div>
<div style={{padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: '20px', flex: '1'}}>
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px'}}>
<label className="field"><label style={{fontSize: '15px', fontWeight: '600', color: 'var(--color-text)'}}>Date</label><div style={{height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '16px'}}>29/09/2026<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path></svg></div></label>
<label className="field"><label style={{fontSize: '15px', fontWeight: '600', color: 'var(--color-text)'}}>Time</label><div style={{height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '16px'}}>11:20 AM<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM12 6v6l4 2"></path></svg></div></label>
</div>
<div className="field"><label style={{fontSize: '15px', fontWeight: '600', color: 'var(--color-text)'}}>Person</label><div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}><span style={{height: '50px', padding: '0 18px 0 6px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '25px', border: '2px solid var(--color-accent)', background: 'var(--color-accent-100)', fontSize: '16px', fontWeight: '600'}}><span style={{width: '38px', height: '38px', borderRadius: '50%', background: 'var(--color-accent)', color: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px'}}>PR</span>Priya</span><span style={{height: '50px', padding: '0 18px 0 6px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '25px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '16px', fontWeight: '600'}}><span style={{width: '38px', height: '38px', borderRadius: '50%', background: 'var(--color-neutral-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px'}}>AR</span>Arun</span><span style={{height: '50px', padding: '0 18px 0 6px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '25px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '16px', fontWeight: '600'}}><span style={{width: '38px', height: '38px', borderRadius: '50%', background: 'var(--color-neutral-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px'}}>ME</span>Meena</span></div></div>
<label className="field"><label style={{fontSize: '15px', fontWeight: '600', color: 'var(--color-text)'}}>What's wrong?</label><textarea className="input" placeholder="Example: oil leaking near the arm" style={{minHeight: '190px', fontSize: '16px', border: '1.5px solid var(--color-neutral-400)', background: '#fff'}} defaultValue="Oil leaking near the arm. Machine stopped." /></label>
</div>
<div style={{padding: '18px 30px 26px', borderTop: '1px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '14px', color: 'var(--color-neutral-700)'}}>Next: add tools and spares</span><button className="btn btn-primary blueprint" style={{height: '58px', padding: '0 40px', fontSize: '18px', fontWeight: '600'}}>Next<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
</div>
</div>

<div style={{flex: 'none', width: '80px', alignSelf: 'center', display: 'flex', justifyContent: 'center'}}><svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="var(--color-accent-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h42M34 3l10 9-10 9"></path></svg></div>

<div data-screen-label="04 Tools and spares" style={{flex: 'none', width: '1200px', minHeight: '900px', background: 'color-mix(in srgb,var(--color-accent-900) 45%,var(--color-bg))', border: '1.5px solid var(--color-text)', display: 'flex', justifyContent: 'flex-end'}}>
<div style={{width: '620px', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column'}}>
<div style={{padding: '26px 30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}><div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>Terrax TX-200 · Machine no. 1001</div><h2 style={{margin: '4px 0 0', fontSize: '38px', lineHeight: '1'}}>New complaint</h2></div><div style={{display: 'flex', gap: '8px'}}><button className="btn btn-secondary" style={{width: '46px', height: '46px', padding: '0'}} title="Print"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z"></path></svg></button><button className="btn btn-secondary" style={{width: '46px', height: '46px', padding: '0'}} title="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button></div></div>
<div style={{padding: '20px 30px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
<div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}><span style={{height: '5px', background: 'var(--color-accent)'}}></span><span style={{fontSize: '14px', color: 'var(--color-neutral-700)', display: 'flex', alignItems: 'center', gap: '6px'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>Step 1 · The problem</span></div>
<div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}><span style={{height: '5px', background: 'var(--color-accent)'}}></span><span style={{fontSize: '14px', fontWeight: '700'}}>Step 2 of 2 · Tools and spares</span></div>
</div>
<div style={{padding: '22px 30px', display: 'flex', flexDirection: 'column', gap: '16px', flex: '1'}}>
<div style={{border: '1.5px solid var(--color-text)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '14px'}}>
<div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><span style={{width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', color: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600'}}>PR</span><div style={{flex: '1'}}><div style={{fontSize: '12.5px', color: 'var(--color-neutral-700)'}}>Person 1</div><div style={{fontSize: '17px', fontWeight: '600'}}>Priya</div></div></div>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 128px auto', gap: '8px', alignItems: 'end', padding: '12px', background: 'var(--color-neutral-100)'}}>
<div className="field"><label style={{fontSize: '13.5px', fontWeight: '600', color: 'var(--color-text)'}}>Tool or spare</label><div style={{height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '15px', color: 'var(--color-neutral-600)'}}>Choose<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg></div></div>
<div className="field"><label style={{fontSize: '13.5px', fontWeight: '600', color: 'var(--color-text)'}}>How many</label><div style={{height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1.5px solid var(--color-neutral-400)', background: '#fff', padding: '0 4px'}}><span style={{width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>−</span><b style={{fontSize: '16px'}}>1</b><span style={{width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>+</span></div></div>
<button className="btn btn-primary blueprint" style={{height: '48px', padding: '0 20px', fontSize: '16px', fontWeight: '600'}}>Add<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button>
</div>
<div>
<div style={{display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) 90px 44px', gap: '8px', padding: '6px 0', font: '600 11.5px var(--font-body)', letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', borderBottom: '1.5px solid var(--color-text)'}}><span>No.</span><span>Tool or spare</span><span>How many</span><span></span></div>
<div style={{display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) 90px 44px', gap: '8px', alignItems: 'center', minHeight: '48px', borderBottom: '1px solid var(--color-divider)', fontSize: '15px'}}><span>1</span><span>Hydraulic hose</span><b>2</b><span style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-700)'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"></path></svg></span></div>
<div style={{display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) 90px 44px', gap: '8px', alignItems: 'center', minHeight: '48px', borderBottom: '1px solid var(--color-divider)', fontSize: '15px'}}><span>2</span><span>O-ring kit</span><b>1</b><span style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-700)'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"></path></svg></span></div>
</div>
<div style={{display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr)', gap: '16px', alignItems: 'end'}}>
<div className="field"><label style={{fontSize: '13.5px', fontWeight: '600', color: 'var(--color-text)'}}>Tool bag</label><div style={{display: 'flex', gap: '6px'}}><span style={{height: '46px', padding: '0 22px', display: 'flex', alignItems: 'center', borderRadius: '23px', border: '2px solid var(--color-accent)', background: 'var(--color-accent-100)', fontSize: '15px', fontWeight: '600'}}>Yes</span><span style={{height: '46px', padding: '0 22px', display: 'flex', alignItems: 'center', borderRadius: '23px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '15px', fontWeight: '600'}}>No</span></div></div>
<div className="field"><label style={{fontSize: '13.5px', fontWeight: '600', color: 'var(--color-text)'}}>Vehicle number</label><div style={{height: '48px', display: 'flex', alignItems: 'center', padding: '0 12px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '15px'}}>XX 00 XX 0000</div></div>
</div>
</div>
<button className="btn btn-secondary" style={{height: '52px', width: '100%', fontSize: '16px', fontWeight: '600', border: '1.5px dashed var(--color-neutral-500)'}}>+ Add another person</button>
</div>
<div style={{padding: '18px 30px 26px', borderTop: '1px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><button className="btn btn-secondary" style={{height: '58px', padding: '0 26px', fontSize: '17px'}}>Back</button><button className="btn btn-primary blueprint" style={{height: '58px', padding: '0 40px', fontSize: '18px', fontWeight: '600'}}>Submit complaint<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
</div>
</div>

<div style={{flex: 'none', width: '80px', alignSelf: 'center', display: 'flex', justifyContent: 'center'}}><svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="var(--color-accent-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h42M34 3l10 9-10 9"></path></svg></div>

<div data-screen-label="05 Complaint details" style={{flex: 'none', width: '1200px', minHeight: '900px', background: 'color-mix(in srgb,var(--color-accent-900) 45%,var(--color-bg))', border: '1.5px solid var(--color-text)', display: 'flex', justifyContent: 'flex-end'}}>
<div style={{width: '620px', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column'}}>
<div style={{padding: '26px 30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}><div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>Terrax TX-200 · Machine no. 1001</div><div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}><h2 style={{margin: '0', fontSize: '38px', lineHeight: '1'}}>Complaint 2041</h2><span style={{display: 'inline-flex', alignItems: 'center', height: '30px', padding: '0 13px', borderRadius: '15px', background: 'var(--color-accent)', color: 'var(--color-bg)', fontSize: '14px', fontWeight: '600'}}>Open</span></div></div><div style={{display: 'flex', gap: '8px'}}><button className="btn btn-secondary" style={{width: '46px', height: '46px', padding: '0'}} title="Print"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z"></path></svg></button><button className="btn btn-secondary" style={{width: '46px', height: '46px', padding: '0'}} title="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button></div></div>
<div style={{margin: '18px 30px 0', padding: '12px 14px', background: 'var(--color-accent-100)', fontSize: '15px', color: 'var(--color-accent-900)'}}>Priya is working on this. When the work is done, press <b>Finish job</b>.</div>
<div style={{padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '16px', flex: '1'}}>
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--color-divider)'}}><div style={{padding: '12px 14px'}}><div style={{fontSize: '12.5px', color: 'var(--color-neutral-700)'}}>Date and time</div><div style={{fontSize: '16px', fontWeight: '600', marginTop: '2px'}}>29/09/2026 · 11:20 AM</div></div><div style={{padding: '12px 14px', borderLeft: '1px solid var(--color-divider)'}}><div style={{fontSize: '12.5px', color: 'var(--color-neutral-700)'}}>What's wrong?</div><div style={{fontSize: '16px', fontWeight: '600', marginTop: '2px'}}>Oil leaking near the arm</div></div></div>
<div style={{border: '1.5px solid var(--color-text)', padding: '16px 18px'}}>
<div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}><span style={{width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', color: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600'}}>PR</span><div><div style={{fontSize: '17px', fontWeight: '600'}}>Priya</div><div style={{fontSize: '13.5px', color: 'var(--color-neutral-700)'}}>Vehicle XX 00 XX 0000 · Tool bag: Yes</div></div></div>
<div style={{display: 'flex', justifyContent: 'space-between', minHeight: '44px', alignItems: 'center', borderTop: '1px solid var(--color-divider)', fontSize: '15px'}}><span>1 · Hydraulic hose</span><b>2</b></div>
<div style={{display: 'flex', justifyContent: 'space-between', minHeight: '44px', alignItems: 'center', borderTop: '1px solid var(--color-divider)', fontSize: '15px'}}><span>2 · O-ring kit</span><b>1</b></div>
</div>
</div>
<div style={{padding: '18px 30px 26px', borderTop: '1px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><button className="btn btn-secondary" style={{height: '58px', padding: '0 26px', fontSize: '17px'}}>Back</button><button className="btn btn-primary blueprint" style={{height: '58px', padding: '0 40px', fontSize: '18px', fontWeight: '600'}}>Finish job<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
</div>
</div>

<div style={{flex: 'none', width: '80px', alignSelf: 'center', display: 'flex', justifyContent: 'center'}}><svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="var(--color-accent-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h42M34 3l10 9-10 9"></path></svg></div>

<div data-screen-label="06 Finish job" style={{flex: 'none', width: '1200px', minHeight: '900px', background: 'color-mix(in srgb,var(--color-accent-900) 45%,var(--color-bg))', border: '1.5px solid var(--color-text)', display: 'flex', justifyContent: 'flex-end'}}>
<div style={{width: '620px', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column'}}>
<div style={{padding: '26px 30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}><div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>Complaint 2041 · Terrax TX-200</div><h2 style={{margin: '4px 0 0', fontSize: '38px', lineHeight: '1'}}>Finish job</h2></div><button className="btn btn-secondary" style={{width: '46px', height: '46px', padding: '0'}} title="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button></div>
<div style={{padding: '22px 30px', display: 'flex', flexDirection: 'column', gap: '18px', flex: '1'}}>
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px'}}>
<label className="field"><label style={{fontSize: '15px', fontWeight: '600', color: 'var(--color-text)'}}>Finished on</label><div style={{height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '16px'}}>29/09/2026<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path></svg></div></label>
<label className="field"><label style={{fontSize: '15px', fontWeight: '600', color: 'var(--color-text)'}}>Finished at</label><div style={{height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '16px'}}>4:30 PM<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM12 6v6l4 2"></path></svg></div></label>
</div>
<div><div style={{fontSize: '15px', fontWeight: '600', marginBottom: '6px'}}>Were these used?</div>
<div style={{borderTop: '1.5px solid var(--color-text)'}}>
<div style={{display: 'flex', alignItems: 'center', gap: '12px', minHeight: '60px', borderBottom: '1px solid var(--color-divider)'}}><span style={{flex: '1', fontSize: '16px'}}>Hydraulic hose <span style={{color: 'var(--color-neutral-700)'}}>× 2</span></span><span style={{height: '44px', padding: '0 20px', display: 'flex', alignItems: 'center', borderRadius: '22px', border: '2px solid var(--color-accent)', background: 'var(--color-accent-100)', fontSize: '15px', fontWeight: '600'}}>Used</span><span style={{height: '44px', padding: '0 20px', display: 'flex', alignItems: 'center', borderRadius: '22px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '15px', fontWeight: '600'}}>Not used</span></div>
<div style={{display: 'flex', alignItems: 'center', gap: '12px', minHeight: '60px', borderBottom: '1px solid var(--color-divider)'}}><span style={{flex: '1', fontSize: '16px'}}>O-ring kit <span style={{color: 'var(--color-neutral-700)'}}>× 1</span></span><span style={{height: '44px', padding: '0 20px', display: 'flex', alignItems: 'center', borderRadius: '22px', border: '1.5px solid var(--color-neutral-400)', background: '#fff', fontSize: '15px', fontWeight: '600'}}>Used</span><span style={{height: '44px', padding: '0 20px', display: 'flex', alignItems: 'center', borderRadius: '22px', border: '2px solid var(--color-accent)', background: 'var(--color-accent-100)', fontSize: '15px', fontWeight: '600'}}>Not used</span></div>
</div></div>
<label className="field"><label style={{fontSize: '15px', fontWeight: '600', color: 'var(--color-text)'}}>What was done?</label><textarea className="input" placeholder="Example: changed the arm hose" style={{minHeight: '110px', fontSize: '16px', border: '1.5px solid var(--color-neutral-400)', background: '#fff'}} /></label>
<div style={{display: 'flex', gap: '10px'}}><button className="btn btn-secondary" style={{height: '50px', padding: '0 16px', fontSize: '15px', gap: '8px'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15h6"></path></svg>Attach file</button><button className="btn btn-secondary" style={{height: '50px', padding: '0 16px', fontSize: '15px', gap: '8px'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>Send link</button></div>
</div>
<div style={{padding: '18px 30px 26px', borderTop: '1px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '14px', color: 'var(--color-neutral-700)'}}>Complaint changes to Done</span><button className="btn btn-primary blueprint" style={{height: '58px', padding: '0 40px', fontSize: '18px', fontWeight: '600'}}>Submit<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
</div>
</div>

</div>
</div>

    </div>
  );
}
