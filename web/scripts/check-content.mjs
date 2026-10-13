// Fails the build on dashes in copy and on claims the owner asked to remove.
import fs from "node:fs";
import path from "node:path";
const files = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(tsx?)$/.test(e.name)) files.push(p); });
walk(path.resolve("src"));
const rules = [
  { re: /[–—]/, msg: "em or en dash in copy" },
  { re: /NovaSoft|GreenVault|Pinnacle Retail|Series A|99\.999|nationalities|ChurchBell/i, msg: "removed claim or name" },
  { re: /True North Co\b|IT Consultancy/, msg: "the company name is True North IT Consulting" },
  { re: /Lorem ipsum/i, msg: "placeholder copy" },
];
const errors = [];
for (const f of files) fs.readFileSync(f, "utf8").split("\n").forEach((line, i) => {
  if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
  for (const r of rules) if (r.re.test(line)) errors.push(`${path.relative(".", f)}:${i + 1}: ${r.msg}`);
});
if (errors.length) { console.error(`Content check failed:\n  ${errors.join("\n  ")}`); process.exit(1); }
console.log(`Content check passed (${files.length} files).`);
