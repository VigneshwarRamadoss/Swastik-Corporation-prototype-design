import React, { useState } from 'react';

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

const JOURNEY_KEYS = ["ready", "rent", "returning", "service"];

export default function YardStatusMockups() {
  const [selectedSet, setSelectedSet] = useState("Plain");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selId, setSelId] = useState("56702");
  const [checkout, setCheckout] = useState(false);
  const [mobileSel, setMobileSel] = useState(null);
  const [toolBag, setToolBag] = useState(true);
  const [sparesList, setSparesList] = useState([
    { name: "Hydraulic hose", qty: 2, unit: "Nos", used: true },
    { name: "Tool bag", qty: 1, unit: "Nos", used: false },
    { name: "Grease cartridge", qty: 4, unit: "Nos", used: true }
  ]);

  const si = Math.max(0, SETS.indexOf(selectedSet));
  const tones = {
    ready: ["oklch(0.58 0.12 158)", "oklch(0.95 0.035 158)"],
    rent: ["var(--color-accent-800)", "var(--color-accent-100)"],
    breakdown: ["oklch(0.56 0.18 29)", "oklch(0.94 0.035 29)"],
    returning: ["var(--color-accent-500)", "var(--color-accent-100)"],
    service: ["var(--color-neutral-700)", "var(--color-neutral-200)"],
    yard: ["var(--color-neutral-400)", "var(--color-neutral-100)"]
  };

  const stMap = {};
  ST_DATA.forEach(s => {
    stMap[s.key] = { ...s, label: s.names[si], solid: tones[s.key][0], tint: tones[s.key][1] };
  });

  const sets = SETS.map((n, i) => ({
    name: n,
    fg: i === si ? "var(--color-accent-800)" : "var(--color-neutral-600)",
    bg: i === si ? "var(--color-accent-100)" : "transparent",
    dot: i === si ? "var(--color-accent)" : "transparent",
    pick: () => setSelectedSet(n)
  }));

  const nameRows = ST_DATA.map(s => ({
    old: s.old,
    desc: s.desc,
    solid: stMap[s.key].solid,
    tint: stMap[s.key].tint,
    cells: s.names.map((l, i) => ({
      label: l,
      bg: i === si ? "color-mix(in srgb, var(--color-accent) 6%, transparent)" : "transparent"
    }))
  }));

  const tiles = ST_DATA.map(s => {
    const on = filter === s.key;
    return {
      ...stMap[s.key],
      border: on ? "1.5px solid var(--color-accent)" : "1px solid var(--color-divider)",
      bg: on ? "var(--color-accent-100)" : "transparent",
      pick: () => setFilter(on ? "all" : s.key)
    };
  });

  const q = query.trim().toLowerCase();
  const rows = MACHINES_DATA.filter(m => (filter === "all" || m.status === filter) && (!q || [m.id, m.serial, m.name, m.customer].join(" ").toLowerCase().includes(q)))
    .map(m => ({
      ...m,
      st: stMap[m.status],
      where: m.customer || "In yard",
      bg: m.id === selId ? "color-mix(in srgb, var(--color-accent) 5%, transparent)" : "transparent",
      open: () => { setSelId(m.id); setMobileSel(null); }
    }));

  const selM = MACHINES_DATA.find(m => m.id === selId) || MACHINES_DATA[1];
  const sel = { ...selM, st: stMap[selM.status] };
  const curIdx = selM.status === "breakdown" ? 1 : JOURNEY_KEYS.indexOf(selM.status);
  const journey = JOURNEY_KEYS.map((k, i) => {
    const done = curIdx >= 0 && i < curIdx, cur = i === curIdx;
    const isBd = cur && selM.status === "breakdown";
    const col = isBd ? stMap.breakdown.solid : "var(--color-accent)";
    return {
      label: isBd ? stMap.breakdown.label : stMap[k].label,
      icon: done ? IC.tick : (isBd ? IC.alert : stMap[k].icon),
      ring: done || cur ? `2px solid ${col}` : "1.5px solid var(--color-neutral-400)",
      fill: done ? "var(--color-accent)" : cur ? (isBd ? stMap.breakdown.tint : "var(--color-accent-100)") : "transparent",
      iconColor: done ? "var(--color-bg)" : cur ? col : "var(--color-neutral-500)",
      line: i === JOURNEY_KEYS.length - 1 ? "transparent" : (done ? "var(--color-accent)" : "var(--color-neutral-300)"),
      weight: cur ? 700 : 500,
      textColor: done || cur ? "var(--color-text)" : "var(--color-neutral-600)",
      note: cur ? sel.since : done ? "Done" : ""
    };
  });

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

  const spares = sparesList.map((p, i) => ({
    ...p,
    inc: () => setSparesList(list => list.map((item, j) => j === i ? { ...item, qty: item.qty + 1 } : item)),
    dec: () => setSparesList(list => list.map((item, j) => j === i ? { ...item, qty: Math.max(0, item.qty - 1) } : item)),
    setUsed: () => setSparesList(list => list.map((item, j) => j === i ? { ...item, used: true } : item)),
    setBack: () => setSparesList(list => list.map((item, j) => j === i ? { ...item, used: false } : item)),
    usedBg: p.used ? "var(--color-accent)" : "transparent", usedFg: p.used ? "var(--color-bg)" : "var(--color-text)",
    backBg: !p.used ? "var(--color-accent)" : "transparent", backFg: !p.used ? "var(--color-bg)" : "var(--color-text)"
  }));

  const mSel = mobileSel ?? selM.status;
  const mobileTiles = ST_DATA.map(s => {
    const on = s.key === mSel;
    return {
      ...stMap[s.key],
      border: on ? "1.5px solid var(--color-accent)" : "1px solid var(--color-divider)",
      bg: on ? "var(--color-accent-100)" : "transparent",
      radio: on ? "7px solid var(--color-accent)" : "1.5px solid var(--color-neutral-500)",
      pick: () => setMobileSel(s.key)
    };
  });

  const seg = on => ({ bg: on ? "var(--color-accent)" : "transparent", fg: on ? "var(--color-bg)" : "var(--color-text)" });
  const tbYes = seg(toolBag);
  const tbNo = seg(!toolBag);
  const setTbYes = () => setToolBag(true);
  const setTbNo = () => setToolBag(false);
  const tbLabel = toolBag ? "Yes, tool bag goes with the van" : "No tool bag";

  const hasFilter = filter !== "all";
  const filterLabel = hasFilter ? stMap[filter]?.label : "";
  const clearFilter = () => { setFilter("all"); setQuery(""); };
  const noRows = rows.length === 0;

  const openCheckout = () => setCheckout(true);
  const closeCheckout = () => setCheckout(false);
  const onQuery = e => setQuery(e.target.value);
  const mobileLabel = stMap[mSel]?.label || "";
