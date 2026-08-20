#!/usr/bin/env node
// Static pitch library: full-page demos must look like complete HTML documents.
// Email signatures and partials are allowed without a full document shell.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const html = readdirSync(root).filter((f) => f.endsWith(".html"));
if (html.length < 1) {
  console.error("typecheck: expected at least one root *.html file");
  process.exit(1);
}

const skipFullDoc = /(signature|email-sig|partial)/i;
let failed = 0;
let checked = 0;
for (const f of html) {
  const body = readFileSync(join(root, f), "utf8");
  if (body.trim().length < 10) {
    console.error(`typecheck: ${f} is empty`);
    failed++;
    continue;
  }
  if (skipFullDoc.test(f)) continue;
  checked++;
  if (!/<html[\s>]/i.test(body) || !/<\/html>/i.test(body)) {
    console.error(`typecheck: ${f} missing <html>…</html> document shell`);
    failed++;
  }
}
if (failed) process.exit(1);
console.log(`typecheck: ${checked} full-page HTML files ok (${html.length} total .html at root)`);
