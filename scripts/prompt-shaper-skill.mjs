#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const personalSkill = join(
  homedir(),
  ".bb",
  "skills",
  "prompt-shaper",
  "SKILL.md",
);
const bundledSkill = join(
  repositoryRoot,
  "skills",
  "prompt-shaper",
  "SKILL.md",
);
const versionDirectory = join(
  homedir(),
  ".bb",
  "skill-maintenance",
  "prompt-shaper",
  "versions",
);

function fail(message) {
  console.error(message);
  process.exit(1);
}

function requireFile(path, label) {
  if (!existsSync(path)) fail(`${label} does not exist: ${path}`);
}

function read(path) {
  return readFileSync(path, "utf8");
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function timestamp() {
  return new Date().toISOString().replaceAll(":", "-");
}

function snapshot() {
  requireFile(personalSkill, "Personal Prompt Shaper skill");
  const content = read(personalSkill);
  mkdirSync(versionDirectory, { recursive: true });
  const destination = join(
    versionDirectory,
    `${timestamp()}-${sha256(content).slice(0, 12)}.md`,
  );
  writeFileSync(destination, content, { flag: "wx" });
  console.log(destination);
  return destination;
}

function syncFromPersonal() {
  requireFile(personalSkill, "Personal Prompt Shaper skill");
  mkdirSync(dirname(bundledSkill), { recursive: true });
  copyFileSync(personalSkill, bundledSkill);
  console.log(`Synced ${personalSkill} -> ${bundledSkill}`);
}

function check() {
  requireFile(personalSkill, "Personal Prompt Shaper skill");
  requireFile(bundledSkill, "Bundled Prompt Shaper skill");
  const personal = read(personalSkill);
  const bundled = read(bundledSkill);
  if (personal !== bundled) {
    fail(
      `Prompt Shaper skill drift detected. Personal ${sha256(personal)}; bundled ${sha256(bundled)}. Run npm run skill:sync after approval.`,
    );
  }
  console.log(`Prompt Shaper skill copies match (${sha256(personal)}).`);
}

function restore(snapshotPath) {
  if (!snapshotPath) {
    fail("Usage: npm run skill:restore -- <snapshot-path>");
  }
  const source = resolve(snapshotPath);
  requireFile(source, "Snapshot");
  snapshot();
  mkdirSync(dirname(personalSkill), { recursive: true });
  copyFileSync(source, personalSkill);
  copyFileSync(source, bundledSkill);
  check();
  console.log(`Restored Prompt Shaper from ${source}`);
}

const [command, argument] = process.argv.slice(2);

switch (command) {
  case "snapshot":
    snapshot();
    break;
  case "sync-from-personal":
    syncFromPersonal();
    break;
  case "check":
    check();
    break;
  case "restore":
    restore(argument);
    break;
  default:
    fail(
      "Usage: prompt-shaper-skill.mjs <snapshot|sync-from-personal|check|restore> [snapshot-path]",
    );
}
