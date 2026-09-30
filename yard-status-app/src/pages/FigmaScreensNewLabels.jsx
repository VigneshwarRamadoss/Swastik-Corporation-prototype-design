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

export default function FigmaScreensNewLabels() {
  return (
    <div className="showcase-wrapper" style={{ overflowX: 'auto', padding: '24px' }}>
      

<div style={{padding: '40px 44px 60px', display: 'flex', flexDirection: 'column', gap: '56px'}}>

<div style={{maxWidth: '1440px'}}><h1 style={{margin: '0', fontSize: '40px', lineHeight: '1'}}>Figma screens · new labels and colors</h1><p style={{margin: '8px 0 0', fontSize: '15px', color: 'var(--color-neutral-700)', maxWidth: '900px'}}>The same 6 screens and elements as the Figma file, in the same order. Only the words and colors are changed.</p></div>

<div data-screen-label="01 Machines" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
<div style={{font: '600 13px ui-monospace,Menlo,monospace', color: 'var(--color-neutral-700)'}}>01 · Machines  (Figma: Frame 1 "Machine status")</div>
<div style={{width: '1440px', background: 'var(--color-bg)', border: '1px solid var(--color-divider)', display: 'flex', flexDirection: 'column'}}>
<div style={{height: '70px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 32px', background: 'var(--color-accent-900)', color: 'var(--color-bg)'}}>
<div style={{width: '150px', height: '30px', border: '1px dashed color-mix(in srgb,var(--color-bg) 50%,transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', letterSpacing: '.08em'}}>LOGO</div>
<div style={{flex: '1'}}></div>
<span style={{padding: '8px 14px', fontSize: '14px'}}>Masters</span><span style={{padding: '8px 14px', fontSize: '14px'}}>Service</span><span style={{padding: '8px 14px', fontSize: '14px'}}>Store</span><span style={{padding: '8px 14px', fontSize: '14px'}}>Approvals</span><span style={{padding: '8px 14px', fontSize: '14px'}}>Reports</span><span style={{padding: '8px 14px', fontSize: '14px'}}>MIS Reports</span><span style={{padding: '8px 14px', fontSize: '14px'}}>Settings</span>
<button className="btn" style={{height: '36px', padding: '0 22px', marginLeft: '12px', background: 'var(--color-bg)', color: 'var(--color-accent-900)', fontSize: '14px', fontWeight: '600', borderColor: 'var(--color-bg)'}}>Log in</button>
</div>
<div style={{padding: '44px 72px 56px', display: 'flex', flexDirection: 'column', gap: '44px'}}>
<h2 style={{margin: '0', fontSize: '44px', lineHeight: '1'}}>Machines</h2>
<div className="blueprint" style={{maxWidth: '1254px', padding: '32px 40px', display: 'flex', gap: '64px', alignItems: 'center'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<div style={{width: '220px', height: '220px', flex: 'none', borderRadius: '50%', background: 'conic-gradient(var(--color-accent-800) 0 75%,var(--color-accent-400) 0 78.3%,var(--color-neutral-600) 0 83.3%,var(--color-neutral-900) 0 84.6%,var(--color-neutral-300) 0 95%,var(--color-accent) 0 100%)'}}></div>
<div style={{flex: '1'}}>
<div style={{font: '600 32px var(--font-heading)'}}>Total machines: 240</div>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '26px 24px', marginTop: '26px', fontSize: '19px'}}>
<span style={{display: 'flex', alignItems: 'center', gap: '14px'}}><span style={{width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-accent-800)'}}></span>Rented: 180</span>
<span style={{display: 'flex', alignItems: 'center', gap: '14px'}}><span style={{width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-accent-400)'}}></span>Coming back: 8</span>
<span style={{display: 'flex', alignItems: 'center', gap: '14px'}}><span style={{width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-neutral-600)'}}></span>Needs repair: 12</span>
<span style={{display: 'flex', alignItems: 'center', gap: '14px'}}><span style={{width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-neutral-900)'}}></span>Broken on site: 3</span>
<span style={{display: 'flex', alignItems: 'center', gap: '14px'}}><span style={{width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-neutral-300)'}}></span>Parked: 25</span>
<span style={{display: 'flex', alignItems: 'center', gap: '14px'}}><span style={{width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-accent)'}}></span>Ready to rent: 12</span>
</div>
</div>
</div>
<div style={{display: 'flex', gap: '40px', alignItems: 'flex-end'}}>
<label className="field" style={{width: '450px'}}><label style={{fontSize: '19px', color: 'var(--color-text)', marginBottom: '10px'}}>Find by serial number</label><input className="input" placeholder="e.g. XXX" style={{height: '60px', fontSize: '17px', background: '#fff'}} /></label>
<label className="field" style={{width: '230px'}}><label style={{fontSize: '19px', color: 'var(--color-text)', marginBottom: '10px'}}>Status</label><select className="input" style={{height: '60px', fontSize: '17px', background: '#fff'}}><option>All</option><option>Rented</option><option>Coming back</option><option>Needs repair</option><option>Broken on site</option><option>Parked</option><option>Ready to rent</option></select></label>
<div style={{display: 'flex', gap: '20px'}}><button className="btn btn-primary blueprint" style={{height: '52px', padding: '0 30px', fontSize: '18px'}}>Search<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button><button className="btn btn-secondary" style={{height: '52px', padding: '0 30px', fontSize: '18px'}}>Clear</button></div>
</div>
</div>
<div style={{display: 'grid', gridTemplateColumns: '1.1fr 1.2fr 1fr 1.4fr .6fr 1fr .8fr 1.2fr 1fr .9fr 150px', gap: '12px', padding: '0 32px 14px', font: '600 19px var(--font-heading)', letterSpacing: '.02em'}}>
<span>Category</span><span>Sub category</span><span>Machine no.</span><span>Serial no.</span><span>Year</span><span>OFM no.</span><span>Make</span><span>Customer</span><span>Status</span><span>Model</span><span></span>
</div>
<div style={{borderTop: '1px solid var(--color-text)'}}>
{(machines || []).map((m, i) => (
<React.Fragment key={i}>
<div style={{display: 'grid', gridTemplateColumns: '1.1fr 1.2fr 1fr 1.4fr .6fr 1fr .8fr 1.2fr 1fr .9fr 150px', gap: '12px', alignItems: 'center', height: '86px', padding: '0 32px', borderBottom: '1px solid var(--color-text)', fontSize: '15px'}}>
<span>{m.cat}</span><span>{m.sub}</span><span>{m.id}</span><span style={{fontFamily: 'ui-monospace,Menlo,monospace', fontSize: '13px'}}>{m.serial}</span><span>{m.year}</span><span>{m.ofm}</span><span>{m.make}</span><span>{m.customer}</span><span style={{fontWeight: '600'}}>{m.status}</span><span>{m.model}</span>
<button className="btn btn-primary blueprint" style={{height: '46px', fontSize: '17px'}}>View<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button>
</div>
</React.Fragment>
))}
</div>
<div style={{height: '90px', marginTop: '90px', background: 'var(--color-neutral-200)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', font: '12px ui-monospace,Menlo,monospace', color: 'var(--color-neutral-800)'}}><span>© 2026 · Company, Inc. All rights reserved. Address</span><span>Item 1 | Item 2 | Item 3</span></div>
</div>
</div>

<div data-screen-label="02 Complaints" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
<div style={{font: '600 13px ui-monospace,Menlo,monospace', color: 'var(--color-neutral-700)'}}>02 · Complaints for one machine  (Figma: Frame 2)</div>
<div style={{width: '1440px', background: 'var(--color-bg)', border: '1px solid var(--color-divider)', display: 'flex', flexDirection: 'column'}}>
<div style={{height: '70px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 32px', background: 'var(--color-accent-900)', color: 'var(--color-bg)'}}>
<div style={{width: '150px', height: '30px', border: '1px dashed color-mix(in srgb,var(--color-bg) 50%,transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', letterSpacing: '.08em'}}>LOGO</div>
<div style={{flex: '1'}}></div>
<span style={{padding: '8px 14px', fontSize: '14px'}}>Masters</span><span style={{padding: '8px 14px', fontSize: '14px'}}>Service</span><span style={{padding: '8px 14px', fontSize: '14px'}}>Store</span><span style={{padding: '8px 14px', fontSize: '14px'}}>Approvals</span><span style={{padding: '8px 14px', fontSize: '14px'}}>Reports</span><span style={{padding: '8px 14px', fontSize: '14px'}}>MIS Reports</span><span style={{padding: '8px 14px', fontSize: '14px'}}>Settings</span>
<button className="btn" style={{height: '36px', padding: '0 22px', marginLeft: '12px', background: 'var(--color-bg)', color: 'var(--color-accent-900)', fontSize: '14px', fontWeight: '600', borderColor: 'var(--color-bg)'}}>Log in</button>
</div>
<div style={{height: '82px', display: 'flex', alignItems: 'center', gap: '22px', padding: '0 82px', background: 'var(--color-accent-100)', fontSize: '18px'}}><span>Home</span><span>›</span><span>Machines</span><span>›</span><span style={{fontWeight: '600'}}>Machine no. 1001</span></div>
<div style={{padding: '110px 82px 56px', display: 'flex', flexDirection: 'column', gap: '46px'}}>
<h2 style={{margin: '0', fontSize: '44px', lineHeight: '1'}}>Complaints</h2>
<button className="btn btn-primary blueprint" style={{width: '310px', height: '174px', flexDirection: 'column', gap: '20px', fontSize: '22px', fontWeight: '600'}}><span>New complaint</span><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14M12 5v14"></path></svg><i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button>
<div style={{display: 'flex', gap: '44px', alignItems: 'flex-end', marginTop: '60px'}}>
<label className="field" style={{width: '450px'}}><label style={{fontSize: '19px', color: 'var(--color-text)', marginBottom: '10px'}}>Date</label><input className="input" placeholder="DD/MM/YYYY" style={{height: '60px', fontSize: '17px', background: '#fff'}} /></label>
<label className="field" style={{width: '370px'}}><label style={{fontSize: '19px', color: 'var(--color-text)', marginBottom: '10px'}}>Person</label><select className="input" style={{height: '60px', fontSize: '17px', background: '#fff'}}><option>Meena</option><option>Priya</option><option>Arun</option></select></label>
<div style={{display: 'flex', gap: '28px'}}><button className="btn btn-primary blueprint" style={{height: '52px', padding: '0 30px', fontSize: '18px'}}>Search<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button><button className="btn btn-secondary" style={{height: '52px', padding: '0 30px', fontSize: '18px'}}>Clear</button></div>
</div>
</div>
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 460px', gap: '12px', padding: '0 67px 14px', font: '600 20px var(--font-heading)'}}><span>Complaint no.</span><span>Date</span><span>Person</span><span>Status</span><span></span></div>
<div style={{borderTop: '1px solid var(--color-text)'}}>
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 460px', gap: '12px', alignItems: 'center', height: '86px', padding: '0 67px', borderBottom: '1px solid var(--color-text)', fontSize: '17px'}}><span>2041</span><span>dd/mm/yyyy</span><span>Priya</span><span><span className="tag tag-accent" style={{fontSize: '14px', padding: '5px 12px'}}>Open</span></span><span style={{display: 'flex', gap: '30px', justifyContent: 'flex-end'}}><button className="btn btn-secondary" style={{width: '200px', height: '55px', fontSize: '18px', fontWeight: '600'}}>Edit</button><button className="btn btn-primary blueprint" style={{width: '176px', height: '47px', fontSize: '17px'}}>View<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></span></div>
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 460px', gap: '12px', alignItems: 'center', height: '86px', padding: '0 67px', borderBottom: '1px solid var(--color-text)', fontSize: '17px'}}><span>2037</span><span>dd/mm/yyyy</span><span>Arun</span><span><span className="tag tag-neutral" style={{fontSize: '14px', padding: '5px 12px'}}>Done</span></span><span style={{display: 'flex', gap: '30px', justifyContent: 'flex-end'}}><button className="btn btn-secondary" style={{width: '200px', height: '55px', fontSize: '18px', fontWeight: '600'}}>Edit</button><button className="btn btn-primary blueprint" style={{width: '176px', height: '47px', fontSize: '17px'}}>View<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></span></div>
<div style={{height: '86px', borderBottom: '1px solid var(--color-text)'}}></div>
<div style={{height: '86px', borderBottom: '1px solid var(--color-text)'}}></div>
</div>
<div style={{height: '90px', marginTop: '90px', background: 'var(--color-neutral-200)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', font: '12px ui-monospace,Menlo,monospace', color: 'var(--color-neutral-800)'}}><span>© 2026 · Company, Inc. All rights reserved. Address</span><span>Item 1 | Item 2 | Item 3</span></div>
</div>
</div>

<div data-screen-label="03 New complaint step 1" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
<div style={{font: '600 13px ui-monospace,Menlo,monospace', color: 'var(--color-neutral-700)'}}>03 · New complaint, page 1 of 2  (Figma: "new complinet" / "view details" 23:455)</div>
<div style={{width: '1440px', height: '1480px', background: 'color-mix(in srgb,var(--color-accent-900) 38%,var(--color-bg))', border: '1px solid var(--color-divider)', display: 'flex', flexDirection: 'column'}}>
<div style={{height: '70px', background: 'var(--color-accent-900)', opacity: '.55'}}></div>
<div style={{height: '82px', background: 'var(--color-accent-100)', opacity: '.4'}}></div>
<div style={{flex: '1', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '110px'}}>
<div className="blueprint" style={{width: '1340px', padding: '60px 104px 50px', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', position: 'relative', display: 'flex', flexDirection: 'column', gap: '48px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<button className="btn btn-secondary" style={{position: 'absolute', top: '24px', right: '24px', width: '52px', height: '52px', padding: '0'}} title="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button>
<div style={{display: 'grid', gridTemplateColumns: '450px 450px', gap: '90px'}}>
<label className="field"><label style={{fontSize: '26px', color: 'var(--color-text)', marginBottom: '12px'}}>Date</label><input className="input" style={{height: '68px', fontSize: '18px', background: '#fff'}} /></label>
<label className="field"><label style={{fontSize: '26px', color: 'var(--color-text)', marginBottom: '12px'}}>Time</label><input className="input" style={{height: '68px', fontSize: '18px', background: '#fff'}} /></label>
</div>
<label className="field" style={{width: '450px'}}><label style={{fontSize: '26px', color: 'var(--color-text)', marginBottom: '12px'}}>Person</label><input className="input" style={{height: '68px', fontSize: '18px', background: '#fff'}} /></label>
<label className="field" style={{width: '1105px'}}><label style={{fontSize: '26px', color: 'var(--color-text)', marginBottom: '12px'}}>What's wrong?</label><textarea className="input" style={{height: '272px', fontSize: '18px', background: '#fff'}} /></label>
<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '120px'}}><span style={{width: '180px'}}></span><span style={{display: 'flex', gap: '10px'}}><span style={{width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-accent)'}}></span><span style={{width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-neutral-300)'}}></span></span><button className="btn btn-primary blueprint" style={{width: '180px', height: '55px', fontSize: '20px', fontWeight: '600'}}>Next<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
</div>
</div>
</div>
</div>

<div data-screen-label="04 Tools and spares" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
<div style={{font: '600 13px ui-monospace,Menlo,monospace', color: 'var(--color-neutral-700)'}}>04 · New complaint, page 2 of 2: Tools and spares  (Figma: "new complinet" 23:257 "Spare register")</div>
<div style={{width: '1440px', height: '1480px', background: 'color-mix(in srgb,var(--color-accent-900) 38%,var(--color-bg))', border: '1px solid var(--color-divider)', display: 'flex', flexDirection: 'column'}}>
<div style={{height: '70px', background: 'var(--color-accent-900)', opacity: '.55'}}></div>
<div style={{height: '82px', background: 'var(--color-accent-100)', opacity: '.4'}}></div>
<div style={{flex: '1', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '110px'}}>
<div className="blueprint" style={{width: '1340px', padding: '60px 104px 50px', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', position: 'relative', display: 'flex', flexDirection: 'column', gap: '30px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<button className="btn btn-secondary" style={{position: 'absolute', top: '24px', right: '24px', width: '52px', height: '52px', padding: '0'}} title="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button>
<h2 style={{margin: '0', fontSize: '48px', lineHeight: '1'}}>Tools and spares</h2>
<div style={{border: '1px solid var(--color-text)', padding: '30px 40px 34px 60px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '44px'}}>
<svg style={{position: 'absolute', top: '12px', left: '12px'}} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path></svg>
<button className="btn btn-ghost" style={{position: 'absolute', top: '18px', right: '18px', width: '52px', height: '52px', padding: '0', color: 'var(--color-neutral-700)'}} title="Print"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z"></path></svg></button>
<div style={{display: 'flex', alignItems: 'center', gap: '30px', paddingLeft: '22px'}}><span style={{fontSize: '26px', width: '230px'}}>Person</span><input className="input" style={{width: '450px', height: '68px', fontSize: '18px', background: '#fff'}} /></div>
<div style={{display: 'flex', alignItems: 'center', gap: '20px'}}><span style={{fontSize: '26px', whiteSpace: 'nowrap', flex: 'none'}}>Tool or spare</span><select className="input" style={{width: '270px', height: '68px', fontSize: '18px', background: '#fff'}}><option></option><option>Hydraulic hose</option><option>O-ring kit</option></select><span style={{fontSize: '26px', marginLeft: '20px', whiteSpace: 'nowrap', flex: 'none'}}>How many</span><input className="input" style={{width: '130px', height: '68px', fontSize: '18px', background: '#fff'}} /><button className="btn btn-primary blueprint" style={{width: '180px', height: '55px', fontSize: '20px', fontWeight: '600', marginLeft: '14px'}}>Add<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
<div style={{display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '60px'}}>
<div style={{display: 'grid', gridTemplateColumns: '260px 280px 1fr', fontSize: '26px', width: '920px'}}><span>No.</span><span>Tool or spare</span><span>How many</span></div>
<div style={{display: 'flex', alignItems: 'center', gap: '34px'}}><div style={{width: '920px', height: '86px', background: 'var(--color-neutral-200)'}}></div><button className="btn btn-ghost" style={{width: '48px', height: '48px', padding: '0', color: 'var(--color-accent-700)'}} title="Remove"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM8 12h8"></path></svg></button></div>
</div>
<div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingLeft: '60px'}}>
<div style={{display: 'flex', alignItems: 'center', gap: '30px'}}><span style={{fontSize: '26px'}}>Tool bag</span>
<label className="radio" style={{flexDirection: 'column', gap: '6px', fontSize: '22px'}}><input type="radio" name="tb4" defaultChecked="checked" /><span className="dot"></span>Yes</label>
<label className="radio" style={{flexDirection: 'column', gap: '6px', fontSize: '22px'}}><input type="radio" name="tb4" /><span className="dot"></span>No</label>
</div>
<label className="field" style={{width: '320px'}}><label style={{fontSize: '26px', color: 'var(--color-text)', marginBottom: '12px'}}>Vehicle number</label><input className="input" style={{height: '68px', fontSize: '18px', background: '#fff'}} /></label>
</div>
</div>
<button className="btn btn-secondary" style={{width: '100%', height: '70px', fontSize: '20px', fontWeight: '600'}}>Add another person</button>
<div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '60px'}}><button className="btn btn-secondary" style={{width: '180px', height: '55px', fontSize: '20px', fontWeight: '600'}}>Back</button><span style={{display: 'flex', gap: '10px'}}><span style={{width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-neutral-300)'}}></span><span style={{width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-accent)'}}></span></span><button className="btn btn-primary blueprint" style={{width: '180px', height: '55px', fontSize: '20px', fontWeight: '600'}}>Submit<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
</div>
</div>
</div>
</div>

<div data-screen-label="05 Complaint details" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
<div style={{font: '600 13px ui-monospace,Menlo,monospace', color: 'var(--color-neutral-700)'}}>05 · Complaint details  (Figma: "view details" 23:606)</div>
<div style={{width: '1440px', height: '1480px', background: 'color-mix(in srgb,var(--color-accent-900) 38%,var(--color-bg))', border: '1px solid var(--color-divider)', display: 'flex', flexDirection: 'column'}}>
<div style={{height: '70px', background: 'var(--color-accent-900)', opacity: '.55'}}></div>
<div style={{height: '82px', background: 'var(--color-accent-100)', opacity: '.4'}}></div>
<div style={{flex: '1', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '110px'}}>
<div className="blueprint" style={{width: '1340px', padding: '60px 104px 50px', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', position: 'relative', display: 'flex', flexDirection: 'column', gap: '30px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<button className="btn btn-secondary" style={{position: 'absolute', top: '24px', right: '24px', width: '52px', height: '52px', padding: '0'}} title="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button>
<h2 style={{margin: '0', fontSize: '48px', lineHeight: '1'}}>Tools and spares</h2>
<div style={{border: '1px solid var(--color-text)', padding: '30px 40px 34px 60px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '44px'}}>
<svg style={{position: 'absolute', top: '12px', left: '12px'}} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path></svg>
<button className="btn btn-ghost" style={{position: 'absolute', top: '18px', right: '18px', width: '52px', height: '52px', padding: '0', color: 'var(--color-neutral-700)'}} title="Print"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z"></path></svg></button>
<div style={{display: 'flex', alignItems: 'center', gap: '30px', paddingLeft: '22px'}}><span style={{fontSize: '26px', width: '230px'}}>Person</span><input className="input" defaultValue="Priya" style={{width: '450px', height: '68px', fontSize: '18px', background: '#fff'}} /></div>
<div style={{display: 'flex', alignItems: 'center', gap: '20px'}}><span style={{fontSize: '26px', whiteSpace: 'nowrap', flex: 'none'}}>Tool or spare</span><select className="input" style={{width: '270px', height: '68px', fontSize: '18px', background: '#fff'}}><option></option><option>Hydraulic hose</option></select><span style={{fontSize: '26px', marginLeft: '20px', whiteSpace: 'nowrap', flex: 'none'}}>How many</span><input className="input" style={{width: '130px', height: '68px', fontSize: '18px', background: '#fff'}} /><button className="btn btn-primary blueprint" style={{width: '180px', height: '55px', fontSize: '20px', fontWeight: '600', marginLeft: '14px'}}>Add<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
<div style={{display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '60px'}}>
<div style={{display: 'grid', gridTemplateColumns: '260px 280px 1fr', fontSize: '26px', width: '920px'}}><span>No.</span><span>Tool or spare</span><span>How many</span></div>
<div style={{width: '920px', height: '86px', background: 'var(--color-neutral-200)', display: 'grid', gridTemplateColumns: '260px 280px 1fr', alignItems: 'center', fontSize: '20px'}}><span style={{paddingLeft: '16px'}}>1</span><span>Hydraulic hose</span><span>2</span></div>
</div>
<div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingLeft: '60px'}}>
<div style={{display: 'flex', alignItems: 'center', gap: '30px'}}><span style={{fontSize: '26px'}}>Tool bag</span>
<label className="radio" style={{flexDirection: 'column', gap: '6px', fontSize: '22px'}}><input type="radio" name="tb5" defaultChecked="checked" /><span className="dot"></span>Yes</label>
<label className="radio" style={{flexDirection: 'column', gap: '6px', fontSize: '22px'}}><input type="radio" name="tb5" /><span className="dot"></span>No</label>
</div>
<label className="field" style={{width: '320px'}}><label style={{fontSize: '26px', color: 'var(--color-text)', marginBottom: '12px'}}>Vehicle number</label><input className="input" defaultValue="XX 00 XX 0000" style={{height: '68px', fontSize: '18px', background: '#fff'}} /></label>
</div>
</div>
<div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '140px'}}><button className="btn btn-secondary" style={{width: '180px', height: '55px', fontSize: '20px', fontWeight: '600'}}>Back</button><button className="btn btn-primary blueprint" style={{width: '180px', height: '55px', fontSize: '20px', fontWeight: '600'}}>Finish job<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
</div>
</div>
</div>
</div>

<div data-screen-label="06 Finish job" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
<div style={{font: '600 13px ui-monospace,Menlo,monospace', color: 'var(--color-neutral-700)'}}>06 · Finish job  (Figma: "after check out")</div>
<div style={{width: '1440px', height: '1720px', background: 'color-mix(in srgb,var(--color-accent-900) 38%,var(--color-bg))', border: '1px solid var(--color-divider)', display: 'flex', flexDirection: 'column'}}>
<div style={{height: '70px', background: 'var(--color-accent-900)', opacity: '.55'}}></div>
<div style={{height: '82px', background: 'var(--color-accent-100)', opacity: '.4'}}></div>
<div style={{flex: '1', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '190px'}}>
<div className="blueprint" style={{width: '930px', padding: '50px 104px 50px', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', gap: '44px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<h2 style={{margin: '0', fontSize: '52px', lineHeight: '1'}}>Finish job</h2>
<div style={{display: 'grid', gridTemplateColumns: '254px 254px', gap: '96px'}}>
<label className="field"><label style={{fontSize: '26px', color: 'var(--color-text)', marginBottom: '12px'}}>Finished on</label><input className="input" style={{height: '66px', fontSize: '18px', background: 'var(--color-neutral-100)'}} /></label>
<label className="field"><label style={{fontSize: '26px', color: 'var(--color-text)', marginBottom: '12px'}}>Finished at</label><input className="input" style={{height: '70px', fontSize: '18px', background: 'var(--color-neutral-100)'}} /></label>
</div>
<div style={{display: 'flex', flexDirection: 'column', gap: '26px'}}>
<div style={{display: 'grid', gridTemplateColumns: '220px 250px 120px 1fr', fontSize: '26px', alignItems: 'end'}}><span>Tool or spare</span><span>How many</span><span style={{textAlign: 'center'}}>Used</span><span style={{textAlign: 'center'}}>Not used</span></div>
<div style={{display: 'grid', gridTemplateColumns: '470px 120px 1fr', alignItems: 'center'}}><div style={{height: '70px', background: 'var(--color-neutral-100)', border: '1px solid var(--color-text)', display: 'flex', alignItems: 'center', paddingLeft: '18px', fontSize: '18px', gap: '0'}}><span style={{width: '210px'}}>Hydraulic hose</span><span style={{width: '140px', height: '48px', background: '#fff', display: 'flex', alignItems: 'center', paddingLeft: '14px'}}>2</span></div><label className="radio" style={{justifySelf: 'center'}}><input type="radio" name="u1" defaultChecked="checked" /><span className="dot"></span></label><label className="radio" style={{justifySelf: 'center'}}><input type="radio" name="u1" /><span className="dot"></span></label></div>
<div style={{display: 'grid', gridTemplateColumns: '470px 120px 1fr', alignItems: 'center'}}><div style={{height: '70px', background: 'var(--color-neutral-100)', border: '1px solid var(--color-text)', display: 'flex', alignItems: 'center', paddingLeft: '18px', fontSize: '18px'}}><span style={{width: '210px'}}>O-ring kit</span><span style={{width: '140px', height: '48px', background: '#fff', display: 'flex', alignItems: 'center', paddingLeft: '14px'}}>1</span></div><label className="radio" style={{justifySelf: 'center'}}><input type="radio" name="u2" /><span className="dot"></span></label><label className="radio" style={{justifySelf: 'center'}}><input type="radio" name="u2" defaultChecked="checked" /><span className="dot"></span></label></div>
</div>
<label className="field"><label style={{fontSize: '26px', color: 'var(--color-text)', marginBottom: '12px'}}>What was done?</label><textarea className="input" style={{height: '128px', fontSize: '18px', background: '#fff'}} /></label>
<div style={{display: 'flex', alignItems: 'center', gap: '48px', marginTop: '-20px'}}><button className="btn btn-secondary" style={{width: '180px', height: '55px', fontSize: '20px', fontWeight: '600'}}>Send link</button><button className="btn btn-ghost" style={{width: '52px', height: '52px', padding: '0', color: 'var(--color-neutral-600)'}} title="Attach file"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15h6"></path></svg></button></div>
<div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}><button className="btn btn-primary blueprint" style={{width: '180px', height: '55px', fontSize: '20px', fontWeight: '600'}}>Submit<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
</div>
</div>
</div>
</div>

<div style={{width: '1440px', border: '1px solid var(--color-text)', background: 'var(--color-bg)'}}>
<div style={{padding: '14px 20px', background: 'var(--color-accent-900)', color: 'var(--color-bg)', font: '600 22px var(--font-heading)'}}>Label changes</div>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))'}}>
{(words || []).map((w, i) => (
<React.Fragment key={i}><div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '10px 20px', borderTop: '1px solid var(--color-divider)', fontSize: '15px'}}><span style={{color: 'var(--color-neutral-700)'}}>{w.old}</span><span style={{fontWeight: '600'}}>{w.now}</span></div></React.Fragment>
))}
</div>
</div>

</div>

    </div>
  );
}