return (
    <div className="showcase-wrapper" style={{ overflowX: 'auto', padding: '24px' }}>
      

<section className="dv-turn" id="t2" style={{borderBottom: '1px solid rgba(0,0,0,.1)'}}>
<div className="dv-thd"><a className="dv-tid" href="#t2">2</a><span className="dv-tname">Every Figma screen, same layout, new labels and colors: the on-site service flow</span></div>
<p style={{margin: '0 0 28px', maxWidth: '860px', fontSize: '13px', lineHeight: '1.5', color: 'var(--color-neutral-700)', textWrap: 'pretty'}}>The Figma file has 6 unique screens. The other ~40 layers are copies, groups and icons inside them. Figma "Machine status" (Frame 1) is <a className="dv-oid" href="#1b">1b</a>. The other five are below, in flow order. A machine that breaks down on site doesn't come back to the yard, so a technician drives out to it. Each visit now records the machine model, where the machine is right now, the tools and spares going with the technician, and the service van and where it is now.</p>
<div className="dv-opts">

<div className="dv-opt" id="2a">
<div className="dv-olabel"><a className="dv-oid" href="#2a">2a</a>Machine page · service visits (Figma "Frame 2")</div>
<div className="dv-card" style={{width: '1280px'}}>
<div style={{height: '60px', display: 'flex', alignItems: 'center', gap: '28px', padding: '0 32px', borderBottom: '1px solid var(--color-divider)'}}>
<div style={{width: '92px', height: '28px', border: '1px dashed var(--color-neutral-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', letterSpacing: '.08em', color: 'var(--color-neutral-600)'}}>LOGO</div>
<nav style={{display: 'flex', gap: '4px', flex: '1'}}><a href="#1b" style={{padding: '8px 14px', fontWeight: '600', fontSize: '14px', color: 'var(--color-text)', textDecoration: 'none', boxShadow: 'inset 0 -2px 0 var(--color-accent)'}}>Fleet</a><a href="#2a" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Store</a><a href="#2a" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Approvals</a><a href="#2a" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Service</a><a href="#2a" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Masters</a><a href="#2a" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Reports</a><a href="#2a" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Settings</a></nav>
<div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-accent-200)', color: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '13px'}}>RK</div>
</div>
<div style={{height: '46px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 32px', fontSize: '14px', color: 'var(--color-neutral-700)', background: 'var(--color-neutral-100)', borderBottom: '1px solid var(--color-divider)'}}><a href="#1b" style={{textDecoration: 'none'}}>Home</a><span>›</span><a href="#1b" style={{textDecoration: 'none'}}>Fleet</a><span>›</span><span style={{color: 'var(--color-text)', fontWeight: '500'}}>Asset 56702</span></div>
<div style={{padding: '30px 32px 36px'}}>
<div style={{display: 'grid', gridTemplateColumns: '300px minmax(0,1fr)', gap: '28px', marginBottom: '32px'}}>
<button className="btn btn-primary blueprint" style={{height: 'auto', minHeight: '170px', flexDirection: 'column', gap: '14px', fontSize: '20px', fontWeight: '600', padding: '20px'}}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>Report a problem<span style={{fontSize: '13px', fontWeight: '400', opacity: '.85'}}>Send a technician to the machine</span><i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button>
<div className="blueprint" style={{padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '18px 24px', alignContent: 'start'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<div style={{gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap'}}><h1 style={{margin: '0', fontSize: '34px', lineHeight: '1'}}>CAT 320D2</h1><span style={{display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 12px 5px 9px', background: 'oklch(0.94 0.035 29)', fontSize: '14px', fontWeight: '600'}}><span style={{width: '9px', height: '9px', background: 'oklch(0.56 0.18 29)'}}></span>Broken down on site</span></div>
<div><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Model</div><div style={{fontSize: '15px', fontWeight: '600', marginTop: '3px'}}>CAT 320D2 · Excavator</div></div>
<div><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Serial number</div><div style={{fontSize: '15px', fontWeight: '500', marginTop: '3px', fontFamily: 'ui-monospace,Menlo,monospace'}}>CAT0320DKZBF01452</div></div>
<div><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Machine is now at</div><div style={{fontSize: '15px', fontWeight: '500', marginTop: '3px'}}>Larsen Infra Works, Sriperumbudur</div></div>
<div><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Site contact</div><div style={{fontSize: '15px', fontWeight: '500', marginTop: '3px'}}>Murugan · 98401 22871</div></div>
</div>
</div>
<div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px'}}><h2 style={{margin: '0', fontSize: '30px'}}>Service visits</h2><span style={{fontSize: '14px', color: 'var(--color-neutral-700)'}}>2 visits</span></div>
<div style={{display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '18px'}}>
<label className="field" style={{width: '300px'}}><label>Technician</label><select className="input" style={{height: '48px', fontSize: '15px'}}><option>All technicians</option><option>Rajini</option><option>Kamal</option></select></label>
<label className="field" style={{width: '220px'}}><label>Date</label><input className="input" placeholder="DD/MM/YYYY" style={{height: '48px', fontSize: '15px'}} /></label>
<button className="btn btn-primary blueprint" style={{height: '48px', padding: '0 24px', fontSize: '15px', fontWeight: '600'}}>Search<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button>
<button className="btn btn-ghost" style={{height: '48px', padding: '0 16px', fontSize: '15px'}}>Clear</button>
</div>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1.3fr) minmax(0,1.6fr) minmax(0,1fr) 220px', gap: '16px', padding: '10px 16px', font: '600 12px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', borderBottom: '1px solid var(--color-divider)'}}><span>Visit no.</span><span>Date</span><span>Technician</span><span>Problem</span><span>Status</span><span></span></div>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1.3fr) minmax(0,1.6fr) minmax(0,1fr) 220px', gap: '16px', alignItems: 'center', minHeight: '68px', padding: '8px 16px', borderBottom: '1px solid var(--color-divider)'}}>
<span style={{fontWeight: '600'}}>SR-1042</span><span style={{fontSize: '14px'}}>29 Sep 2026</span>
<span style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px'}}><span style={{width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-accent-100)', color: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '12px'}}>RJ</span>Rajini</span>
<span style={{fontSize: '14px'}}>Hydraulic leak at boom</span>
<span><span style={{padding: '5px 11px', fontSize: '13px', fontWeight: '600', background: 'var(--color-accent-100)', color: 'var(--color-accent-800)'}}>On the way</span></span>
<span style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}><button className="btn btn-secondary" style={{height: '44px', padding: '0 16px', fontSize: '14px'}}>Edit</button><a href="#2d" className="btn btn-secondary" style={{height: '44px', padding: '0 16px', fontSize: '14px', color: 'var(--color-text)'}}>Open</a></span>
</div>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1.3fr) minmax(0,1.6fr) minmax(0,1fr) 220px', gap: '16px', alignItems: 'center', minHeight: '68px', padding: '8px 16px', borderBottom: '1px solid var(--color-divider)'}}>
<span style={{fontWeight: '600'}}>SR-1017</span><span style={{fontSize: '14px'}}>02 Sep 2026</span>
<span style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px'}}><span style={{width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-accent-100)', color: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '12px'}}>KM</span>Kamal</span>
<span style={{fontSize: '14px'}}>250-hour service</span>
<span><span style={{padding: '5px 11px', fontSize: '13px', fontWeight: '600', background: 'var(--color-neutral-200)', color: 'var(--color-neutral-800)'}}>Fixed</span></span>
<span style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}><button className="btn btn-secondary" style={{height: '44px', padding: '0 16px', fontSize: '14px'}}>Edit</button><a href="#2d" className="btn btn-secondary" style={{height: '44px', padding: '0 16px', fontSize: '14px', color: 'var(--color-text)'}}>Open</a></span>
</div>
</div>
</div>
</div>

