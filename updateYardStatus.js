const fs = require('fs');

let file = fs.readFileSync('yard-status-app/src/pages/YardStatusMockups.jsx', 'utf8');

// Fix flex style string literal error
file = file.replace(/flex:\s*'\{s\.count\}\s*0\s*0'/g, "flex: `${s.count} 0 0` ");

// Ensure useState is imported
if (!file.includes("import React, { useState }")) {
  file = file.replace("import React from 'react';", "import React, { useState } from 'react';");
}

// Replace static state variables with useState logic
const startIdx = file.indexOf("const SETS =");
const returnIdx = file.indexOf("return (");

if (startIdx !== -1 && returnIdx !== -1) {
  const topPart = file.substring(0, startIdx);
  const bottomPart = file.substring(returnIdx);

  const middleLogic = `
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
      ring: done || cur ? \`2px solid \${col}\` : "1.5px solid var(--color-neutral-400)",
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
`;

  fs.writeFileSync('yard-status-app/src/pages/YardStatusMockups.jsx', topPart + middleLogic + bottomPart);
  console.log("Successfully updated YardStatusMockups.jsx");
}
