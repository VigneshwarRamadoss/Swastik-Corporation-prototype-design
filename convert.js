const fs = require('fs');

const files = [
  'Figma Flow Simplified.dc.html',
  'Figma Screens New Labels.dc.html'
];

files.forEach(f => {
  let html = fs.readFileSync(f, 'utf8');
  
  let match = html.match(/<x-dc>([\s\S]*?)<\/x-dc>/);
  if (!match) return;
  let body = match[1];
  
  body = body.replace(/<helmet>[\s\S]*?<\/helmet>/, '');
  
  body = body.replace(/<\/input>/gi, '');
  body = body.replace(/<\/img>/gi, '');
  body = body.replace(/<\/hr>/gi, '');
  body = body.replace(/<\/br>/gi, '');

  body = body.replace(/style-hover="[^"]*"/gi, '');

  // 1. Process <sc-for> and <sc-if> loops FIRST
  let changed = true;
  while (changed) {
    let prev = body;
    body = body.replace(/<sc-for list="\{\{\s*(.*?)\s*\}\}" as="(.*?)"[^>]*>(((?!<sc-for)[\s\S])*?)<\/sc-for>/g, (m, list, item, content) => {
      return `{(${list} || []).map((${item}, i) => (\n<React.Fragment key={i}>${content}</React.Fragment>\n))}`;
    });
    body = body.replace(/<sc-if value="\{\{\s*(.*?)\s*\}\}"[^>]*>(((?!<sc-if)[\s\S])*?)<\/sc-if>/g, (m, cond, content) => {
      return `{Boolean(${cond}) && (\n<React.Fragment>${content}</React.Fragment>\n)}`;
    });
    changed = (body !== prev);
  }

  body = body.replace(/\$index/g, 'i + 1');

  // 2. Rename standard HTML attributes to JSX
  body = body.replace(/class=/g, 'className=');
  body = body.replace(/stroke-width=/g, 'strokeWidth=');
  body = body.replace(/stroke-linecap=/g, 'strokeLinecap=');
  body = body.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  
  body = body.replace(/\bvalue=/g, 'defaultValue=');
  body = body.replace(/\bchecked=/g, 'defaultChecked=');

  // 3. Convert <textarea> children to defaultValue
  body = body.replace(/<textarea([^>]*?)>([\s\S]*?)<\/textarea>/gi, (m, attrs, text) => {
    const cleaned = text.trim();
    if (!cleaned) return `<textarea${attrs} />`;
    return `<textarea${attrs} defaultValue="${cleaned.replace(/"/g, '&quot;')}" />`;
  });
  
  body = body.replace(/<(img|input|hr|br|meta|link)([^>]*?)>/g, (m, tag, rest) => {
    if (rest.trim().endsWith('/')) return m;
    return `<${tag}${rest} />`;
  });

  // 4. Replace {{ var }} with {var}
  body = body.replace(/\{\{\s*(.*?)\s*\}\}/g, '{$1}');
  
  // 5. Strip quotes around single-braced attribute expressions (e.g. d="{icons.truck}" -> d={icons.truck})
  body = body.replace(/([a-zA-Z0-9_-]+)="\{([^{}]+)\}"/g, '$1={$2}');

  // 6. Convert style="..." attributes to JSX style={{...}} AT THE END
  body = body.replace(/style="([^"]*)"/g, (m, p1) => {
    const styles = p1.split(';').filter(s => s.trim()).map(s => {
      const parts = s.split(':');
      const key = parts[0];
      const val = parts.slice(1).join(':');
      const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      const trimmedVal = val.trim();
      
      // If style value is a JSX expression like {t.bg}, output as JS variable reference
      if (trimmedVal.startsWith('{') && trimmedVal.endsWith('}')) {
        const expr = trimmedVal.slice(1, -1).trim();
        return `${camelKey}: ${expr}`;
      }
      return `${camelKey}: '${trimmedVal.replace(/'/g, "\\'")}'`;
    });
    return `style={{${styles.join(', ')}}}`;
  });
  
  body = body.replace(/<!--[\s\S]*?-->/g, '');
  
  const componentName = f.replace('.dc.html', '').replace(/ /g, '');
  
  const output = `import React from 'react';

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

export default function ${componentName}() {
  return (
    <div className="showcase-wrapper" style={{ overflowX: 'auto', padding: '24px' }}>
      ${body}
    </div>
  );
}
`;
  
  fs.writeFileSync('yard-status-app/src/pages/' + componentName + '.jsx', output);
});
