#!/usr/bin/env node
/* Copies the static site into dist/ so Cloudflare Pages can publish it. */
import { rmSync, cpSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SCRIPT_DIR, "..");
const DIST = join(ROOT, "dist");

const ITEMS = [
  "index.html",
  "services.html",
  "about.html",
  "contact.html",
  "assets",
  "Images"
];

try {
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  for (const item of ITEMS) {
    cpSync(join(ROOT, item), join(DIST, item), { recursive: true });
  }

  console.log("Site copied to dist/ — build complete.");
} catch (err) {
  console.error("Build failed:", err.message);
  process.exit(1);
}
