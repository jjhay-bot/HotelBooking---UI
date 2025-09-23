/* eslint-env node */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read template
let configTemplate = fs.readFileSync(
  path.join(__dirname, "..", "src", "config.template.js"),
  { encoding: "utf8" }
);

// Replace placeholder with environment variable (Vite style)
configTemplate = configTemplate.replace(/<API_URI>/g, process.env.VITE_API_URI || "");

// Write final config.js
fs.writeFileSync(
  path.join(__dirname, "..", "src", "config.js"),
  configTemplate
);

console.log("✅ config.js generated with API URI:", process.env.VITE_API_URI?.slice(0, 6));