<div className="dv-opt" id="2b">
<div className="dv-olabel"><a className="dv-oid" href="#2b">2b</a>Report a problem · step 1 of 2 (Figma "view details" 23:455)</div>
<div className="dv-card" style={{width: '1280px', background: 'color-mix(in srgb,var(--color-neutral-900) 40%,var(--color-bg))', padding: '48px 0'}}>
<div className="blueprint" style={{width: '960px', margin: '0 auto', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', overflow: 'visible'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '28px 36px 0'}}>
<div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>Step 1 of 2 · The problem</div><h2 style={{margin: '4px 0 0', fontSize: '34px'}}>Report a problem</h2></div>
<button className="btn btn-secondary" style={{width: '44px', height: '44px', padding: '0'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button>
</div>
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', margin: '18px 36px 0'}}><span style={{height: '4px', background: 'var(--color-accent)'}}></span><span style={{height: '4px', background: 'var(--color-neutral-300)'}}></span></div>
<div style={{padding: '26px 36px 8px', display: 'flex', flexDirection: 'column', gap: '22px'}}>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '20px'}}>
<div style={{border: '1px solid var(--color-divider)', padding: '16px 18px', display: 'flex', gap: '14px', alignItems: 'center'}}>
<div style={{width: '52px', height: '52px', flex: 'none', background: 'var(--color-accent-100)', color: 'var(--color-accent-800)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14M5 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0M15 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0"></path></svg></div>
<div><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Machine and model</div><div style={{fontSize: '17px', fontWeight: '600', marginTop: '2px'}}>CAT 320D2 · Excavator</div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)', marginTop: '2px'}}>Asset 56702 · CAT0320DKZBF01452 · 2019</div></div>
</div>
<div style={{border: '1px solid var(--color-divider)', display: 'grid', gridTemplateColumns: '120px minmax(0,1fr)'}}>
<div style={{background: 'repeating-linear-gradient(45deg,var(--color-neutral-200) 0 6px,var(--color-neutral-100) 6px 12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '11px ui-monospace,Menlo,monospace', color: 'var(--color-neutral-700)', textAlign: 'center'}}>map</div>
<div style={{padding: '14px 16px'}}><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Machine is now at</div><div style={{fontSize: '15px', fontWeight: '600', marginTop: '2px'}}>Larsen Infra Works, Gate 3</div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)', marginTop: '2px'}}>SIPCOT, Sriperumbudur · 38 km from yard</div><a href="#2b" style={{display: 'inline-block', marginTop: '6px', fontSize: '13px', fontWeight: '600', textDecoration: 'none'}}>Change location</a></div>
</div>
</div>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '16px'}}>
<label className="field"><label>Date</label><input className="input" defaultValue="29/09/2026" style={{height: '48px', fontSize: '15px'}} /></label>
<label className="field"><label>Time</label><input className="input" defaultValue="11:20 AM" style={{height: '48px', fontSize: '15px'}} /></label>
<label className="field"><label>Site contact</label><input className="input" defaultValue="Murugan · 98401 22871" style={{height: '48px', fontSize: '15px'}} /></label>
</div>
<label className="field"><label>Technician going</label><select className="input" style={{height: '48px', fontSize: '15px'}}><option>Rajini</option><option>Kamal</option></select></label>
<label className="field"><label>What's wrong?</label><textarea className="input" style={{minHeight: '130px', fontSize: '15px'}} defaultValue="Hydraulic oil leaking near the boom cylinder. Operator stopped work at 10:45." /></label>
</div>
<div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '20px 36px 30px'}}>
<button className="btn btn-ghost" style={{height: '48px', padding: '0 18px', fontSize: '15px'}}>Cancel</button>
<a href="#2c" className="btn btn-primary blueprint" style={{height: '48px', padding: '0 28px', fontSize: '15px', fontWeight: '600'}}>Next: tools and van<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></a>
</div>
</div>
</div>
</div>

<div className="dv-opt" id="2c">
<div className="dv-olabel"><a className="dv-oid" href="#2c">2c</a>Report a problem · step 2 of 2 (Figma "new complinet")</div>
<div className="dv-card" style={{width: '1280px', background: 'color-mix(in srgb,var(--color-neutral-900) 40%,var(--color-bg))', padding: '48px 0'}}>
<div className="blueprint" style={{width: '960px', margin: '0 auto', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', overflow: 'visible'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '28px 36px 0'}}>
<div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>Step 2 of 2 · What goes in the van</div><h2 style={{margin: '4px 0 0', fontSize: '34px'}}>Tools and spares for the trip</h2></div>
<button className="btn btn-secondary" style={{width: '44px', height: '44px', padding: '0'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button>
</div>
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', margin: '18px 36px 0'}}><span style={{height: '4px', background: 'var(--color-accent)'}}></span><span style={{height: '4px', background: 'var(--color-accent)'}}></span></div>
<div style={{padding: '26px 36px 8px', display: 'flex', flexDirection: 'column', gap: '22px'}}>
<div className="blueprint" style={{padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '18px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><span style={{width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent-100)', color: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '13px'}}>RJ</span><div style={{flex: '1'}}><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Technician</div><div style={{fontSize: '16px', fontWeight: '600'}}>Rajini</div></div><button className="btn btn-ghost" style={{height: '40px', padding: '0 10px', fontSize: '14px'}}>Change</button></div>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 150px auto', gap: '12px', alignItems: 'end'}}>
<label className="field"><label>Spare or tool</label><select className="input" style={{height: '48px', fontSize: '15px'}}><option>Choose from store</option><option>Hydraulic hose</option><option>O-ring kit</option></select></label>
<label className="field"><label>Quantity</label><input className="input" defaultValue="1" style={{height: '48px', fontSize: '15px'}} /></label>
<button className="btn btn-secondary" style={{height: '48px', padding: '0 22px', fontSize: '15px', fontWeight: '600'}}>+ Add</button>
</div>
<div>
<div style={{display: 'grid', gridTemplateColumns: '60px minmax(0,1fr) 120px 48px', gap: '12px', padding: '8px 0', font: '600 12px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', borderBottom: '1px solid var(--color-divider)'}}><span>No.</span><span>Spare or tool</span><span>Quantity</span><span></span></div>
{(spares || []).map((p, i) => (
<React.Fragment key={i}>
<div style={{display: 'grid', gridTemplateColumns: '60px minmax(0,1fr) 120px 48px', gap: '12px', alignItems: 'center', minHeight: '52px', borderBottom: '1px solid var(--color-divider)'}}><span style={{fontSize: '14px', color: 'var(--color-neutral-700)'}}>{i + 1}</span><span style={{fontSize: '15px'}}>{p.name}</span><span style={{fontSize: '15px', fontWeight: '600'}}>{p.qty} {p.unit}</span><button onClick={p.dec} className="btn btn-ghost" style={{width: '44px', height: '44px', padding: '0', color: 'var(--color-neutral-700)'}} title="Remove one"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"></path></svg></button></div>
</React.Fragment>
))}
</div>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '20px'}}>
<div><div style={{fontSize: '12px', color: 'var(--color-neutral-700)', marginBottom: '5px'}}>Taking the tool bag?</div>
<div style={{display: 'inline-flex', border: '1px solid var(--color-divider)'}}><button onClick={setTbYes} style={{all: 'unset', cursor: 'pointer', height: '46px', padding: '0 26px', fontSize: '15px', fontWeight: '500', background: tbYes.bg, color: tbYes.fg}}>Yes</button><button onClick={setTbNo} style={{all: 'unset', cursor: 'pointer', height: '46px', padding: '0 26px', fontSize: '15px', fontWeight: '500', borderLeft: '1px solid var(--color-divider)', background: tbNo.bg, color: tbNo.fg}}>No</button></div></div>
<label className="field"><label>Service van number</label><input className="input" defaultValue="TN 09 BK 4471" style={{height: '48px', fontSize: '15px'}} /></label>
</div>
<div style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--color-accent-100)'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-800)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0zM12 7a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"></path></svg><span style={{flex: '1', fontSize: '14px', color: 'var(--color-accent-900)'}}>Van TN 09 BK 4471 is at the yard, Bay 1 · last seen 2 min ago</span><a href="#2c" style={{fontSize: '14px', fontWeight: '600', textDecoration: 'none'}}>Track</a></div>
</div>
<button className="btn btn-secondary" style={{height: '52px', fontSize: '15px', fontWeight: '600', width: '100%'}}>+ Add another technician</button>
</div>
<div style={{display: 'flex', justifyContent: 'space-between', gap: '10px', padding: '20px 36px 30px'}}>
<a href="#2b" className="btn btn-secondary" style={{height: '48px', padding: '0 22px', fontSize: '15px', color: 'var(--color-text)'}}>Back</a>
<a href="#2a" className="btn btn-primary blueprint" style={{height: '48px', padding: '0 28px', fontSize: '15px', fontWeight: '600'}}>Send technician<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></a>
</div>
</div>
</div>
</div>

<div className="dv-opt" id="2d">
<div className="dv-olabel"><a className="dv-oid" href="#2d">2d</a>Visit details, read-only (Figma "view details" 23:606)</div>
<div className="dv-card" style={{width: '1280px', background: 'color-mix(in srgb,var(--color-neutral-900) 40%,var(--color-bg))', padding: '48px 0'}}>
<div className="blueprint" style={{width: '960px', margin: '0 auto', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', overflow: 'visible'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '28px 36px 0'}}>
<div><div style={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>SR-1042 · CAT 320D2</span><span style={{padding: '3px 9px', fontSize: '12px', fontWeight: '600', background: 'var(--color-accent-100)', color: 'var(--color-accent-800)'}}>On the way</span></div><h2 style={{margin: '4px 0 0', fontSize: '34px'}}>Service visit</h2></div>
<div style={{display: 'flex', gap: '8px'}}><button className="btn btn-secondary" style={{width: '44px', height: '44px', padding: '0'}} title="Print"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z"></path></svg></button><button className="btn btn-secondary" style={{width: '44px', height: '44px', padding: '0'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button></div>
</div>
<div style={{padding: '24px 36px 8px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '24px'}}>
<div className="blueprint" style={{padding: '18px 20px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<h3 style={{margin: '0 0 6px', fontSize: '20px'}}>The trip</h3>
<div style={{padding: '10px 0', borderTop: '1px solid var(--color-divider)'}}><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Model</div><div style={{fontSize: '15px', fontWeight: '600', marginTop: '2px'}}>CAT 320D2 · Excavator</div></div>
<div style={{padding: '10px 0', borderTop: '1px solid var(--color-divider)'}}><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Machine is at</div><div style={{fontSize: '15px', fontWeight: '500', marginTop: '2px'}}>Larsen Infra Works, Gate 3, Sriperumbudur</div></div>
<div style={{padding: '10px 0', borderTop: '1px solid var(--color-divider)'}}><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Technician</div><div style={{fontSize: '15px', fontWeight: '500', marginTop: '2px'}}>Rajini · left yard 11:40 AM</div></div>
<div style={{padding: '10px 0', borderTop: '1px solid var(--color-divider)'}}><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Service van</div><div style={{fontSize: '15px', fontWeight: '500', marginTop: '2px'}}>TN 09 BK 4471 · near Poonamallee, 14 km away</div></div>
<div style={{padding: '10px 0', borderTop: '1px solid var(--color-divider)'}}><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>Problem</div><div style={{fontSize: '15px', marginTop: '2px'}}>Hydraulic oil leaking near the boom cylinder.</div></div>
</div>
<div className="blueprint" style={{padding: '18px 20px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<h3 style={{margin: '0 0 6px', fontSize: '20px'}}>In the van</h3>
{(spares || []).map((p, i) => (
<React.Fragment key={i}>
<div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid var(--color-divider)', fontSize: '15px'}}><span>{p.name}</span><span style={{fontWeight: '600'}}>{p.qty} {p.unit}</span></div>
</React.Fragment>
))}
<div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid var(--color-divider)', fontSize: '15px'}}><span>Tool bag</span><span style={{fontWeight: '600'}}>{tbLabel}</span></div>
</div>
</div>
<div style={{display: 'flex', justifyContent: 'space-between', gap: '10px', padding: '20px 36px 30px'}}>
<a href="#2a" className="btn btn-secondary" style={{height: '48px', padding: '0 22px', fontSize: '15px', color: 'var(--color-text)'}}>Back</a>
<a href="#2e" className="btn btn-primary blueprint" style={{height: '48px', padding: '0 28px', fontSize: '15px', fontWeight: '600'}}>Finish visit<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></a>
</div>
</div>
</div>
</div>

<div className="dv-opt" id="2e">
<div className="dv-olabel"><a className="dv-oid" href="#2e">2e</a>Finish visit (Figma "after check out")</div>
<div className="dv-card" style={{width: '1280px', background: 'color-mix(in srgb,var(--color-neutral-900) 40%,var(--color-bg))', padding: '48px 0'}}>
<div className="blueprint" style={{width: '760px', margin: '0 auto', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', overflow: 'visible'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '28px 36px 0'}}>
<div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>SR-1042 · CAT 320D2 · Rajini</div><h2 style={{margin: '4px 0 0', fontSize: '34px'}}>Finish visit</h2></div>
<button className="btn btn-secondary" style={{width: '44px', height: '44px', padding: '0'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button>
</div>
<div style={{padding: '24px 36px 8px', display: 'flex', flexDirection: 'column', gap: '22px'}}>
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
<label className="field"><label>Finished on</label><input className="input" defaultValue="29/09/2026" style={{height: '48px', fontSize: '15px'}} /></label>
<label className="field"><label>Finished at</label><input className="input" defaultValue="4:30 PM" style={{height: '48px', fontSize: '15px'}} /></label>
</div>
<div>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 90px 230px', gap: '12px', padding: '8px 0', font: '600 12px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', borderBottom: '1px solid var(--color-divider)'}}><span>Spare</span><span>Quantity</span><span>What happened to it</span></div>
{(spares || []).map((p, i) => (
<React.Fragment key={i}>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 90px 230px', gap: '12px', alignItems: 'center', minHeight: '60px', borderBottom: '1px solid var(--color-divider)'}}>
<span style={{fontSize: '15px'}}>{p.name}</span><span style={{fontSize: '15px', fontWeight: '600'}}>{p.qty} {p.unit}</span>
<div style={{display: 'flex', border: '1px solid var(--color-divider)'}}><button onClick={p.setUsed} style={{all: 'unset', cursor: 'pointer', flex: '1', textAlign: 'center', height: '44px', fontSize: '14px', fontWeight: '500', background: p.usedBg, color: p.usedFg}}>Used</button><button onClick={p.setBack} style={{all: 'unset', cursor: 'pointer', flex: '1', textAlign: 'center', height: '44px', fontSize: '14px', fontWeight: '500', borderLeft: '1px solid var(--color-divider)', background: p.backBg, color: p.backFg}}>Brought back</button></div>
</div>
</React.Fragment>
))}
</div>
<label className="field"><label>Work done</label><textarea className="input" placeholder="What was fixed, and anything the customer should know" style={{minHeight: '120px', fontSize: '15px'}} /></label>
<div style={{display: 'flex', gap: '10px'}}>
<button className="btn btn-secondary" style={{height: '48px', padding: '0 16px', fontSize: '15px', gap: '8px'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3zM12 10a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"></path></svg>Add photo</button>
<button className="btn btn-secondary" style={{height: '48px', padding: '0 16px', fontSize: '15px', gap: '8px'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>Send report to customer</button>
</div>
</div>
<div style={{padding: '20px 36px 30px'}}><button className="btn btn-primary blueprint" style={{width: '100%', height: '52px', fontSize: '16px', fontWeight: '600'}}>Submit and mark fixed<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button></div>
</div>
</div>
</div>

</div>
<p className="dv-next">Try next: "show <a className="dv-oid" href="#2c">2c</a> on the technician's phone" · "add a live map of the van to <a className="dv-oid" href="#2d">2d</a>" · "use the Journey names from <a className="dv-oid" href="#1a">1a</a>"</p>
</section>
<section className="dv-turn" id="t1">
<div className="dv-thd"><a className="dv-tid" href="#t1">1</a><span className="dv-tname">Status wording + consumer-style controls, on Industry</span></div>
<p style={{margin: '0 0 28px', maxWidth: '760px', fontSize: '13px', lineHeight: '1.5', color: 'var(--color-neutral-700)', textWrap: 'pretty'}}>Assumptions: "Yard (TBS)" means back in the yard and waiting for service; "Yard" means parked and not offered for rent; "On Hire" means paid and with the customer. Pick a naming set in <a className="dv-oid" href="#1a">1a</a> and every screen updates. Buttons are 48px tall and whole rows are tappable, the way people already use delivery and banking apps. Red and green appear only on the two statuses that need a reaction (Tweaks can switch them to steel).</p>
<div className="dv-opts">

<div className="dv-opt" id="1a">
<div className="dv-olabel"><a className="dv-oid" href="#1a">1a</a>Status names: old tag → three new sets (click a column to apply)</div>
<div className="dv-card" style={{width: '900px', padding: '32px 36px 36px'}}>
<h2 style={{margin: '0 0 4px', fontSize: '30px', lineHeight: '1.1'}}>Machine status names</h2>
<p style={{margin: '0 0 24px', fontSize: '14px', color: 'var(--color-neutral-700)'}}>Same six flags, written for the person reading the screen.</p>
<div style={{display: 'grid', gridTemplateColumns: '150px repeat(3,minmax(0,1fr)) 220px', borderTop: '1px solid var(--color-divider)'}}>
<div style={{padding: '12px 10px', font: '600 12px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-neutral-600)'}}>Old tag</div>
{(sets || []).map((set, i) => (
<React.Fragment key={i}>
<button onClick={set.pick} style={{all: 'unset', cursor: 'pointer', padding: '12px 10px', display: 'flex', alignItems: 'center', gap: '8px', font: '600 12px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: set.fg, background: set.bg}} ><span style={{width: '10px', height: '10px', border: '1.5px solid currentColor', borderRadius: '50%', background: set.dot}}></span>{set.name}</button>
</React.Fragment>
))}
<div style={{padding: '12px 10px', font: '600 12px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-neutral-600)'}}>What it means</div>
</div>
{(nameRows || []).map((r, i) => (
<React.Fragment key={i}>
<div style={{display: 'grid', gridTemplateColumns: '150px repeat(3,minmax(0,1fr)) 220px', borderTop: '1px solid var(--color-divider)', alignItems: 'center'}}>
<div style={{padding: '14px 10px', fontSize: '13px', color: 'var(--color-neutral-600)', textDecoration: 'line-through', textDecorationColor: 'var(--color-neutral-400)'}}>{r.old}</div>
{(r.cells || []).map((c, i) => (
<React.Fragment key={i}>
<div style={{padding: '10px', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', background: c.bg}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 11px 5px 9px', background: r.tint, fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap'}}><span style={{width: '9px', height: '9px', background: r.solid}}></span>{c.label}</span></div>
</React.Fragment>
))}
<div style={{padding: '14px 10px', fontSize: '13px', lineHeight: '1.4', color: 'var(--color-neutral-800)'}}>{r.desc}</div>
</div>
</React.Fragment>
))}
</div>
</div>

<div className="dv-opt" id="1d">
<div className="dv-olabel"><a className="dv-oid" href="#1d">1d</a>Yard phone: update a machine's status in one tap</div>
<div style={{width: '390px', height: '820px', boxSizing: 'border-box', padding: '10px', background: 'var(--color-neutral-900)', borderRadius: '44px', boxShadow: 'var(--shadow-lg)'}}>
<div style={{width: '100%', height: '100%', background: 'var(--color-bg)', borderRadius: '35px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative'}}>
<div style={{height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', fontSize: '14px', fontWeight: '600'}}><span>9:41</span><span style={{width: '96px', height: '26px', background: 'var(--color-neutral-900)', borderRadius: '14px'}}></span><span style={{fontSize: '12px'}}>5G</span></div>
<div style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px 12px'}}>
<button className="btn btn-ghost" style={{width: '44px', height: '44px', padding: '0', color: 'var(--color-text)'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg></button>
<div style={{font: '600 22px var(--font-heading)'}}>Update status</div>
</div>
<div style={{margin: '0 18px 18px', padding: '14px 16px', border: '1px solid var(--color-divider)', display: 'flex', gap: '14px', alignItems: 'center'}}>
<div style={{width: '52px', height: '52px', flex: 'none', background: 'var(--color-accent-100)', color: 'var(--color-accent-800)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={icons.truck}></path></svg></div>
<div style={{minWidth: '0'}}><div style={{fontWeight: '600', fontSize: '16px'}}>{sel.name}</div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)', marginTop: '2px'}}>Asset {sel.id} · {sel.sub}</div></div>
</div>
<div style={{padding: '0 18px 10px', font: '600 20px var(--font-heading)'}}>Where is it now?</div>
<div style={{flex: '1', overflow: 'auto', padding: '0 18px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
{(mobileTiles || []).map((t, i) => (
<React.Fragment key={i}>
<button onClick={t.pick} style={{all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', minHeight: '60px', padding: '10px 14px', boxSizing: 'border-box', border: t.border, background: t.bg}}>
<span style={{width: '36px', height: '36px', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.tint, color: 'var(--color-text)'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={t.icon}></path></svg></span>
<span style={{flex: '1', minWidth: '0'}}><span style={{display: 'block', fontWeight: '600', fontSize: '15px'}}>{t.label}</span><span style={{display: 'block', fontSize: '12.5px', lineHeight: '1.35', color: 'var(--color-neutral-700)', marginTop: '2px'}}>{t.desc}</span></span>
<span style={{width: '22px', height: '22px', flex: 'none', borderRadius: '50%', boxSizing: 'border-box', border: t.radio, background: 'var(--color-bg)'}}></span>
</button>
</React.Fragment>
))}
</div>
<div style={{padding: '14px 18px 26px', borderTop: '1px solid var(--color-divider)', background: 'var(--color-bg)'}}>
<button className="btn btn-primary blueprint" style={{width: '100%', height: '52px', fontSize: '16px', fontWeight: '600'}}>Save · {mobileLabel}<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button>
</div>
</div>
</div>
</div>

<div className="dv-opt" id="1b">
<div className="dv-olabel"><a className="dv-oid" href="#1b">1b</a>Fleet overview: status tiles double as filters, rows open the machine</div>
<div className="dv-card" style={{width: '1280px'}}>
<div style={{height: '60px', display: 'flex', alignItems: 'center', gap: '28px', padding: '0 32px', borderBottom: '1px solid var(--color-divider)'}}>
<div style={{width: '92px', height: '28px', border: '1px dashed var(--color-neutral-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', letterSpacing: '.08em', color: 'var(--color-neutral-600)'}}>LOGO</div>
<nav style={{display: 'flex', gap: '4px', flex: '1'}}>
<a href="#1b" style={{padding: '8px 14px', fontWeight: '600', fontSize: '14px', color: 'var(--color-text)', textDecoration: 'none', boxShadow: 'inset 0 -2px 0 var(--color-accent)'}}>Fleet</a>
<a href="#1b" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Store</a>
<a href="#1b" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Approvals</a>
<a href="#1b" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Service</a>
<a href="#1b" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Reports</a>
<a href="#1b" style={{padding: '8px 14px', fontSize: '14px', color: 'var(--color-neutral-700)', textDecoration: 'none'}}>Settings</a>
</nav>
<div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-accent-200)', color: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '13px'}}>RK</div>
</div>
<div style={{padding: '32px 32px 36px'}}>
<div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', marginBottom: '24px'}}>
<div><h1 style={{margin: '0', fontSize: '40px', lineHeight: '1'}}>Fleet</h1><div style={{marginTop: '6px', fontSize: '15px', color: 'var(--color-neutral-700)'}}>469 machines · updated 2 min ago</div></div>
<div style={{display: 'flex', gap: '10px'}}>
<button className="btn btn-secondary" style={{height: '48px', padding: '0 20px', fontSize: '15px'}}>Export</button>
<button className="btn btn-primary blueprint" style={{height: '48px', padding: '0 22px', fontSize: '15px', fontWeight: '600'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14M12 5v14"></path></svg>Check in a machine<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button>
</div>
</div>
<div style={{display: 'flex', height: '10px', gap: '2px', marginBottom: '16px'}}>
{(tiles || []).map((s, i) => (
<React.Fragment key={i}><div style={{height: '100%', flex: `${s.count} 0 0` , background: s.solid}}></div></React.Fragment>
))}
</div>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: '12px', marginBottom: '28px'}}>
{(tiles || []).map((s, i) => (
<React.Fragment key={i}>
<button onClick={s.pick} className="blueprint" style={{all: 'unset', position: 'relative', cursor: 'pointer', padding: '16px 16px 14px', border: s.border, background: s.bg, display: 'flex', flexDirection: 'column', gap: '10px'}} >
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}><span style={{width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.tint}}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}></path></svg></span><span style={{width: '10px', height: '10px', background: s.solid}}></span></span>
<span style={{font: '600 36px/1 var(--font-heading)'}}>{s.count}</span>
<span style={{fontSize: '14px', fontWeight: '500', lineHeight: '1.25'}}>{s.label}</span>
</button>
</React.Fragment>
))}
</div>
<div style={{display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px'}}>
<div style={{flex: '1', height: '48px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', border: '1px solid var(--color-divider)', background: 'var(--color-bg)'}}>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="1.5" strokeLinecap="round"><path d={icons.search}></path></svg>
<input defaultValue={query} onChange={onQuery} placeholder="Search asset code, serial number or customer" style={{all: 'unset', flex: '1', fontSize: '15px'}} />
</div>
{Boolean(hasFilter) && (
<React.Fragment>
<button onClick={clearFilter} className="btn btn-secondary" style={{height: '48px', padding: '0 16px', fontSize: '14px', gap: '8px'}}>{filterLabel}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button>
</React.Fragment>
)}
</div>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,2.2fr) minmax(0,1fr) minmax(0,1.6fr) minmax(0,1.8fr) minmax(0,1.4fr) 28px', gap: '16px', padding: '10px 16px', font: '600 12px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', borderBottom: '1px solid var(--color-divider)'}}>
<span>Machine</span><span>Asset code</span><span>Serial number</span><span>Where</span><span>Status</span><span></span>
</div>
{(rows || []).map((m, i) => (
<React.Fragment key={i}>
<button onClick={m.open} style={{all: 'unset', cursor: 'pointer', display: 'grid', gridTemplateColumns: 'minmax(0,2.2fr) minmax(0,1fr) minmax(0,1.6fr) minmax(0,1.8fr) minmax(0,1.4fr) 28px', gap: '16px', alignItems: 'center', minHeight: '64px', padding: '8px 16px', boxSizing: 'border-box', width: '100%', borderBottom: '1px solid var(--color-divider)', background: m.bg}} >
<span style={{minWidth: '0'}}><span style={{display: 'block', fontWeight: '600', fontSize: '15px'}}>{m.name}</span><span style={{display: 'block', fontSize: '13px', color: 'var(--color-neutral-700)', marginTop: '2px'}}>{m.cat} · {m.sub} · {m.year}</span></span>
<span style={{fontSize: '14px', fontVariantNumeric: 'tabular-nums'}}>{m.id}</span>
<span style={{fontSize: '13px', fontFamily: 'ui-monospace,Menlo,monospace', color: 'var(--color-neutral-800)', overflow: 'hidden', textOverflow: 'ellipsis'}}>{m.serial}</span>
<span style={{fontSize: '14px', minWidth: '0'}}><span style={{display: 'block'}}>{m.where}</span><span style={{display: 'block', fontSize: '12.5px', color: 'var(--color-neutral-700)'}}>{m.site}</span></span>
<span><span style={{display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '5px 11px 5px 9px', background: m.st.tint, fontSize: '13.5px', fontWeight: '500', whiteSpace: 'nowrap'}}><span style={{width: '8px', height: '8px', background: m.st.solid}}></span>{m.st.label}</span></span>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
</button>
</React.Fragment>
))}
{Boolean(noRows) && (
<React.Fragment><div style={{padding: '40px 16px', textAlign: 'center', color: 'var(--color-neutral-700)', fontSize: '15px'}}>No machines match. Try another status or clear the search.</div></React.Fragment>
)}
</div>
</div>
</div>

<div className="dv-opt" id="1c">
<div className="dv-olabel"><a className="dv-oid" href="#1c">1c</a>Machine page: a delivery-style tracker replaces the status text; "Check out" opens a sheet</div>
<div className="dv-card" style={{width: '1280px', minHeight: '900px'}}>
<div style={{padding: '28px 32px 36px'}}>
<div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-neutral-700)', marginBottom: '18px'}}><a href="#1b" style={{textDecoration: 'none'}}>Fleet</a><span>/</span><span>{sel.id}</span></div>
<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', marginBottom: '28px'}}>
<div>
<div style={{display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap'}}><h1 style={{margin: '0', fontSize: '40px', lineHeight: '1'}}>{sel.name}</h1><span style={{display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 13px 6px 10px', background: sel.st.tint, fontSize: '15px', fontWeight: '600'}}><span style={{width: '10px', height: '10px', background: sel.st.solid}}></span>{sel.st.label}</span></div>
<div style={{marginTop: '8px', fontSize: '15px', color: 'var(--color-neutral-700)'}}>Asset {sel.id} · {sel.serial} · {sel.since}</div>
</div>
<div style={{display: 'flex', gap: '10px', flex: 'none'}}>
<button className="btn btn-secondary" style={{width: '48px', height: '48px', padding: '0'}} title="Print"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z"></path></svg></button>
<button className="btn btn-secondary" style={{height: '48px', padding: '0 20px', fontSize: '15px'}}>Change status</button>
<button onClick={openCheckout} className="btn btn-primary blueprint" style={{height: '48px', padding: '0 24px', fontSize: '15px', fontWeight: '600'}}>Check out<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button>
</div>
</div>
<div className="blueprint" style={{padding: '26px 32px 22px', marginBottom: '28px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))'}}>
{(journey || []).map((j, i) => (
<React.Fragment key={i}>
<div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
<div style={{display: 'flex', alignItems: 'center'}}><span style={{width: '30px', height: '30px', flex: 'none', borderRadius: '50%', boxSizing: 'border-box', border: j.ring, background: j.fill, color: j.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={j.icon}></path></svg></span><span style={{flex: '1', height: '2px', background: j.line}}></span></div>
<div><div style={{fontSize: '15px', fontWeight: j.weight, color: j.textColor}}>{j.label}</div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)', marginTop: '2px'}}>{j.note}</div></div>
</div>
</React.Fragment>
))}
</div>
</div>
<div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '28px'}}>
<div className="blueprint" style={{padding: '22px 24px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<h3 style={{margin: '0 0 14px', fontSize: '22px'}}>Machine details</h3>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', columnGap: '24px'}}>
{(facts || []).map((f, i) => (
<React.Fragment key={i}>
<div style={{padding: '11px 0', borderTop: '1px solid var(--color-divider)'}}><div style={{fontSize: '12px', color: 'var(--color-neutral-700)'}}>{f.k}</div><div style={{fontSize: '15px', fontWeight: '500', marginTop: '3px'}}>{f.v}</div></div>
</React.Fragment>
))}
</div>
</div>
<div style={{display: 'flex', flexDirection: 'column', gap: '28px'}}>
<div className="blueprint" style={{padding: '22px 24px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}><h3 style={{margin: '0', fontSize: '22px'}}>Service tickets</h3><button className="btn btn-ghost" style={{height: '40px', padding: '0 10px', fontSize: '14px', fontWeight: '600'}}>+ New ticket</button></div>
{(tickets || []).map((t, i) => (
<React.Fragment key={i}>
<div style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderTop: '1px solid var(--color-divider)'}}>
<div style={{width: '40px', height: '40px', flex: 'none', borderRadius: '50%', background: 'var(--color-accent-100)', color: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '13px'}}>{t.initials}</div>
<div style={{flex: '1', minWidth: '0'}}><div style={{fontSize: '15px', fontWeight: '500'}}>{t.title}</div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)', marginTop: '2px'}}>{t.id} · {t.person} · {t.date}</div></div>
<span style={{padding: '4px 10px', fontSize: '13px', fontWeight: '600', background: t.bg, color: t.fg}}>{t.status}</span>
</div>
</React.Fragment>
))}
</div>
<div className="blueprint" style={{padding: '22px 24px'}}>
<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
<h3 style={{margin: '0 0 4px', fontSize: '22px'}}>Spares sent with machine</h3>
<div style={{fontSize: '13px', color: 'var(--color-neutral-700)', marginBottom: '10px'}}>Vehicle TN 09 BK 4471</div>
{(spares || []).map((p, i) => (
<React.Fragment key={i}>
<div style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 0', borderTop: '1px solid var(--color-divider)'}}>
<div style={{flex: '1', fontSize: '15px'}}>{p.name}</div>
<div style={{display: 'flex', alignItems: 'center', border: '1px solid var(--color-divider)'}}>
<button onClick={p.dec} className="btn btn-ghost" style={{width: '40px', height: '40px', padding: '0', color: 'var(--color-text)'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14"></path></svg></button>
<span style={{minWidth: '44px', textAlign: 'center', fontSize: '15px', fontWeight: '600', fontVariantNumeric: 'tabular-nums'}}>{p.qty}</span>
<button onClick={p.inc} className="btn btn-ghost" style={{width: '40px', height: '40px', padding: '0', color: 'var(--color-text)'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14M12 5v14"></path></svg></button>
</div>
<span style={{width: '34px', fontSize: '13px', color: 'var(--color-neutral-700)'}}>{p.unit}</span>
</div>
</React.Fragment>
))}
</div>
</div>
</div>
</div>
{Boolean(checkout) && (
<React.Fragment>
<div style={{position: 'absolute', inset: '0', background: 'color-mix(in srgb,var(--color-neutral-900) 45%,transparent)', display: 'flex', justifyContent: 'flex-end'}}>
<div style={{width: '520px', height: '100%', background: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column'}}>
<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px 8px'}}><div><div style={{fontSize: '13px', color: 'var(--color-neutral-700)'}}>SR-1042 · {sel.name}</div><h2 style={{margin: '2px 0 0', fontSize: '30px'}}>Check out</h2></div><button onClick={closeCheckout} className="btn btn-ghost" style={{width: '44px', height: '44px', padding: '0', color: 'var(--color-text)'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button></div>
<div style={{flex: '1', overflow: 'auto', padding: '16px 28px', display: 'flex', flexDirection: 'column', gap: '22px'}}>
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
<label className="field"><label>Date</label><input className="input" defaultValue="29 Sep 2026" style={{height: '48px', fontSize: '15px'}} /></label>
<label className="field"><label>Time</label><input className="input" defaultValue="4:30 PM" style={{height: '48px', fontSize: '15px'}} /></label>
</div>
<div>
<div style={{fontSize: '15px', fontWeight: '600', marginBottom: '8px'}}>Spares on this visit</div>
{(spares || []).map((p, i) => (
<React.Fragment key={i}>
<div style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderTop: '1px solid var(--color-divider)'}}>
<div style={{flex: '1'}}><div style={{fontSize: '15px'}}>{p.name}</div><div style={{fontSize: '12.5px', color: 'var(--color-neutral-700)'}}>{p.qty} {p.unit}</div></div>
<div style={{display: 'flex', border: '1px solid var(--color-divider)'}}>
<button onClick={p.setUsed} style={{all: 'unset', cursor: 'pointer', height: '40px', padding: '0 14px', fontSize: '14px', fontWeight: '500', background: p.usedBg, color: p.usedFg}}>Used</button>
<button onClick={p.setBack} style={{all: 'unset', cursor: 'pointer', height: '40px', padding: '0 14px', fontSize: '14px', fontWeight: '500', borderLeft: '1px solid var(--color-divider)', background: p.backBg, color: p.backFg}}>Not used</button>
</div>
</div>
</React.Fragment>
))}
</div>
<label className="field"><label>What was the problem?</label><textarea className="input" placeholder="Describe the fault and what was done" style={{minHeight: '110px', fontSize: '15px'}} /></label>
<div style={{display: 'flex', gap: '10px'}}>
<button className="btn btn-secondary" style={{height: '48px', padding: '0 16px', fontSize: '15px', gap: '8px'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3zM12 10a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"></path></svg>Add photo</button>
<button className="btn btn-secondary" style={{height: '48px', padding: '0 16px', fontSize: '15px', gap: '8px'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>Send link to customer</button>
</div>
</div>
<div style={{padding: '16px 28px 26px', borderTop: '1px solid var(--color-divider)'}}>
<button onClick={closeCheckout} className="btn btn-primary blueprint" style={{width: '100%', height: '52px', fontSize: '16px', fontWeight: '600'}}>Submit check-out<i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i></button>
</div>
</div>
</div>
</React.Fragment>
)}
</div>
</div>

</div>
<p className="dv-next">Try next: "use the Journey names from <a className="dv-oid" href="#1a">1a</a> everywhere" · "make <a className="dv-oid" href="#1b">1b</a> a card list instead of a table" · "show <a className="dv-oid" href="#1d">1d</a> for the check-out flow"</p>
</section>

    </div>
  );
}
